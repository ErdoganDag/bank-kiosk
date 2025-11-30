import { Component, OnInit } from '@angular/core';
import { ConfigService } from './services/app-config.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule], // diğer component ve modüller eklenmeli
  templateUrl: './app.html',
})
export class App implements OnInit {
  currentYear = new Date().getFullYear();

  constructor(private configService: ConfigService) {}

  async ngOnInit() {
    await this.configService.loadConfig();
    console.log('Config loaded:', this.configService.apiUrl);
  }
}
