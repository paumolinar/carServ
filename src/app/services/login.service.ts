import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { LOGGED_USER_KEY } from '../constants/storage_keys';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(
    private readonly storageService: StorageService,
    private readonly userService: UserService
  ) {}

  async authenticate(u: string, p: string): Promise<User | null> {
    const found = await this.userService.findUserByUsername(u);

    if (found) {
      console.log('It found user: ', found.username);
      const matchPwd = found.password === p;
      if (matchPwd) {
        console.log('Itmatches');
        await this.storageService.set(LOGGED_USER_KEY, found);
        return found;
      }
    }
    console.log("It didn't find user", u);
    return null;
  }

  async isAuthenticated(): Promise<Boolean> {
    const loggedUser = await this.storageService.get(LOGGED_USER_KEY);
    if (loggedUser) {
      return true;
    } else {
      return false;
    }
  }

  async logout(): Promise<void> {
    await this.storageService.remove(LOGGED_USER_KEY);
  }
}
