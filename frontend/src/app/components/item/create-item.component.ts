import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item.service';
import { Category } from '../../models/item.model';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="create-item-container">
      <h2>Создать объявление</h2>
      <form [formGroup]="itemForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="title">Заголовок</label>
          <input
            id="title"
            type="text"
            formControlName="title"
            class="form-control"
            [class.is-invalid]="title?.invalid && title?.touched"
          />
          <div class="invalid-feedback" *ngIf="title?.invalid && title?.touched">
            Введите заголовок объявления
          </div>
        </div>

        <div class="form-group">
          <label for="description">Описание</label>
          <textarea
            id="description"
            formControlName="description"
            class="form-control"
            rows="4"
            [class.is-invalid]="description?.invalid && description?.touched"
          ></textarea>
          <div class="invalid-feedback" *ngIf="description?.invalid && description?.touched">
            Введите описание объявления
          </div>
        </div>

        <div class="form-group">
          <label for="price">Цена</label>
          <input
            id="price"
            type="number"
            formControlName="price"
            class="form-control"
            [class.is-invalid]="price?.invalid && price?.touched"
          />
          <div class="invalid-feedback" *ngIf="price?.invalid && price?.touched">
            Введите корректную цену
          </div>
        </div>

        <div class="form-group">
          <label for="phone_number">Номер телефона</label>
          <input
            id="phone_number"
            type="tel"
            formControlName="phone_number"
            class="form-control"
            [class.is-invalid]="phone_number?.invalid && phone_number?.touched"
          />
          <div class="invalid-feedback" *ngIf="phone_number?.invalid && phone_number?.touched">
            Введите корректный номер телефона
          </div>
        </div>

        <div class="form-group">
          <label for="category">Категория</label>
          <select
            id="category"
            formControlName="category"
            class="form-control"
            [class.is-invalid]="category?.invalid && category?.touched"
          >
            <option value="">Выберите категорию</option>
            @for (cat of categories; track cat.id) {
              <option [value]="cat.id">{{ cat.name }}</option>
            }
          </select>
          <div class="invalid-feedback" *ngIf="category?.invalid && category?.touched">
            Выберите категорию
          </div>
        </div>

        <div class="form-group form-check">
          <input
            id="whatsapp_enabled"
            type="checkbox"
            formControlName="whatsapp_enabled"
            class="form-check-input"
          />
          <label class="form-check-label" for="whatsapp_enabled">
            Включить WhatsApp для связи
          </label>
        </div>

        <button type="submit" class="btn btn-primary" [disabled]="itemForm.invalid || isLoading">
          {{ isLoading ? 'Создание...' : 'Создать объявление' }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    .create-item-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .form-control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .btn-primary {
      width: 100%;
      padding: 0.75rem;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-primary:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
    .invalid-feedback {
      color: #dc3545;
      font-size: 0.875rem;
    }
    .form-check {
      margin: 1rem 0;
    }
  `]
})
export class CreateItemComponent implements OnInit {
  itemForm: FormGroup;
  categories: Category[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      phone_number: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      category: ['', Validators.required],
      whatsapp_enabled: [false]
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.itemService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  get title() { return this.itemForm.get('title'); }
  get description() { return this.itemForm.get('description'); }
  get price() { return this.itemForm.get('price'); }
  get phone_number() { return this.itemForm.get('phone_number'); }
  get category() { return this.itemForm.get('category'); }

  onSubmit() {
    if (this.itemForm.valid) {
      this.isLoading = true;
      this.itemService.createItem(this.itemForm.value).subscribe({
        next: (item) => {
          this.router.navigate(['/items', item.id]);
        },
        error: (error) => {
          console.error('Error creating item:', error);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
} 