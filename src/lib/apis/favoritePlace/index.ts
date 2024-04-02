import Cookies from 'js-cookie';

import CookieNames from '@/lib/constants/cookies';
import { Pagination } from '@/lib/types';
import { FavoritePlaceWithPlaceDetail } from '@/lib/types/favoritePlace';

import api from '..';

import { FavoritePlaceRequest, FavoritePlaceResponse, FavoritePlacesRequest } from './model';

export const getFavoritePlaces = async (request: FavoritePlacesRequest) => {
  const response = await api<Pagination<FavoritePlaceWithPlaceDetail>>({
    method: 'GET',
    url: '/my/favorite-places',
    type: 'bff',
    params: request,
    config: {
      next: {
        tags: ['my/favorite-places'],
      },
    },
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
    headers: {
      // TODO - 임시
      Authorization: `Bearer ${Cookies.get(CookieNames.ACCESS_TOKEN)}`,
    },
    config: {
      cache: 'no-store',
    },
  });

  return response;
};
