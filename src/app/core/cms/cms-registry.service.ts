import { inject, Service, signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Feed } from './models/feed.model';
import { Item } from './models/item.model';
import { Api } from '../api/api';
import { HttpParams } from '@angular/common/http';
import { SubjectType } from './models/block-config.model';

export interface FeedResponse {
  feed: Feed;
}

export interface ItemResponse {
  item: Item;
}

export interface ErrorResponse {
  error: unknown;
}

@Service()
export class CmsRegistry {
  private readonly api = inject(Api);

  getFeedByPath(path: string, subjectType: SubjectType = 'COLLECTION'): Observable<Feed | null> {
    const params = new HttpParams({
      fromObject: {
        liveOnly: 'true',
        includes: 'tags,components,links',
        path,
        subjectType,
      },
    });
    return this.api.fetch<FeedResponse>(`/feeds/by-path?${params.toString()}`).pipe(
      map((response) => response.feed),
      catchError(() => of(null)),
    );
  }
  getItemBySlug(slug: string): Observable<Item | null> {
    const params = new HttpParams({
      fromObject: {
        liveOnly: 'true',
        includes: 'tags,images,dateRanges',
      },
    });
    return this.api.fetch<ItemResponse>(`/item/by-slug/${slug}?${params.toString()}`).pipe(
      map((response) => response.item),
      catchError(() => of(null)),
    );
  }
}
