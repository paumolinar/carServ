import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { RIDES_KEY } from '../constants/storage-keys';
import { InputRide, Ride } from '../models/ride';
import { UserService } from './user.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  lastId = 1;

  constructor(
    private readonly storageService: StorageService,
    private readonly userService: UserService
  ) {}

  async initRides() {
    await this.storageService.set(RIDES_KEY, []);
  }

  async setRides(rides: Ride[]) {
    await this.storageService.set(RIDES_KEY, rides);
  }

  async getRides(): Promise<Ride[]> {
    return await this.storageService.get(RIDES_KEY);
  }

  async createRide(input: InputRide) {
    console.log('input recibido:')
    console.log(input)
    const rides = await this.getRides();
    const newRide: Ride = {
      id: this.lastId,
      isActive: false,
      passengerUsernames: [],
      ...input,
    };
    rides.push(newRide);
    this.lastId = this.lastId + 1;
    await this.setRides(rides);
    const driver = await this.userService.findUserByUsername(
      input.driverUsername
    );
    console.log('driver:')
    console.log(driver)
    if (driver === null) {
      throw new Error('Driver not found');
    }
    driver.isInRide = true;
    this.userService.updateUser(driver);
  }

  async updateRide(ride: Ride) {
    const rides = await this.getRides();
    const index = rides.findIndex((r) => r.id === ride.id);
    rides[index] = ride;
    await this.setRides(rides);
  }
}
