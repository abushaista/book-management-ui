import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { Sidebar } from "../../shared/sidebar/sidebar";
import { Observable } from 'rxjs';
import { MatCard, MatCardTitle, MatCardContent } from "@angular/material/card";

@Component({
  selector: 'app-category-list.component',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkWithHref,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    Sidebar,
    MatCard,
    MatCardTitle,
    MatCardContent
],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  $categories: Observable<Category[]> = this.categoryService.getCategories();
  displayedColumns: string[] = ['name', 'description', 'actions'];

  ngOnInit(): void {
  
  }

  editCategory(id: string) {
    this.router.navigate(['/categories/edit', id]);
  }

  deleteCategory(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return;
    // Implement delete logic here
    console.log('Deleting category with id:', id);
    // After deletion, reload categories
    
  }
}