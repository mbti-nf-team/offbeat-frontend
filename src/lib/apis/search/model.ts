import { PlaceDetailsResponseData, TextSearchResponseData } from '@googlemaps/google-maps-services-js';

import { NaverSearchBlog, SearchPlaces } from '@/lib/types/search';

export type NaverSearchBlogResponse<T> = NaverSearchBlog<T>;

export type TextSearchPlaceResponse = TextSearchResponseData;

export type PlaceDetailResponse = PlaceDetailsResponseData;

export type SearchPlacesResponse = SearchPlaces;
