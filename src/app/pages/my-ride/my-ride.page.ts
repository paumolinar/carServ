import { Component } from '@angular/core';
import { LOGGED_USER_KEY, RIDES_KEY } from 'src/app/constants/storage-keys';
import { Ride } from 'src/app/models/ride';
import { RideService } from 'src/app/services/ride.service';
import { StorageService } from 'src/app/services/storage.service';
import * as L from 'leaflet';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-my-ride',
  templateUrl: './my-ride.page.html',
  styleUrls: ['./my-ride.page.scss'],
})
export class MyRidePage {
  ride?: Ride;
  map?: L.Map;
  constructor(
    private readonly storageService: StorageService,
    private readonly rideService: RideService,
    private readonly userService: UserService,
    private alertController: AlertController
  ) {}

  private initMap(): void {
    if (!this.ride) {
      return;
    }
    this.removeMap()
    this.map = L.map('map').setView(
      [this.ride.startpointLat, this.ride.startpointLng],
      13
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    L.marker(new L.LatLng(this.ride.startpointLat, this.ride.startpointLng), {
      icon: L.icon({
        iconUrl: '/assets/car-icon-vector-illustration.jpg',
        iconSize: [25, 41],
      }),
    })
      .bindPopup('Inicio')
      .openPopup()
      .addTo(this.map);

    L.marker(new L.LatLng(this.ride.destinationLat, this.ride.destinationLng), {
      icon: L.icon({
        iconUrl: '/assets/car-icon-vector-illustration.jpg',
        iconSize: [25, 41],
      }),
    })
      .bindPopup('Destino')
      .openPopup()
      .addTo(this.map);
  }

  removeMap() {
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
  }

  async ionViewWillEnter() {
    const loggedUser = await this.storageService.get(LOGGED_USER_KEY);
    const currentRideId = loggedUser.currentRide;
    this.ride = await this.rideService.findRideById(currentRideId);
    console.log('current ride:', this.ride);
    this.initMap();
  }

  async abandonRide() {
    const loggedUser = await this.storageService.get(LOGGED_USER_KEY);
    const currentRideId = loggedUser.currentRide;
    this.ride = await this.rideService.findRideById(currentRideId);
    if (!this.ride) {
      return;
    }
    this.ride.seatsAvailable += 1;
    await this.rideService.updateRide(this.ride);
    loggedUser.isInRide = false;
    loggedUser.currentRide = undefined;
    await this.userService.updateUser(loggedUser);
    this.ride = undefined;
    this.removeMap()
  }

  async abandonRideSubmit() {
    let alert = await this.alertController.create({
      header: 'Alerta',
      message: `¿Está seguro que desea abandonar su ride actual?`,
      buttons: [
        {
          text: 'Si',
          handler: async () => {
            await this.abandonRide();
          },
        },
        {
          text: 'No',
        },
      ],
    });
    await alert.present();
  }
}
