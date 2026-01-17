import { Component, OnInit, inject, Injectable } from '@angular/core';
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
import { Sidebar } from "../../shared/sidebar/sidebar";
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

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
    MatCardContent,
    Sidebar,
    AsyncPipe
],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent implements OnInit {
  private bookService: BookService = inject(BookService);
  private router: Router = inject(Router);
  books : Book[] = [];
  $filteredBooks : Observable<Book[]> = this.bookService.getBooks();
  searchTerm: string = '';

  
  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
      this.bookService.getBooks().subscribe((data: Book[]) => {
        this.books = data;
        
      });
  
    }
    searchBooks(): void {
      if (this.searchTerm.trim() === '') {
        this.$filteredBooks = this.bookService.getBooks();
      } else {
        const lowerSearchTerm = this.searchTerm.toLowerCase();
        this.$filteredBooks = this.bookService.getBooks().pipe(
          map(books => books.filter(book => book.title.toLowerCase().includes(lowerSearchTerm) || book.author.toLowerCase().includes(lowerSearchTerm))) 
        )
      }
    }
    editBook(id: string) {
      this.router.navigate(['/books/edit', id]);
    }
  
    deleteBook(id: string) {
      this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
    }

}
