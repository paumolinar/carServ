import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { LOGGED_USER_KEY } from 'src/app/constants/storage-keys';
import { StorageService } from 'src/app/services/storage.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements ViewWillEnter {
  username: string = 'guest';
  balance: number = 0;
  temperature?: number;
  time?: string;

  constructor(
    private router: Router,
    private readonly storageService: StorageService,
    private readonly weatherService: WeatherService
  ) {}

  async ionViewWillEnter() {
    console.log('ngOnInit');
    const loggedUser = await this.storageService.get(LOGGED_USER_KEY);
    this.username = loggedUser.username;
    this.balance = loggedUser.balance;
    console.log('loggedUser:', loggedUser);
    this.weatherService.getWeather();
    const { temperature, time } = await this.weatherService.getWeather();
    this.temperature = temperature;
    this.time = time;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
