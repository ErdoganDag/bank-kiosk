export interface Category {
  id: number;
  name: string;
  buttonId: number;
  startNumber: number;
  endNumber: number;
}

export interface TicketResponse {
  id: number;
  ticketNumber: number;
  categoryId: number;
  buttonId: number;
  identityType?: string;
  identityValue?: string;
}
