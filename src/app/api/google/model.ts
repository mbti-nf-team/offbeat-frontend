import {
  Language, LatLngLiteral, PlaceType1,
} from '@googlemaps/google-maps-services-js';

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
