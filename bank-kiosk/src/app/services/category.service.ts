import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './app-config.service';
import { map, Observable } from 'rxjs';
import { Category, TicketResponse } from './models';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.config.apiUrl}/categories`)
      .pipe(map((categories: any[]) => categories.filter((c) => c.segmentNumber !== 1)));
  }

  createTicket(ticket: {
    ticketNumber: number;
    categoryId: number;
    buttonId: number;
    identityType?: string;
    identityValue?: string;
  }): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(`${this.config.apiUrl}/ticket`, ticket);
  }
}
