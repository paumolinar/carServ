import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { RIDES_KEY } from '../constants/storage_keys';
import { Ride } from '../models/ride';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  constructor(private readonly storageService: StorageService) {}

  async initRides() {
    await this.storageService.set(RIDES_KEY, []);
  }

  async setRides(rides: Ride[]) {
    await this.storageService.set(RIDES_KEY, rides);
  }

  async getRides() {
    return await this.storageService.get(RIDES_KEY);
  }

  async createRide(ride: Ride) {
    const rides = await this.getRides();
    rides.push(ride);
    await this.setRides(rides);
  }
}
