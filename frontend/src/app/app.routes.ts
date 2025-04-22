import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:id', component: HomeComponent }, // Temporary until we create a category component
  { path: 'advertisement/:id', component: HomeComponent }, // Temporary until we create an advertisement component
  { path: '**', redirectTo: '' } // Redirect any unknown routes to home
];
