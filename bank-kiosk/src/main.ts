import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ConfigService } from './app/services/app-config.service';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { APP_INITIALIZER } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export function initializeApp(configService: ConfigService) {
  return () => configService.loadConfig();
}

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(HttpClientModule, RouterModule.forRoot(routes), FontAwesomeModule),
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true, // Çoklu initializer destekler
    },
  ],
});
