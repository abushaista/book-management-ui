import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list.component/book-list.component';
import { BookFormComponent } from './components/book-form.component/book-form.component';


export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent },
  { path: 'books/new', component: BookFormComponent },
  { path: 'books/:id/edit', component: BookFormComponent },
];