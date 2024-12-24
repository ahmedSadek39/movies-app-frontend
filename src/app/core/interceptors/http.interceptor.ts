import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APIErrorResponse } from '@models/api-response.model';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@services/toast.service';

export const HttpInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const authService = inject(AuthService);

  let token: string = localStorage.getItem('token') || '';

  if (token) {
    req = req.clone({
      setHeaders: {
        authorization: token,
      },
    });
  }

  return next(req).pipe(
    catchError((error: APIErrorResponse) => {
      let msg = '';
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.error('Error Event');
        } else {
          switch (error.status) {
            case 401:
              msg = 'Unauthorized';
              authService.logoutLocal();
              break;
            case 403:
              msg = 'Forbidden';
              authService.goToForbiddenPage();
              break;
            case 429:
              msg = 'Too many requests';
              authService.logoutLocal();
              break;
          }
        }
      }

      msg =
        msg ||
        error.error.developerMessage ||
        error.error.clientMessage ||
        error.error.message ||
        error.statusText ||
        'Something Went Wrong';
        
      toastService.showError(msg);
      return throwError(() => error);
    })
  );
};
