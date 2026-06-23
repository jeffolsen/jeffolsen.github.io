type ImageType = 'LANDSCAPE' | 'PORTRAIT' | 'ICON' | 'OTHER';

export interface Image {
  id: number;
  url: string;
  type: ImageType;
  alt?: string;
  attribution?: string;
  attributionLink?: string;
}
