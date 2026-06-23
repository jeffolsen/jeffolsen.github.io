export type SupportedSchemaType = 'WebPage' | 'Person' | 'Article' | 'CreativeWork';
export type SubjectType = 'SINGLE' | 'COLLECTION';

export interface SeoMetadata {
  path: string;
  subjectType: SubjectType;
  seoTitle: string;
  seoDescription: string;
  seoImage?: string;
  schemaType: SupportedSchemaType;
}
