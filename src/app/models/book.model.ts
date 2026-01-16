export interface Book {
  id?: string;
  title: string;
  author: string;
  isbn: string;
  publicationYear: number;
  categoryId: string;
  description?: string;
}
