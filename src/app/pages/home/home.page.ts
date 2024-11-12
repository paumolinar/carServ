import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { LOGGED_USER_KEY } from 'src/app/constants/storage-keys';
import { StorageService } from 'src/app/services/storage.service';
import { WeatherService } from 'src/app/services/weather.service';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements ViewWillEnter, OnInit {
  username: string = 'guest';
  balance: number = 0;
  temperature?: number;
  time?: string;

  constructor(
    private router: Router,
    private readonly storageService: StorageService,
    private readonly weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.initMap();
  }

  private initMap(): void {
    const coord = Geolocation.getCurrentPosition();
    coord.then(position => {
      const map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker(new L.LatLng(position.coords.latitude, position.coords.longitude), {
        icon: L.icon({
          iconUrl: '/assets/car-icon-vector-illustration.jpg',
          iconSize: [25, 41]
        })
      })
      .bindPopup('Estás Aquí')
      .openPopup()
      .addTo(map);

    });
  }

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
