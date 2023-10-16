import { PlaceDetailResult, PlaceResult } from './google.maps';

export type BlogPost = {
  title: string;
  link: string;
  description: string;
  thumbnail: string;
};

export interface NaverSearchBlog<T = boolean> {
  total_count: number;
  posts: T extends true ? BlogPost[] : null;
}

export type SelectedPlace = {
  placeId: string | undefined;
  placeName: string | undefined;
};

export interface PlacesWithSearchResult<T = false> extends PlaceResult {
  searchBlogPost: PromiseSettledResult<NaverSearchBlog<T>>;
}

// TODO - 마이그레이션 후 삭제
export interface PlacesWithDetailSearchResult<T = false> extends PlaceDetailResult {
  searchBlogPost: PromiseSettledResult<NaverSearchBlog<T>>;
}
