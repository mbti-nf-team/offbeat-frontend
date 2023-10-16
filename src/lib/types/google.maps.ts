import { AddressGeometry, Place, TextSearchResponseData } from '@googlemaps/google-maps-services-js';

export interface PlaceResult extends Place {
  geometry: AddressGeometry;
  place_id: string;
  name: string;
}

export interface PlaceDetailResult extends google.maps.places.PlaceResult {
  geometry: google.maps.places.PlaceGeometry;
  place_id: string;
  name: string;
}

export interface TextSearchPlace extends TextSearchResponseData {
  results: PlaceResult[];
}
