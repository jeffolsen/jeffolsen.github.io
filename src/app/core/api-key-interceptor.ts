import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { Config } from './config';

/** Marks requests as using a read-only API key (rather than a user's auth session) for requests targeting the configured API base URL. */
export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(Config).value();

  if (!config.apiBaseUrl || !req.url.startsWith(config.apiBaseUrl) || !config.apiKey) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        'X-Api-Key': config.apiKey,
        'X-Api-Slug': config.apiSlug,
      },
    }),
  );
};
