import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Category {
  id: number;
  name: string;
  icon: string;
  count: number;
}

interface Advertisement {
  id: number;
  title: string;
  price: number;
  location: string;
  image: string;
  date: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="home-container">
      <!-- Categories Section -->
      <section class="categories-section">
        <h2>Разделы на сервисе OnaiSell</h2>
        <div class="categories-grid">
          @for (category of categories; track category.id) {
            <div class="category-card" [routerLink]="['/category', category.id]">
              <i class="fas {{ category.icon }}"></i>
              <h3>{{ category.name }}</h3>
              <span class="count">{{ category.count }} объявлений</span>
            </div>
          }
        </div>
      </section>

      <!-- Recent Advertisements -->
      <section class="advertisements-section">
        <h2>Новые объявления</h2>
        <div class="ads-grid">
          @for (ad of recentAds; track ad.id) {
            <div class="ad-card" [routerLink]="['/advertisement', ad.id]">
              <img [src]="ad.image" [alt]="ad.title">
              <div class="ad-info">
                <h3>{{ ad.title }}</h3>
                <p class="price">{{ ad.price | currency:'KZT':'symbol-narrow':'1.0-0' }}</p>
                <div class="ad-details">
                  <span class="location">
                    <i class="fas fa-map-marker-alt"></i> {{ ad.location }}
                  </span>
                  <span class="date">{{ ad.date }}</span>
                </div>
              </div>
            </div>
          }
        </div>
      </section>
    </main>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #1F2937;
    }

    /* Categories Section */
    .categories-section {
      margin-bottom: 3rem;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .category-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      text-align: center;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .category-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .category-card i {
      font-size: 2rem;
      color: #10B981;
      margin-bottom: 1rem;
    }

    .category-card h3 {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
      color: #1F2937;
    }

    .count {
      color: #6B7280;
      font-size: 0.9rem;
    }

    /* Advertisements Section */
    .advertisements-section {
      margin-bottom: 3rem;
    }

    .ads-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .ad-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .ad-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .ad-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .ad-info {
      padding: 1rem;
    }

    .ad-info h3 {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
      color: #1F2937;
    }

    .price {
      font-size: 1.2rem;
      font-weight: 600;
      color: #10B981;
      margin-bottom: 0.5rem;
    }

    .ad-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #6B7280;
      font-size: 0.9rem;
    }

    .location i {
      margin-right: 0.25rem;
    }

    /* Responsive Design */
    @media (max-width: 640px) {
      .categories-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      }

      .ads-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  categories: Category[] = [
    { id: 1, name: 'Недвижимость', icon: 'fa-home', count: 1234 },
    { id: 2, name: 'Транспорт', icon: 'fa-car', count: 5678 },
    { id: 3, name: 'Электроника', icon: 'fa-mobile-alt', count: 3456 },
    { id: 4, name: 'Работа', icon: 'fa-briefcase', count: 890 },
    { id: 5, name: 'Услуги', icon: 'fa-tools', count: 2345 },
    { id: 6, name: 'Личные вещи', icon: 'fa-tshirt', count: 4567 },
    { id: 7, name: 'Для дома', icon: 'fa-couch', count: 3789 },
    { id: 8, name: 'Хобби', icon: 'fa-gamepad', count: 1234 }
  ];

  recentAds: Advertisement[] = [
    {
      id: 1,
      title: '3-комнатная квартира, 80 м²',
      price: 25000000,
      location: 'Алматы',
      image: 'assets/images/apartment.jpg',
      date: '1 час назад'
    },
    {
      id: 2,
      title: 'Toyota Camry 70, 2020 год',
      price: 15000000,
      location: 'Астана',
      image: 'assets/images/car.jpg',
      date: '2 часа назад'
    },
    {
      id: 3,
      title: 'iPhone 13 Pro, 256 GB',
      price: 450000,
      location: 'Шымкент',
      image: 'assets/images/phone.jpg',
      date: '3 часа назад'
    },
    {
      id: 4,
      title: 'Ноутбук MacBook Pro 16"',
      price: 950000,
      location: 'Алматы',
      image: 'assets/images/laptop.jpg',
      date: '5 часов назад'
    }
  ];
}
