import {
  AddressComponent,
  AddressGeometry, Place, PlaceDetailsResponseData, PlaceReview,
} from '@googlemaps/google-maps-services-js';

interface Review extends PlaceReview {
  original_language?: string;
}

export interface PlaceResult extends Place {
  geometry: AddressGeometry;
  place_id: string;
  name: string;
  thumbnail?: string;
  reviews?: Review[];
  country?: AddressComponent;
  photoUrls: string[];
}

export interface PlaceDetail extends PlaceDetailsResponseData {
  result: PlaceResult;
}

export type LatLngLiteral = {
  lat: number; lng: number;
};
