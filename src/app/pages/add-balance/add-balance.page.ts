import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { LOGGED_USER_KEY } from 'src/app/constants/storage-keys';
import { User } from 'src/app/models/user';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-balance',
  templateUrl: './add-balance.page.html',
  styleUrls: ['./add-balance.page.scss'],
})
export class AddBalancePage implements ViewWillEnter {
  inputBalance: number | null = 0;

  constructor(
    private readonly storageService: StorageService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  async ionViewWillEnter() {
    this.inputBalance = null;
  }

  async addBalance() {
    if (!this.inputBalance || this.inputBalance <= 0) {
      console.log('Balance must be greater than 0');
      return;
    }
    const loggedUser: User = await this.storageService.get(LOGGED_USER_KEY);
    loggedUser.balance += this.inputBalance;
    this.userService.updateUser(loggedUser);
    console.log('usuario mod:');
    console.log(loggedUser.balance);
    return this.router.navigateByUrl('/home');
  }
}
