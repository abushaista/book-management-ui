import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list.component/book-list.component';
import { BookFormComponent } from './components/book-form.component/book-form.component';
import { CategoryListComponent } from './components/category-list.component/category-list.component';
import { CategoryFormComponent } from './components/category-form.component/category-form.component';


export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent },
  { path: 'books/new', component: BookFormComponent },
  { path: 'books/:id/edit', component: BookFormComponent },

  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/new', component: CategoryFormComponent },
  { path: 'categories/edit/:id', component: CategoryFormComponent }
];