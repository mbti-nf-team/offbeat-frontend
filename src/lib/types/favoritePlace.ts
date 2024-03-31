import { AddressComponent, PlacePhoto } from '@googlemaps/google-maps-services-js';

export interface FavoritePlace {
  id: number;
  google_place_id: string;
  country_code: string;
  latitude: number;
  longitude: number;
  created_at: string;
}

export interface FavoritePlaceWithPlaceDetail extends FavoritePlace {
  name: string;
  photos: PlacePhoto[];
  address_components: AddressComponent[];
  user_ratings_total: number;
  url: string;
  rating: number;
  photoUrls: string[];
}
