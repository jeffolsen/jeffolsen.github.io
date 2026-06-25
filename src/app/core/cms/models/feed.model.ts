import { SeoMetadata } from './seo.model';
import { CmsTagFeed } from './tag.model';
import { CmsLinkFeed } from './link.model';
import { CmsBlockConfig } from './block-config.model';

export interface Feed extends SeoMetadata {
  id: number;
  tags: CmsTagFeed;
  links: CmsLinkFeed;
  components: CmsBlockConfig[];
}
