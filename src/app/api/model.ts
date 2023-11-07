import {
  Language, LatLngLiteral, PlaceType1,
} from '@googlemaps/google-maps-services-js';

import { NaverSearchBlog } from '@/lib/types/blog';

export type TextSearchRequestParams = {
  query: string;
  language?: Language;
  location?: LatLngLiteral;
  maxprice?: number;
  minprice?: number;
  opennow?: boolean;
  pagetoken?: string;
  region?: string;
  type?: PlaceType1;
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
