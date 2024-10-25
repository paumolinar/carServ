import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { StorageService } from './storage.service';
import { USERS_KEY } from '../constants/storage_keys';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly storageService: StorageService) {}

  async initUsers() {
    await this.storageService.set(USERS_KEY, []);
  }

  async setUsers(users: User[]) {
    await this.storageService.set(USERS_KEY, users);
  }

  async getUsers() {
    return await this.storageService.get(USERS_KEY);
  }

  async createUser(user: User) {
    const users = await this.getUsers();
    users.push(user);
    await this.setUsers(users);
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const usersList = await this.getUsers();
    for (const user of usersList) {
      if (user.username == username) {
        return user;
      }
    }
    return null;
  }
}
