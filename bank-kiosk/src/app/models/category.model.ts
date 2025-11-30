import { Button } from './button.model';
import { Ticket } from './ticket.model';

export interface Category {
  id: number;
  name: string;
  buttonId: number;
  button?: Button; // API'den dönebilir ama her zaman zorunlu değil
  tickets?: Ticket[]; // İsteğe bağlı, kategoriyle birlikte gelebilir
}
