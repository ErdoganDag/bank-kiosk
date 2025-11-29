import { Injectable } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastComponent?: ToastComponent;

  /** 🔹 Uygulamanın kökünde (app.component.ts) çağrılır */
  register(toast: ToastComponent) {
    this.toastComponent = toast;
  }

  /** 🔹 Mesaj göster */
  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.toastComponent?.show(message, type);
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  info(message: string) {
    this.show(message, 'info');
  }
}
