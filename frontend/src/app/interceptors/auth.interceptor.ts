import {
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let isRefreshing = false;

  const token = localStorage.getItem('access_token');
  
  if (token) {
    request = addToken(request, token);
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isRefreshing) {
        return handle401Error(request, next);
      }
      return throwError(() => error);
    })
  );

  function addToken(request: HttpRequest<unknown>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  function handle401Error(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    if (!isRefreshing) {
      isRefreshing = true;

      return authService.refreshToken().pipe(
        switchMap((response) => {
          isRefreshing = false;
          return next(addToken(request, response.access));
        }),
        catchError((error) => {
          isRefreshing = false;
          authService.logout();
          router.navigate(['/login']);
          return throwError(() => error);
        })
      );
    }
    return next(request);
  }
}; 