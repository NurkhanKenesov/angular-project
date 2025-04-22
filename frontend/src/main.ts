import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./app/components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./app/components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./app/components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'items/create',
    loadComponent: () => import('./app/components/item/create-item.component').then(m => m.CreateItemComponent)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full' as const
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor]))
  ]
}).catch(err => console.error(err));
