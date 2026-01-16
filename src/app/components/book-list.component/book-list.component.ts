import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardTitle, MatCardContent } from "@angular/material/card";

@Component({
  selector: 'app-book-list.component',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkWithHref,
    MatToolbarModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatCard,
    MatCardTitle,
    MatCardContent
],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent implements OnInit {
  books : Book[] = [];
  filteredBooks : Book[] = [];
  searchTerm: string = '';

  constructor(private bookService: BookService, private router: Router) {}
  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
      this.bookService.getBooks().subscribe((data: Book[]) => {
        this.books = data;
        this.filteredBooks = data;
      });
  
    }
    searchBooks(): void {
      if (this.searchTerm.trim() === '') {
        this.filteredBooks = this.books;
      } else {
        const lowerSearchTerm = this.searchTerm.toLowerCase();
        this.filteredBooks = this.books.filter(book =>
          book.title.toLowerCase().includes(lowerSearchTerm) ||
          book.author.toLowerCase().includes(lowerSearchTerm) ||
          book.isbn.toLowerCase().includes(lowerSearchTerm)
        );
      }
    }
    editBook(id: string) {
      this.router.navigate(['/books/edit', id]);
    }
  
    deleteBook(id: string) {
      this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
    }

}
