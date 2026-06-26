// page-resolver.ts
import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { Feed } from './models/feed.model';
import { Item } from './models/item.model';
import { CmsRegistry } from './cms-registry.service';

export type PageResolution =
  | { type: 'feed'; data: Feed }
  | { type: 'item'; feed: Feed; item: Item }
  | { type: 'not-found' };

export const pageResolver: ResolveFn<PageResolution> = (route: ActivatedRouteSnapshot) => {
  const cms = inject(CmsRegistry);
  const segments = route.url.map((s) => s.path);

  const pageResolution = cms
    .getFeedByPath('cv')
    .pipe(
      map((feed) =>
        feed ? ({ type: 'feed', data: feed } as const) : ({ type: 'not-found' } as const),
      ),
    );
  return pageResolution;
};
