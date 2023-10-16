import { AddressGeometry, Place, TextSearchResponseData } from '@googlemaps/google-maps-services-js';

export interface PlaceResult extends Place {
  geometry: AddressGeometry;
  place_id: string;
  name: string;
}

export interface TextSearchPlace extends TextSearchResponseData {
  results: PlaceResult[];
}
