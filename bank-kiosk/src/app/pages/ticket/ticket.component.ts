import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUniversity, faUser, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { TicketService, Ticket } from '../../services/ticket.service';
import { setPdfMakeVfs, pdfMake } from '../../helpers/pdfmake-setup';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, DatePipe, QRCodeComponent, FontAwesomeModule, HttpClientModule],
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  providers: [DatePipe],
})
export class TicketComponent implements OnInit {
  ticket!: Ticket;
  categoryName!: string;
  ticketNumber: number = 0;
  date: Date = new Date();

  constructor(
    private library: FaIconLibrary,
    private ticketService: TicketService,
    private router: Router
  ) {
    library.addIcons(faUniversity, faUser, faBuilding);
  }

  ngOnInit(): void {
    const state = history.state;
    if (state.ticket) {
      this.ticket = state.ticket;
      this.categoryName = state.categoryName || 'Bilinmeyen İşlem';
      this.ticketNumber = this.ticket.ticketNumber; // ticketNumber property’sine ata
      this.date = new Date(this.ticket.createdAt || new Date());
    } else {
      this.router.navigate(['/type-selection']); // ticket yoksa geri gönder
    }
  }
  getProcessIcon() {
    const type = this.categoryName?.toLowerCase();
    if (type === 'gişe işlemleri') return faUniversity;
    if (type === 'bireysel işlemler') return faUser;
    if (type === 'ticari işlemler') return faBuilding;
    return faUser; // default icon
  }

  generatePDFAndPrint() {
    if (!this.ticket) return;

    const docDefinition: any = {
      content: [
        { text: '📄 Biletiniz Hazır', style: 'header', alignment: 'center' },
        { text: `Sıra Numaranız: ${this.ticket.ticketNumber}`, margin: [0, 10, 0, 0] },
        { text: `İşlem Türü: ${this.categoryName}` },
        { text: `Tarih: ${this.date.toLocaleString()}`, margin: [0, 0, 0, 10] },
        {
          qr: this.ticket.ticketNumber.toString(),
          fit: 150,
          alignment: 'center',
          margin: [0, 10, 0, 0],
        },
      ],
      styles: { header: { fontSize: 22, bold: true } },
      defaultStyle: { font: 'Helvetica' },
    };

    pdfMake.createPdf(docDefinition).print();
  }
}
