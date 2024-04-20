import { useInfiniteQuery } from '@tanstack/react-query';

import { getFavoritePlaces } from '@/lib/apis/favoritePlace';
import { FavoritePlacesRequest } from '@/lib/apis/favoritePlace/model';
import { Pagination } from '@/lib/types';
import { FavoritePlaceWithPlaceDetail } from '@/lib/types/favoritePlace';

function useFavoritePlacesQuery(params: FavoritePlacesRequest) {
  const query = useInfiniteQuery<Pagination<FavoritePlaceWithPlaceDetail>>({
    queryKey: ['favoritePlaces', params],
    queryFn: () => getFavoritePlaces(params),
    getNextPageParam: ({ next_cursor }) => next_cursor,
    initialPageParam: undefined,
  });

  return query;
}

export default useFavoritePlacesQuery;
