import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { CsrfService } from '../services/csrf.service';

export const csrfInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const csrfService = inject(CsrfService);
  const router = inject(Router);

  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
    return next(req);
  }

  return csrfService.getCsrfToken().pipe(
    switchMap(token => {
      const csrfReq = req.clone({
        setHeaders: {
          'X-CSRF-TOKEN': token
        }
      });
      return next(csrfReq);
    }),
    catchError(error => {
      if (error.status === 401) {
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
