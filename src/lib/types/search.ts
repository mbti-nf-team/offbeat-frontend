import { NaverSearchBlog } from './blog';
import { PlaceDetailsResponseData, PlaceResult, TextSearchResponseData } from './google.maps';

export interface PlacesWithSearchResult<T = false> extends PlaceResult {
  searchBlogPost: T extends true ? NaverSearchBlog<T> | null
    : PromiseSettledResult<NaverSearchBlog<T>> | null;
}

export interface SearchPlaces extends TextSearchResponseData {
  results: PlacesWithSearchResult[];
}

export interface SearchPlace extends PlaceDetailsResponseData {
  result: PlacesWithSearchResult<true>;
}
