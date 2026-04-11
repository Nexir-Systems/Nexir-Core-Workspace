import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppThemeService } from '@core/app-theme.service';

import { routes } from './app.routes';

function initTheme(theme: AppThemeService): () => void {
  return () => {
    theme.applyFromStorage();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    importProvidersFrom(MatSnackBarModule),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initTheme,
      deps: [AppThemeService],
      multi: true,
    },
  ],
};
