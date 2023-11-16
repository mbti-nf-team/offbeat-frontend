import { LatLngLiteral } from '@/lib/types/google.maps';
import { SearchPlace, SearchPlaces } from '@/lib/types/search';

export type SearchPlacesResponse = SearchPlaces;

export type SearchPlaceResponse = SearchPlace;

export type SearchPlacesRequest = {
  keyword: string; nextCursor?: string;
} & Partial<LatLngLiteral>;

export type NearbySearchPlacesRequest = {
  keyword?: string; nextCursor?: string; radius: number;
} & LatLngLiteral;
