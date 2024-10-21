import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { StorageService } from './storage.service';
import { USERS_KEY } from '../constants/storage_keys';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersUrl = 'http://localhost:3000/users';

  constructor(
    private readonly storageService: StorageService,
    private readonly http: HttpClient
  ) {}

  async initUsers() {
    await this.storageService.set(USERS_KEY, []);
  }

  async setUsers(users: User[]) {
    await this.storageService.set(USERS_KEY, users);
  }

  async getUsers() {
    return await this.storageService.get(USERS_KEY);
  }

  async getUser(id: number) {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }

  async createUser(user: User) {
    const users = await this.getUsers();
    users.push(user);
    await this.setUsers(users);
  }

  async updateUser(user: User) {
    return this.http.put(`${this.usersUrl}/${user}`, user);
  }

  async deleteUser(id: number) {
    return this.http.delete(`${this.usersUrl}/${id}`);
  }

  async findUserBy(fieldname: string, value: string) {
    return this.http.get<User[]>(`${this.usersUrl}?${fieldname}=${value}`);
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
