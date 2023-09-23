import { PlaceResult } from './google.maps';

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

export interface PlaceWithBlogPost<T = boolean> extends PlaceResult {
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
