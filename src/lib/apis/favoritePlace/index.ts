import Cookies from 'js-cookie';

import CookieNames from '@/lib/constants/cookies';

import api from '..';

import { FavoritePlaceRequest, FavoritePlaceResponse, FavoritePlacesResponse } from './model';

export const getFavoritePlaces = async () => {
  const response = await api<FavoritePlacesResponse>({
    method: 'GET',
    url: '/favorite-places',
    type: 'public',
  });

  return response;
};

export const postFavoritePlace = async (request: FavoritePlaceRequest) => {
  const response = await api<FavoritePlaceResponse>({
    method: 'POST',
    url: '/favorite-places',
    type: 'public',
    headers: {
      // TODO - 임시
      Authorization: `Bearer ${Cookies.get(CookieNames.ACCESS_TOKEN)}`,
    },
    config: {
      body: JSON.stringify(request),
      cache: 'no-store',
    },
  });

  return response;
};

export const deleteFavoritePlace = async (id: string) => {
  const response = await api<null>({
    method: 'DELETE',
    url: `/favorite-places/${id}`,
    type: 'public',
    config: {
      cache: 'no-store',
    },
  });

  return response;
};
