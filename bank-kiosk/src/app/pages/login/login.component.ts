import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import {
  SegmentService,
  SegmentControlRequest,
  SegmentControlResponse,
} from '../../services/segment.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  inputValue: string = '';
  errorMessage: string = '';
  numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  constructor(private router: Router, private segmentService: SegmentService) {}

  press(num: string) {
    if (this.inputValue.length < 11) {
      this.inputValue += num;
      this.errorMessage = '';
    }
  }

  clear() {
    this.inputValue = '';
    this.errorMessage = '';
  }

  confirm() {
    const type = this.kontrolEt(this.inputValue);
    if (type === 'GEÇERSİZ') {
      this.errorMessage = 'Geçersiz numara. Lütfen tekrar deneyin.';
      return;
    }

    // Sadece dolu alan gönder
    const req: SegmentControlRequest = {
      tckn: type === 'TCKN' ? this.inputValue : undefined,
      vkn: type === 'VKN' ? this.inputValue : undefined,
      mobile: type === 'CEP' ? this.inputValue : undefined,
    };

    this.segmentService.segmentControl(req).subscribe({
      next: (res) => {
        // segmentNumber 0 veya >0 fark etmez, normal flow
        localStorage.setItem('segmentData', JSON.stringify(res));
        this.router.navigate(['/type-selection']);
      },
      error: (err) => {
        this.errorMessage = 'API hatası: ' + (err.message || 'Bilinmeyen hata');
      },
    });
  }

  kontrolEt(input: string): 'TCKN' | 'VKN' | 'CEP' | 'GEÇERSİZ' {
    if (/^[1-9]\d{10}$/.test(input)) return 'TCKN';
    if (/^\d{10}$/.test(input)) return 'CEP';
    if (/^\d{8,10}$/.test(input)) return 'VKN';
    return 'GEÇERSİZ';
  }
}
