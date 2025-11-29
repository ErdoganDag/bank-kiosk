import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  apiUrl: string = '';

  constructor(private http: HttpClient) {}

  async loadConfig(): Promise<void> {
    try {
      const config = await firstValueFrom(this.http.get<{ apiUrl: string }>('assets/config.json'));
      this.apiUrl = config.apiUrl;
      console.log('Config loaded:', this.apiUrl);
    } catch (err) {
      console.error('Config yüklenemedi', err);
    }
  }
}
