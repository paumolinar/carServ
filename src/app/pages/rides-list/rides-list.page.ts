import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LOGGED_USER_KEY } from 'src/app/constants/storage-keys';
import { Ride } from 'src/app/models/ride';
import { RideService } from 'src/app/services/ride.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rides-list',
  templateUrl: './rides-list.page.html',
  styleUrls: ['./rides-list.page.scss'],
})
export class RidesListPage {
  rides: Ride[] = [];

  constructor(
    private readonly rideService: RideService,
    private readonly storageService: StorageService,
    private readonly userService: UserService,
    private alertController: AlertController
  ) {}

  async ionViewWillEnter() {
    this.rides = await this.rideService.getRides();
    console.log('rides:', this.rides);
  }

  async joinRide(ride: Ride) {
    console.log('joinRide', ride);

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

    ride.seatsAvailable -= 1;
    loggedUser.balance -= ride.price;
    await this.userService.updateUser(loggedUser);

    await this.rideService.updateRide(ride);

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
}
