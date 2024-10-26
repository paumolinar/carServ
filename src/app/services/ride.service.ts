import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { RIDES_KEY } from '../constants/storage_keys';
import { InputRide, Ride } from '../models/ride';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  lastId = 1;

  constructor(private readonly storageService: StorageService) {}

  async initRides() {
    await this.storageService.set(RIDES_KEY, []);
  }

  async setRides(rides: Ride[]) {
    await this.storageService.set(RIDES_KEY, rides);
  }

  async getRides(): Promise<Ride[]> {
    return await this.storageService.get(RIDES_KEY);
  }

  async createRide(ride: InputRide) {
    const rides = await this.getRides();
    rides.push({
      id: this.lastId,
      ...ride,
    });
    this.lastId = this.lastId + 1;
    await this.setRides(rides);
  }

  async updateRide(ride: Ride) {
    const rides = await this.getRides();
    const index = rides.findIndex((r) => r.id === ride.id);
    rides[index] = ride;
    await this.setRides(rides);
  }
}
