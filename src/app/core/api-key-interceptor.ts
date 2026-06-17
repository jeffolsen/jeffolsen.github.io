import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { Config } from './config';

/** Attaches the API key to requests targeting the configured API base URL. */
export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(Config).value();

  if (!config.apiBaseUrl || !req.url.startsWith(config.apiBaseUrl) || !config.apiKey) {
    return next(req);
  }

  return next(req.clone({ setHeaders: { Authorization: `Bearer ${config.apiKey}` } }));
};
