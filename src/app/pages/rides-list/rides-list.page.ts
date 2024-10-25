import { Component } from '@angular/core';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-rides-list',
  templateUrl: './rides-list.page.html',
  styleUrls: ['./rides-list.page.scss'],
})
export class RidesListPage {
  rides: any[] = [];

  async ionViewWillEnter() {
    console.log('ngOnInit');
    const rides = await this.rideService.getRides();
    console.log('ride traido del storage:');
    console.log(rides);
    this.rides = rides;
  }

  constructor(private readonly rideService: RideService) {}
}
