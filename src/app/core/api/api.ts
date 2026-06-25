import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, from, map, of, shareReplay, switchMap } from 'rxjs';

import { Cache } from './cache';
import { Config } from '../config';

const DEFAULT_TTL_MS = 5 * 60 * 1000;

@Service()
export class Api {
  private readonly http = inject(HttpClient);
  private readonly cache = inject(Cache);
  private readonly config = inject(Config);
  private readonly inFlight = new Map<string, Observable<unknown>>();

  /** Cache-first fetch: serves a fresh cache entry if present, otherwise hits the API and caches the result. */
  fetch<T>(path: string, options: { ttlMs?: number } = {}): Observable<T> {
    const ttlMs = options.ttlMs ?? DEFAULT_TTL_MS;
    const url = `${this.config.value().apiBaseUrl}${path}`;
    const cacheKey = url;

    const existing = this.inFlight.get(cacheKey) as Observable<T> | undefined;
    if (existing) {
      return existing;
    }

    const request$ = from(this.cache.get<T>(cacheKey)).pipe(
      switchMap((cached) => {
        if (cached !== undefined) {
          return of(cached);
        }
        return this.http
          .get<T>(url)
          .pipe(
            switchMap((response) =>
              from(this.cache.set(cacheKey, response, ttlMs)).pipe(map(() => response)),
            ),
          );
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    this.inFlight.set(cacheKey, request$);
    request$.subscribe({
      complete: () => this.inFlight.delete(cacheKey),
      error: () => this.inFlight.delete(cacheKey),
    });

    return request$;
  }
}
