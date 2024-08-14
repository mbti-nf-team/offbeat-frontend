import { NaverSearchBlog } from '@/lib/types/blog';
import { Language } from '@/lib/types/google.maps';

export type TextSearchRequestParams = {
  query: string;
  language?: Language;
  location?: [string, string];
  maxprice?: number;
  minprice?: number;
  opennow?: boolean;
  pagetoken?: string;
  region?: string;
  radius?: string;
};

export type NearbySearchRequestParams = {
  location: [string, string];
  radius: string;
  language?: Language;
  keyword?: string;
  maxprice?: number;
  minprice?: number;
  pagetoken?: string;
  region?: string;
  rankBy?: 'prominence' | 'distance';
};

export type PlaceDetailsRequestParams = {
  place_id: string;
  fields?: string[];
  language?: Language;
  region?: string;
  reviews_no_translations?: boolean;
  reviews_sort?: 'most_relevant' | 'newest';
  sessiontoken?: string;
};

export type NaverSearchBlogResponse<T = boolean> = NaverSearchBlog<T>;
