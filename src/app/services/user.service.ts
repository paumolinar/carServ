import { Injectable } from '@angular/core';
import { InputUser, User } from '../models/user';
import { StorageService } from './storage.service';
import { LOGGED_USER_KEY, USERS_KEY } from '../constants/storage_keys';

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

  async getUsers(): Promise<User[]> {
    return await this.storageService.get(USERS_KEY);
  }

  async createUser(user: InputUser) {
    const users = await this.getUsers();
    users.push({
      balance: 0,
      ...user,
    });
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

  async setLoggedUser(user: User): Promise<void> {
    await this.storageService.set(LOGGED_USER_KEY, user);
  }

  async logout(): Promise<void> {
    await this.storageService.set(LOGGED_USER_KEY, null);
  }

  async updateUser(user: User) {
    const users = await this.getUsers();
    const index = users.findIndex((r) => r.username === user.username);
    users[index] = user;
    await this.setUsers(users);

    const loggedUser = await this.storageService.get(LOGGED_USER_KEY);
    if (loggedUser.username === user.username) {
      await this.setLoggedUser(user);
    }
  }
}
