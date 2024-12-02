import { Component } from '@angular/core';
import { LOGGED_USER_KEY, RIDES_KEY } from 'src/app/constants/storage-keys';
import { Ride } from 'src/app/models/ride';
import { RideService } from 'src/app/services/ride.service';
import { StorageService } from 'src/app/services/storage.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-my-ride',
  templateUrl: './my-ride.page.html',
  styleUrls: ['./my-ride.page.scss'],
})
export class MyRidePage {
  ride?: Ride;
  constructor(
    private readonly storageService: StorageService,
    private readonly rideService: RideService
  ) {}

  private initMap(): void {
    if (!this.ride) {
      return;
    }
    const map = L.map('map').setView(
      [this.ride.startpointLat, this.ride.startpointLng],
      13
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(new L.LatLng(this.ride.startpointLat, this.ride.startpointLng), {
      icon: L.icon({
        iconUrl: '/assets/car-icon-vector-illustration.jpg',
        iconSize: [25, 41],
      }),
    })
      .bindPopup('Inicio')
      .openPopup()
      .addTo(map);
    
      L.marker(new L.LatLng(this.ride.destinationLat, this.ride.destinationLng), {
        icon: L.icon({
          iconUrl: '/assets/car-icon-vector-illustration.jpg',
          iconSize: [25, 41],
        }),
      })
        .bindPopup('Destino')
        .openPopup()
        .addTo(map);
  }

  async ionViewWillEnter() {
    const loggedUser = await this.storageService.get(LOGGED_USER_KEY);
    const currentRideId = loggedUser.currentRide;
    this.ride = await this.rideService.findRideById(currentRideId);
    console.log('current ride:', this.ride);
    this.initMap();
  }

  abandonRide() {
    console.log('lol')
  }
}
