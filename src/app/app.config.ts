import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HttpInterceptor } from '@core/interceptors/http.interceptor';
import { LoaderInterceptor } from '@components/loader/loader.interceptor';
import { ConfirmationService } from 'primeng/api';
import { TranslatePipe } from './pipes/translate.pipe';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

export const appConfig: ApplicationConfig = {
  providers: [
    ConfirmationService,
    TranslatePipe,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([HttpInterceptor, LoaderInterceptor])),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }), provideHotToastConfig(
      {
        autoClose : true,
        duration: 3000
      }
    ),
  ],
};


