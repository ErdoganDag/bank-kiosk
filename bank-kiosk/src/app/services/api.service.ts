import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:5058/api';

  constructor(private http: HttpClient) {}

  // 🔹 Buton listesini al
  getButtons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/buttons`);
  }

  // 🔹 Belirli bir butona ait kategorileri al
  getCategoriesByButton(buttonId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categories/${buttonId}`);
  }

  // 🔹 Yeni bilet oluştur (kimlik bilgileriyle)
  createTicket(data: any) {
    return this.http.post<any>(`${this.baseUrl}/tickets`, data);
  }

  // 🔹 Belirli işlem durumunu al
  getProcessStatus(processId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/processes/${processId}`);
  }

  // 🔹 Aktif işlemleri getir
  getActiveProcesses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/process/active`);
  }

  // 🔹 İşlem durumunu güncelle
  updateProcessStatus(id: number, newStatus: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/process/${id}/status`, JSON.stringify(newStatus), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
