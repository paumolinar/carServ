import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LOGGED_USER_KEY, RIDES_KEY } from 'src/app/constants/storage-keys';
import { InputRide } from 'src/app/models/ride';
import { RideService } from 'src/app/services/ride.service';
import { StorageService } from 'src/app/services/storage.service';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ride',
  templateUrl: './create-ride.page.html',
  styleUrls: ['./create-ride.page.scss'],
})
export class CreateRidePage implements OnInit {
  dateTime?: string;
  seatsAvailable?: number;
  price?: number;
  markerStartpoint?: L.Marker;
  markerDestination?: L.Marker;
  startpointLat?: number;
  startpointLng?: number;
  destinationLat?: number;
  destinationLng?: number;

  constructor(
    private readonly storageService: StorageService,
    private readonly rideService: RideService,
    private alertController: AlertController,
    private readonly router: Router,
  ) {}

  private initMap(mapId: string): void {
    const coord = Geolocation.getCurrentPosition();
    coord.then((position) => {
      const map = L.map(mapId).setView(
        [position.coords.latitude, position.coords.longitude],
        13
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on('click', (e: L.LeafletMouseEvent) => {
        console.log('click en el mapa');
        const { lat, lng } = e.latlng;
        console.log(`Latitud: ${lat}, Longitud: ${lng}`);

        if (mapId === 'map_startpoint') {
          if (this.markerStartpoint) {
            this.markerStartpoint.remove();
          }
          this.markerStartpoint = L.marker(new L.LatLng(lat, lng), {
            icon: L.icon({
              iconUrl: '/assets/car-icon-vector-illustration.jpg',
              iconSize: [25, 41],
            }),
          })
            .bindPopup('Estás Aquí')
            .openPopup()
            .addTo(map);

          this.startpointLat = lat;
          this.startpointLng = lng;
        }
        if (mapId === 'map_destination') {
          if (this.markerDestination) {
            this.markerDestination.remove();
          }
          this.markerDestination = L.marker(new L.LatLng(lat, lng), {
            icon: L.icon({
              iconUrl: '/assets/car-icon-vector-illustration.jpg',
              iconSize: [25, 41],
            }),
          })
            .bindPopup('Estás Aquí')
            .openPopup()
            .addTo(map);

          this.destinationLat = lat;
          this.destinationLng = lng;
        }
      });
    });
  }

  ngOnInit(): void {
    this.initMap('map_startpoint');
    this.initMap('map_destination');
  }
  async onSubmit() {
    const loggedUser: User = await this.storageService.get(LOGGED_USER_KEY);
    console.log(this.dateTime, this.seatsAvailable, this.price);
    if (
      !this.dateTime ||
      !this.seatsAvailable ||
      !this.price ||
      !this.startpointLat ||
      !this.startpointLng ||
      !this.destinationLat ||
      !this.destinationLng
    ) {
      console.log('Invalid input');
      let alert = await this.alertController.create({
        header: 'Mensaje',
        message: `Hay uno o más campos vacío/s. Por favor rellene todos los campos solicitados.`,
        buttons: [
          {
            text: 'Ok',
          },
        ],
      });
      await alert.present();
      return;
    }
    const inputRide: InputRide = {
      dateTime: this.dateTime,
      seatsAvailable: this.seatsAvailable,
      price: this.price,
      driverUsername: loggedUser.username,
      startpointLat: this.startpointLat,
      startpointLng: this.startpointLng,
      destinationLat: this.destinationLat,
      destinationLng: this.destinationLng
    };

    await this.rideService.createRide(inputRide);
    return this.router.navigateByUrl('/home');
  }
}
