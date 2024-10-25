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
      console.log("Platform ready: ", ready);
      //this.storageService.init();
      //console.log('create users')
      await this.userService.initUsers();
      await this.userService.createUser({username: 'admin', password: 'asdf1'})
      await this.userService.createUser({username: 'user2', password: 'asdf2'})
      await this.rideService.initRides();
    });
  }
}
