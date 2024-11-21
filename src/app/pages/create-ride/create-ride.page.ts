import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LOGGED_USER_KEY, RIDES_KEY } from 'src/app/constants/storage-keys';
import { InputRide } from 'src/app/models/ride';
import { RideService } from 'src/app/services/ride.service';
import { StorageService } from 'src/app/services/storage.service';
import { Geolocation } from '@capacitor/geolocation';

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

  constructor(
    private readonly storageService: StorageService,
    private readonly rideService: RideService
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
        }
      });
    });
  }

  ngOnInit(): void {
    this.initMap('map_startpoint');
    this.initMap('map_destination');
  }
  async onSubmit() {
    const loggedUser = await this.storageService.get(LOGGED_USER_KEY);
    console.log(this.dateTime, this.seatsAvailable, this.price);
    if (!this.dateTime || !this.seatsAvailable || !this.price) {
      console.log('Invalid input');
      return;
    }
    const inputRide: InputRide = {
      dateTime: this.dateTime,
      seatsAvailable: this.seatsAvailable,
      price: this.price,
      driverUsername: loggedUser.driverUsername,
    };

    await this.rideService.createRide(inputRide);
  }

  async checkData() {
    const rideFromStorage = await this.storageService.get(RIDES_KEY);
    console.log(rideFromStorage);
  }
}
