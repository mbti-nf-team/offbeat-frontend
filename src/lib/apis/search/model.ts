import { TextSearchResponseData } from '@googlemaps/google-maps-services-js';

import { PlaceDetail } from '@/lib/types/google.maps';
import { NaverSearchBlog, SearchPlace, SearchPlaces } from '@/lib/types/search';

export type NaverSearchBlogResponse<T> = NaverSearchBlog<T>;

export type TextSearchPlaceResponse = TextSearchResponseData;

export type PlaceDetailsResponse = PlaceDetail;

export type SearchPlacesResponse = SearchPlaces;

export type SearchPlaceResponse = SearchPlace;
