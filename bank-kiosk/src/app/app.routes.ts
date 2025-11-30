import { Routes } from '@angular/router';
import { LoginComponent } from '../../src/app/pages/login/login.component';
import { TypeSelectionComponent } from '../../src/app/pages//type-selection/type-selection.component';
import { TicketComponent } from '../../src/app/pages//ticket/ticket.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Inline Redirect Component
const RedirectComponent = Component({
  standalone: true,
  imports: [CommonModule],
  template: `<p>Geçersiz URL, 10 saniye sonra ana sayfaya yönlendiriliyorsunuz...</p>`,
})(
  class {
    constructor(private router: Router) {}

    ngOnInit() {
      setTimeout(() => {
        this.router.navigateByUrl('/'); // 10 sn sonra login’e dön
      }, 10000);
    }
  }
);

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'type-selection', component: TypeSelectionComponent },
  { path: 'ticket', component: TicketComponent },
  { path: '**', component: RedirectComponent }, // Wildcard için 10sn bekle
];
