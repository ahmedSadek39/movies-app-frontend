import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoaderService } from './loader.service';

export const LoaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  
  let counter = 0;
  
  const isLoaderEnabled = !req.params.has('loader') || req.params.get('loader') !== 'no';

  if (isLoaderEnabled) {
    loaderService.show();
    counter++;
  }
  return next(req).pipe(
    finalize(() => {
      counter--;
      if (counter <= 0) {
        loaderService.hide();
      }
    })
  );
};
