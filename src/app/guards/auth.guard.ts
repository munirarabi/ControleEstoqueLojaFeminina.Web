import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken');

  if (token) {
    return true; // Permite o acesso à rota
  } else {
    router.navigate(['/login']); // Redireciona para a página de login
    return false; // Bloqueia o acesso
  }
};
