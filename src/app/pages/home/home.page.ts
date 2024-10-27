import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { LOGGED_USER_KEY } from 'src/app/constants/storage_keys';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements ViewWillEnter {
  username: string = 'guest';
  balance: number = 0;

  constructor(
    private router: Router,
    private readonly storageService: StorageService
  ) {}

  async ionViewWillEnter() {
    console.log('ngOnInit');
    const loggedUser = await this.storageService.get(LOGGED_USER_KEY);
    this.username = loggedUser.username;
    this.balance = loggedUser.balance;
    console.log('loggedUser:', loggedUser)
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
