import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink, RouterLinkWithHref } from '@angular/router';
import { BookService } from '../../services/book.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-book-form.component',
  standalone: true,
  imports: [
    RouterLink,           
    RouterLinkWithHref, 
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private bookService: BookService, private router: Router, private route: ActivatedRoute) {}
  bookId: string | null = null;
  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', [Validators.required, Validators.pattern(/^\d{10,13}$/)]],
      publicationYear: [new Date().getFullYear(), [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]],
      categoryId: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {
      this.bookId = params['id'];
      if (this.bookId) {
        this.bookService.getBookById(this.bookId).subscribe(book => {
          this.bookForm.patchValue(book);
        });
      }
    });
  }

  bookForm!: FormGroup;

  Submit(): void {
    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;
      if (this.bookId) {
        this.bookService.updateBook(this.bookId, bookData).subscribe(() => {
          this.router.navigate(['/books']);
        });
      } else {
        this.bookService.createBook(bookData).subscribe(() => {
          this.router.navigate(['/books']);
        });
      }
    }
  }
  
}
