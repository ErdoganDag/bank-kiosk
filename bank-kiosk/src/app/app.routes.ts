import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TypeSelectionComponent } from './pages/type-selection/type-selection.component';
import { TicketComponent } from './pages/ticket/ticket.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'type-selection', component: TypeSelectionComponent },
  { path: 'ticket', component: TicketComponent },
  { path: '**', redirectTo: '' },
];
