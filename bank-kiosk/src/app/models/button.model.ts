import { Category } from './category.model';

export interface Button {
  id: number;
  name: string;
  categories?: Category[]; // 🔹 Bu butona ait kategoriler (isteğe bağlı)
}
