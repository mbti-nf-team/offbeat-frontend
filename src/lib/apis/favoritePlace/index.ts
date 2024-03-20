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

export const postFavoritePlace = async (params: FavoritePlaceRequest) => {
  const response = await api<FavoritePlaceResponse>({
    method: 'POST',
    url: '/favorite-places',
    type: 'public',
    params,
    config: {
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
