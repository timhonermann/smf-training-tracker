import {
  ApplicationConfig,
  EnvironmentProviders,
  inject,
  LOCALE_ID,
  makeEnvironmentProviders,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { IconService } from '@stt/shared/icon/domain';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideAppInitializer(() => inject(IconService).init()),
    provideHttpClient(),
    provideLocale(),
    provideNativeDateAdapter(),
  ],
};

function provideLocale(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: LOCALE_ID, useFactory: getBrowserLocale },
    { provide: MAT_DATE_LOCALE, useFactory: getBrowserLocale },
  ]);
}

function getBrowserLocale(): string {
  return navigator.language || 'en-US';
}
