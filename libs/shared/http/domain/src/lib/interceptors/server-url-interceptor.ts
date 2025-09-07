import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '@stt/shared/config/model';

export const serverUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject<AppConfig>(APP_CONFIG);

  if (req.url.startsWith('icons')) {
    return next(req);
  }

  const reqWithServerUrl = req.clone({
    url: `${config.serverUrl}/${req.url}`,
  });

  return next(reqWithServerUrl);
};
