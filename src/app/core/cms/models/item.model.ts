import { DateRange } from './date-range.model';
import { Image } from './image.model';
import { CmsTag } from './tag.model';
import { TiptapNode } from './rich-content.model';

export interface Item {
  id: number;
  slug: string;
  name: string;
  sortName: string;
  description?: string;
  richContent?: TiptapNode;
  overrideLink?: string;
  updatedAt: Date;
}

export interface ItemWithIncludes extends Item {
  dateRanges: DateRange[];
  images: Image[];
  tags: CmsTag[];
}

export type ItemsWithIncludes = ItemWithIncludes[];
