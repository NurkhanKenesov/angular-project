import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="logo">
        <a routerLink="/">ONAISELL</a>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="Поиск" class="search-input">
      </div>
      <nav class="nav-links">
        <ng-container *ngIf="!(authService.currentUser$ | async); else userMenu">
          <a routerLink="/login" class="btn btn-login">Войти</a>
          <a routerLink="/register" class="btn btn-register">Регистрация</a>
        </ng-container>
        <ng-template #userMenu>
          <a routerLink="/profile" class="btn btn-profile">Профиль</a>
          <button (click)="logout()" class="btn btn-logout">Выйти</button>
        </ng-template>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .logo a {
      font-size: 1.5rem;
      font-weight: bold;
      color: #28a745;
      text-decoration: none;
    }

    .search-bar {
      flex: 1;
      max-width: 600px;
      margin: 0 2rem;
    }

    .search-input {
      width: 100%;
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .nav-links {
      display: flex;
      gap: 1rem;
    }

    .btn {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;
    }

    .btn-login {
      color: #28a745;
      border: 1px solid #28a745;
    }

    .btn-register {
      background-color: #28a745;
      color: white;
      border: none;
    }

    .btn-profile {
      color: #28a745;
      border: 1px solid #28a745;
    }

    .btn-logout {
      background-color: #dc3545;
      color: white;
      border: none;
    }

    main {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
