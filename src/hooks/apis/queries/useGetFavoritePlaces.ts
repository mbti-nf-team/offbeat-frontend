import { useQuery } from '@tanstack/react-query';

import { getFavoritePlaces } from '@/lib/apis/favoritePlace';
import { FavoritePlacesResponse } from '@/lib/apis/favoritePlace/model';

function useGetFavoritePlaces() {
  const query = useQuery<FavoritePlacesResponse>({
    queryKey: ['favoritePlaces'],
    queryFn: () => getFavoritePlaces(),
  });

  return query;
}

export default useGetFavoritePlaces;
