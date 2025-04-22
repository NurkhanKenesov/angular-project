import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="register-container">
      <h2>Регистрация</h2>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Имя пользователя</label>
          <input
            id="username"
            type="text"
            formControlName="username"
            class="form-control"
            [class.is-invalid]="username?.invalid && username?.touched"
          />
          <div class="invalid-feedback" *ngIf="username?.invalid && username?.touched">
            Введите имя пользователя
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            formControlName="email"
            class="form-control"
            [class.is-invalid]="email?.invalid && email?.touched"
          />
          <div class="invalid-feedback" *ngIf="email?.invalid && email?.touched">
            Введите корректный email
          </div>
        </div>

        <div class="form-group">
          <label for="password">Пароль</label>
          <input
            id="password"
            type="password"
            formControlName="password"
            class="form-control"
            [class.is-invalid]="password?.invalid && password?.touched"
          />
          <div class="invalid-feedback" *ngIf="password?.invalid && password?.touched">
            Пароль должен быть не менее 8 символов
          </div>
        </div>

        <div class="form-group">
          <label for="password2">Подтверждение пароля</label>
          <input
            id="password2"
            type="password"
            formControlName="password2"
            class="form-control"
            [class.is-invalid]="password2?.invalid && password2?.touched"
          />
          <div class="invalid-feedback" *ngIf="password2?.invalid && password2?.touched">
            Пароли не совпадают
          </div>
        </div>

        <div class="form-group">
          <label for="first_name">Имя</label>
          <input
            id="first_name"
            type="text"
            formControlName="first_name"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="last_name">Фамилия</label>
          <input
            id="last_name"
            type="text"
            formControlName="last_name"
            class="form-control"
          />
        </div>

        <button type="submit" class="btn btn-primary" [disabled]="registerForm.invalid || isLoading">
          {{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>

        <div class="mt-3">
          <a routerLink="/login">Уже есть аккаунт? Войдите</a>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
      max-width: 400px;
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
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', Validators.required],
      first_name: [''],
      last_name: ['']
    }, {
      validators: this.passwordMatchValidator
    });
  }

  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get password2() { return this.registerForm.get('password2'); }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('password2')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
} 