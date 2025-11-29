import { Button } from './button.model';
import { Category } from './category.model';

export interface Ticket {
  id: number;
  buttonId: number;
  categoryId: number;
  button?: Button; // isteğe bağlı, API dönebilir
  category?: Category; // isteğe bağlı, API dönebilir
  identityType: string;
  identityValue: string;
  ticketNumber?: string; // isteğe bağlı
  createdAt: string; // ISO tarih formatında döner, örn: "2025-11-09T12:34:56"
}
