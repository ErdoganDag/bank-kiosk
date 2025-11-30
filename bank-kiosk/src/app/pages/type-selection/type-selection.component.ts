import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { TicketService, Ticket } from '../../services/ticket.service';
import { Category } from '../../services/models';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUniversity,
  faUser,
  faBuilding,
  faQuestionCircle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-type-selection',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './type-selection.component.html',
  styleUrls: ['./type-selection.component.css'],
})
export class TypeSelectionComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory?: Category;

  constructor(
    private categoryService: CategoryService,
    private ticketService: TicketService,
    private router: Router,
    private library: FaIconLibrary
  ) {
    // FontAwesome ikonlarını ekle
    library.addIcons(faUniversity, faUser, faBuilding, faQuestionCircle);
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        console.log('Kategoriler yüklendi:', this.categories);
      },
      error: (err: any) => console.error('❌ Kategori yüklenemedi:', err),
    });
  }

  selectCategory(category: Category) {
    const segmentData = JSON.parse(localStorage.getItem('segmentData') || '{}');
    const segmentNumber = segmentData.segmentNumber ?? 0;
    const ticketDto = {
      categoryId: category.id,
      buttonId: category.buttonId,
      segmentNumber: segmentNumber,
    };

    this.ticketService.createTicket(ticketDto).subscribe({
      next: (ticket: Ticket) => {
        this.router.navigate(['/ticket'], { state: { ticket, categoryName: category.name } });
      },
      error: (err: any) => console.error('❌ Bilet oluşturulamadı:', err),
    });
  }

  // Dinamik icon döndüren fonksiyon
  getCategoryIcon(categoryName: string): IconDefinition {
    if (!categoryName) {
      console.log('CategoryName boş, default ikon kullanılıyor.');
      return faQuestionCircle;
    }

    const name = categoryName.trim().toLowerCase();
    console.log('CategoryName:', categoryName, '| Normalized:', name);

    if (name.includes('gişe')) return faUniversity;
    if (name.includes('bireysel')) return faUser;
    if (name.includes('ticari')) return faBuilding;

    console.warn('Bilinmeyen kategori, default ikon kullanılıyor:', categoryName);
    return faQuestionCircle;
  }
}
