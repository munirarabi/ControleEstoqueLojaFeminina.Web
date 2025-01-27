import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken');
  const router = inject(Router); // Injeção do Router

  const clonedRequest = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(clonedRequest).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Redireciona o usuário para /login no caso de 401
        router.navigate(['/login']);
        localStorage.removeItem('authToken'); // Remove o token inválido
      }
      return throwError(() => error);
    })
  );
};
