import {
  AddressGeometry, Place, PlaceDetailsResponseData,
} from '@googlemaps/google-maps-services-js';

export interface PlaceResult extends Place {
  geometry: AddressGeometry;
  place_id: string;
  name: string;
  thumbnail?: string;
}

export interface PlaceDetail extends PlaceDetailsResponseData {
  result: PlaceResult;
}
