import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { UserService } from './services/user.service';
import { RideService } from './services/ride.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private userService: UserService,
    private rideService: RideService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async (ready) => {
      console.log('Platform ready: ', ready);
      //this.storageService.init();
      //console.log('create users')
      await this.userService.initUsers();
      await this.userService.createUser({
        username: 'admin',
        password: 'asdf1',
      });
      await this.userService.createUser({
        username: 'user2',
        password: 'asdf2',
      });
      await this.userService.createUser({
        username: 'passenger',
        password: 'asdf1',
      });
      await this.rideService.initRides();
      await this.rideService.createRide({
        dateTime: '2024-10-25T20:00:00',
        seatsAvailable: 4,
        price: 4000,
        driverUsername: 'user2',
        startpointLat: -90.463002931436275,
        startpointLng: -88.56057414095131,
        destinationLat: -33.44863074377262,
        destinationLng: -70.58339306240427,
      });
      await this.rideService.createRide({
        dateTime: '2024-10-26T20:00:00',
        seatsAvailable: 2,
        price: 3500,
        driverUsername: 'admin',
        startpointLat: -33.463009931436275,
        startpointLng: -70.56057414065131,
        destinationLat: -33.44863074367262,
        destinationLng: -70.58339306140427,
      });
      await this.rideService.createRide({
        dateTime: '2024-11-25T20:00:00',
        seatsAvailable: 0,
        price: 2000,
        driverUsername: 'user2',
        startpointLat: -90.463002931436275,
        startpointLng: -88.56057414785131,
        destinationLat: -33.44863904377262,
        destinationLng: -70.58339226240427,
      });
    });
  }
}
