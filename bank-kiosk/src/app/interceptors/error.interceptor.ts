import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error) => {
      let message = 'Bir hata oluştu.';

      if (error.status === 0) {
        message = 'Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.';
      } else if (error.status >= 500) {
        message = 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.';
      } else if (error.status === 404) {
        message = 'İstenilen kaynak bulunamadı.';
      } else if (error.error?.message) {
        message = error.error.message;
      }

      // 🔹 Burada sadece show() fonksiyonu çağrılıyor
      toast.show(message, 'error');

      return throwError(() => error);
    })
  );
};
