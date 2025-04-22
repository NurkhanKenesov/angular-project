import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="logo">
          <a routerLink="/" class="logo-text">ONAISELL</a>
        </div>

        <div class="search-bar">
          <input type="text" placeholder="Поиск" class="search-input">
          <button class="search-button">
            <i class="fas fa-search"></i>
          </button>
        </div>

        <button class="add-ad-button">
          <i class="fas fa-plus"></i>
          Добавить объявление
        </button>

        <div class="dropdown">
          <button class="dropdown-button">
            Категории
          </button>
        </div>

        <a routerLink="/favorites" class="favorites">
          <i class="fas fa-heart"></i>
          Избранное
        </a>

        @if (isLoggedIn()) {
          <div class="dropdown">
            <button class="dropdown-button user-button" (click)="toggleDropdown()">
              <i class="fas fa-user"></i>
              Профиль
            </button>
            @if (showDropdown) {
              <div class="dropdown-menu">
                <a routerLink="/profile">Мой профиль</a>
                <a routerLink="/settings">Настройки</a>
                <a (click)="logout()">Выйти</a>
              </div>
            }
          </div>
        } @else {
          <div class="auth-buttons">
            <a routerLink="/login" class="login-button">Войти</a>
            <a routerLink="/signup" class="signup-button">Регистрация</a>
          </div>
        }
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: white;
      padding: 1rem 0;
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: bold;
      text-decoration: none;
      color: #333;
    }

    .search-bar {
      display: flex;
      flex: 1;
      max-width: 400px;
      position: relative;
    }

    .search-input {
      width: 100%;
      padding: 0.5rem 2.5rem 0.5rem 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 4px;
      font-size: 0.9rem;
    }

    .search-button {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      padding: 0 1rem;
      background: none;
      border: none;
      color: #666;
      cursor: pointer;
    }

    .add-ad-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background-color 0.3s;
    }

    .add-ad-button:hover {
      background-color: #45a049;
    }

    .dropdown {
      position: relative;
    }

    .dropdown-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: none;
      border: none;
      color: #333;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .dropdown-menu {
      position: absolute;
      right: 0;
      top: 100%;
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      z-index: 1001;
      display: flex;
      flex-direction: column;
      min-width: 150px;
    }

    .dropdown-menu a {
      padding: 0.5rem 1rem;
      text-decoration: none;
      color: #333;
    }

    .dropdown-menu a:hover {
      background: #f5f5f5;
    }

    .favorites {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #333;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .favorites:hover {
      color: #4CAF50;
    }

    .user-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .auth-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .login-button, .signup-button {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .login-button {
      color: #333;
      border: 1px solid #e0e0e0;
    }

    .signup-button {
      background-color: #4CAF50;
      color: white;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .container {
        flex-wrap: wrap;
      }
      
      .search-bar {
        order: 3;
        max-width: 100%;
        margin-top: 1rem;
      }
    }
  `]
})
export class HeaderComponent {
  isLoggedIn = signal(false); // Замените на реальную проверку авторизации
  showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    this.isLoggedIn.set(false);
    this.showDropdown = false;
    // Добавьте здесь вызов API для выхода, если нужно
  }
}