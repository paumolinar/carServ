import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LOGGED_USER_KEY } from 'src/app/constants/storage-keys';
import { Ride } from 'src/app/models/ride';
import { RideService } from 'src/app/services/ride.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-rides-list',
  templateUrl: './rides-list.page.html',
  styleUrls: ['./rides-list.page.scss'],
})
export class RidesListPage {
  availableRides: Ride[] = [];
  fullRides: Ride[] = [];
  selectedSegment: string = 'segment-available';

  constructor(
    private readonly rideService: RideService,
    private readonly storageService: StorageService,
    private readonly userService: UserService,
    private alertController: AlertController
  ) {}

  async ionViewWillEnter() {
    const allRides = await this.rideService.getRides();
    this.availableRides = allRides.filter((ride) => {
      return ride.seatsAvailable > 0;
    });
    this.fullRides = allRides.filter((ride) => {
      return ride.seatsAvailable === 0;
    });
    console.log(' av rides:', this.availableRides);
    console.log('full rides:', this.fullRides);
  }

  async joinRide(ride: Ride) {
    console.log('joinRide', ride);
    const position = await Geolocation.getCurrentPosition();
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const positionLatLng = L.latLng(lat, lng);

    const rideLat = ride.startpointLat;
    const rideLng = ride.startpointLng;
    const rideInitPostn = L.latLng(rideLat, rideLng);

    const distance = positionLatLng.distanceTo(rideInitPostn);

    const distanceKm = distance / 1000;
    console.log(`La distancia entre las dos ubicaciones es: ${distanceKm} km`);

    if (ride.seatsAvailable <= 0) {
      console.log('No available seats!');
      let alert = await this.alertController.create({
        header: 'Mensaje',
        message: `No hay asientos disponibles en este ride.`,
        buttons: [
          {
            text: 'Ok',
          },
        ],
      });
      await alert.present();
      return;
    }

    const loggedUser = await this.storageService.get(LOGGED_USER_KEY);
    console.log('valor boolean antes', loggedUser.isInRide);

    if (!loggedUser) {
      console.log('User not logged in!');
      return;
    }

    if (loggedUser.balance < ride.price) {
      console.log('Insufficient balance!');
      let alert = await this.alertController.create({
        header: 'Error',
        message: `Saldo insuficiente.`,
        buttons: [
          {
            text: 'Ok',
          },
        ],
      });
      await alert.present();
      return;
    }

    if (loggedUser.isInRide === true) {
      let alert = await this.alertController.create({
        header: 'Mensaje',
        message: `Ya eres parte de un ride, no puede unirse a más de un ride a la vez.`,
        buttons: [
          {
            text: 'Ok',
          },
        ],
      });
      await alert.present();
      return;
    }

    if (distanceKm >= 8) {
      let alert = await this.alertController.create({
        header: 'Mensaje',
        message: `No se ha podido unir al ride porque su ubicación actual está muy lejos del punto de inicio del ride. Escoja un ride diferente más cercano. `,
        buttons: [
          {
            text: 'Ok',
          },
        ],
      });
      await alert.present();
      return;
    }

    console.log('uniendose al ride');
    ride.seatsAvailable -= 1;
    loggedUser.balance -= ride.price;
    loggedUser.isInRide = true;
    loggedUser.currentRide = ride.id;
    await this.userService.updateUser(loggedUser);

    await this.rideService.updateRide(ride);

    console.log('valor boolean despues', loggedUser.isInRide);

    let alert = await this.alertController.create({
      header: 'Listo!',
      message: `Te has unido al ride exitosamente.`,
      buttons: [
        {
          text: 'Ok',
        },
      ],
    });
    await alert.present();
  }
  segmentChosen(e: any) {
    console.log(e.detail.value);
    this.selectedSegment = e.detail.value;
  }
}
