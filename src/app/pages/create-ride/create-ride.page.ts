import { Component, OnInit } from '@angular/core';
import { RIDES_KEY } from 'src/app/constants/storage-keys';
import { RideService } from 'src/app/services/ride.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-create-ride',
  templateUrl: './create-ride.page.html',
  styleUrls: ['./create-ride.page.scss'],
})
export class CreateRidePage {
  dateTime?: string;
  seatsAvailable?: number;
  price?: number;
  location?: string;

  constructor(
    private readonly storageService: StorageService,
    private readonly rideService: RideService
  ) {}

  async onSubmit() {
    console.log(this.dateTime, this.seatsAvailable, this.price, this.location);
    if (
      !this.dateTime ||
      !this.seatsAvailable ||
      !this.price ||
      !this.location
    ) {
      console.log('Invalid input');
      return;
    }
    const ride = {
      dateTime: this.dateTime,
      seatsAvailable: this.seatsAvailable,
      price: this.price,
      location: this.location,
    };

    await this.rideService.createRide(ride);
  }

  async checkData() {
    const rideFromStorage = await this.storageService.get(RIDES_KEY);
    console.log(rideFromStorage);
  }
}
