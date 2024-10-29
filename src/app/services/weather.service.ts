import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor() {}

  async getWeather(): Promise<{ temperature: number; time: string }> {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: -33.45, // Latitud de Santiago de Chile
        longitude: -70.65, // Longitud de Santiago de Chile
        current: 'temperature_2m',
      },
    });
    console.log('response:');
    console.log(response.data);
    return {
      temperature: response.data.current.temperature_2m,
      time: response.data.current.time,
    };
  }
}
