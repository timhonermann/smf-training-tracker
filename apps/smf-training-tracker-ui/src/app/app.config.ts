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
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { serverUrlInterceptor } from '@stt/shared/http/domain';
import { APP_CONFIG, AppConfig } from '@stt/shared/config/model';
import { registerLocaleData } from '@angular/common';
import deCh from '@angular/common/locales/de-CH';

registerLocaleData(deCh);

export function getApplicationConfig(config: AppConfig): ApplicationConfig {
  return {
    providers: [
      { provide: APP_CONFIG, useValue: config },
      provideBrowserGlobalErrorListeners(),
      provideZonelessChangeDetection(),
      provideRouter(appRoutes),
      provideAppInitializer(() => inject(IconService).init()),
      provideHttpClient(withInterceptors([serverUrlInterceptor])),
      provideLocale(),
      provideNativeDateAdapter(),
    ],
  }
}

function provideLocale(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: LOCALE_ID, useFactory: getBrowserLocale },
    { provide: MAT_DATE_LOCALE, useFactory: getBrowserLocale },
  ]);
}

function getBrowserLocale(): string {
  return navigator.language || 'en-US';
}
