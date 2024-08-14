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
  photos: google.maps.places.PlacePhoto[];
  formatted_address: string;
  user_ratings_total: number;
  url: string;
  rating: number;
  photoUrls: string[];
  country: {
    code: string;
    koreanName: string;
    englishName: string;
  } | undefined;
}
