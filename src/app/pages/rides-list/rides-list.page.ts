import { Component } from '@angular/core';
import { Ride } from 'src/app/models/ride';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-rides-list',
  templateUrl: './rides-list.page.html',
  styleUrls: ['./rides-list.page.scss'],
})
export class RidesListPage {
  rides: Ride[] = [];

  async ionViewWillEnter() {
    console.log('ngOnInit');
    const rides = await this.rideService.getRides();
    console.log('ride traido del storage:');
    console.log(rides);
    this.rides = rides;
  }

  async joinRide(ride: Ride) {
    console.log('join ride', ride);
    if (ride.seatsAvailable > 0) {
      ride.seatsAvailable -= 1;
      console.log('asientos disp:', ride.seatsAvailable);
      await this.rideService.updateRide(ride);
    }else {
      console.log('No seats available')
    }
  }

  constructor(private readonly rideService: RideService) {}
}
