import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({ opacity: 0, transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class ToastComponent {
  message = '';
  type: 'success' | 'error' | 'info' = 'info';
  visible = false;
  timeout: any;

  /** 🔹 Toast mesajını gösterir */
  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.message = message;
    this.type = type;
    this.visible = true;

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.hide(), 3000); // 3 sn sonra otomatik kapanır
  }

  /** 🔹 Toast mesajını gizler */
  hide() {
    this.visible = false;
  }
}
