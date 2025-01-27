import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ProductsComponent } from './components/screens/products/products.component';
import { LoginComponent } from './components/screens/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
