import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import { StorageService } from './storage.service';
import { USER_KEY } from '../constants/storage_keys';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersUrl = 'http://localhost:3000/users';

  constructor(
    private readonly storageService: StorageService,
    private readonly http: HttpClient,
  ) { }

  getUsers() {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }

  createUser(user: User) {
   console.log(user)
   this.storageService.set(USER_KEY, user)
  }

  updateUser(user: User) {
    return this.http.put(`${this.usersUrl}/${user}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.usersUrl}/${id}`);
  }

  findUserBy(fieldname: string, value: string) {
    return this.http.get<User[]>(`${this.usersUrl}?${fieldname}=${value}`);
  }

  findUserByUsername(username: string) {
    return this.findUserBy('username', username);
  }

}
