export type LinkType = 'internal' | 'external';

export interface CmsLink {
  link: {
    id: number;
    label: string;
    url: string;
    linkType: LinkType;
  };
}

export type CmsLinkFeed = CmsLink[];
