import { NaverSearchBlogResponse } from 'lib/apis/search/model';

export interface PlaceResult extends google.maps.places.PlaceResult {
  geometry: google.maps.places.PlaceGeometry;
  place_id: string;
  name: string;
}

export interface PlacesWithSearchResult<T = false> extends PlaceResult {
  searchBlogPost: PromiseSettledResult<NaverSearchBlogResponse<T>>;
}
