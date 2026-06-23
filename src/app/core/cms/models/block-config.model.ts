export type BlockComponentType =
  | 'HeroCarousel'
  | 'TeaserGrid'
  | 'CuratedList'
  | 'ContentHeader'
  | 'Detail'
  | 'RelatedContent';
export type SubjectType = 'SINGLE' | 'COLLECTION';
export type VariantType = 'alpha' | 'beta' | 'gamma';
export type ThemeType = 'alpha' | 'beta' | 'gamma';
export type LocationType = 'header' | 'body';

export interface CmsBlockConfig {
  id: number;
  name: string;
  order: number;
  subjectType: SubjectType;
  typeName: BlockComponentType;

  // The property hash provided by the CMS configuration panel
  propertyValues: {
    isPrimaryContent?: boolean;
    variant?: VariantType;
    theme?: ThemeType;
    location?: LocationType;
    tagAllowList?: string[];
    itemAllowList?: string[];
    referenceFeed?: string[];
    [key: string]: any; // Catch-all for other layout flags
  };
}
