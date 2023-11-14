import { api, paramsSerializer } from '..';

import {
  SearchPlaceResponse,
  SearchPlacesRequest,
  SearchPlacesResponse,
} from './model';

export const fetchSearchPlaces = async ({
  keyword, nextCursor, lat, lng,
}: SearchPlacesRequest) => {
  const response = await api<SearchPlacesResponse>({
    method: 'GET',
    url: '/search/places',
    params: {
      query: keyword,
      nextCursor,
      lat,
      lng,
    },
    paramsSerializer,
    isBFF: true,
  });

  return response;
};

export const fetchPlaceDetail = async ({
  placeId, sessionToken,
}: { placeId: string; sessionToken?: string; }) => {
  const response = await api<SearchPlaceResponse>({
    method: 'GET',
    url: `/search/places/${placeId}`,
    headers: {
      'session-token': sessionToken,
    },
    paramsSerializer,
    isBFF: true,
  });

  return response;
};
