import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './app-config.service';

export interface SegmentControlRequest {
  tckn?: string;
  vkn?: string;
  mobile?: string;
}

export interface SegmentControlResponse {
  success: boolean;
  mesaj: string;
  segmentNumber?: number;
  isim: string;
}

@Injectable({
  providedIn: 'root',
})
export class SegmentService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  // Segment kontrolünü çağıracak fonksiyon
  segmentControl(req: SegmentControlRequest): Observable<SegmentControlResponse> {
    if (!this.config.apiUrl) {
      throw new Error('ConfigService.apiUrl yüklenmemiş!');
    }

    const url = `${this.config.apiUrl}/BankCustomers/segmentcontrol`;
    return this.http.post<SegmentControlResponse>(url, req);
  }
}
