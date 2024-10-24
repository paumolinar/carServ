import { Component, OnInit } from '@angular/core';
import { RIDE_KEY } from 'src/app/constants/storage_keys';
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

  constructor(private readonly storageService: StorageService) {}

  async onSubmit() {
    console.log(this.dateTime, this.seatsAvailable, this.price, this.location);
    const ride = {
      dateTime: this.dateTime,
      seatsAvailable: this.seatsAvailable,
      price: this.price,
      location: this.location,
    };
    await this.storageService.set(RIDE_KEY, ride);
  }

  async checkData() {
    const rideFromStorage = await this.storageService.get(RIDE_KEY);
    console.log(rideFromStorage);
  }
}
