import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './app-config.service';

export interface Ticket {
  ticketNumber: number;
  createdAt?: string;
  categoryId?: number | null;
  buttonId?: number | null;
  identityType?: string | null; // backend ile uyumlu
  identityValue?: string | null; // backend ile uyumlu

  // PDF için ek alanlar, backend’e gönderilmez
  processType?: string;
  userType?: string;
}
export interface TicketCreateDto {
  categoryId?: number | null;
  buttonId?: number | null;
  identityType?: string | null;
  identityValue?: string | null;
  segmentNumber?: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = `${this.config.apiUrl}/Ticket`;
  }

  createTicket(dto: TicketCreateDto): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}/create`, dto);
  }
}
