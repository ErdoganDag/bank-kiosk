import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Geçersiz URL, 10 saniye sonra ana sayfaya yönlendiriliyorsunuz...</p>`
})
export class RedirectComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // 10 saniye bekle ve login sayfasına git
    setTimeout(() => {
      // navigateByUrl kullanmak daha güvenli
      this.router.navigateByUrl('/');
    }, 10000);
  }
}
