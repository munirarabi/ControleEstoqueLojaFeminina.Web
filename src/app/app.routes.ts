import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { ProductsComponent } from './components/screens/products/products.component';
import { LoginComponent } from './components/screens/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] }, // Usando a função guard
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
