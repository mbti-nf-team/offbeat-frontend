import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchNearbySearchPlaces } from '@/lib/apis/search';
import { SearchPlacesResponse } from '@/lib/apis/search/model';
import { LatLngLiteral } from '@/lib/types/google.maps';

import useIntersectionObserver from '../../useIntersectionObserver';

function useGetNearbySearchPlaces({
  keyword, lat, lng, radius,
}: { keyword?: string; radius: number; } & Partial<LatLngLiteral>) {
  const query = useInfiniteQuery<SearchPlacesResponse>({
    queryKey: ['nearbySearchPlaces', keyword, lat, lng, radius],
    queryFn: ({ pageParam }) => fetchNearbySearchPlaces({
      keyword, nextCursor: pageParam as string, lat: lat as number, lng: lng as number, radius,
    }),
    getNextPageParam: ({ next_page_token }) => next_page_token,
    initialPageParam: undefined,
    enabled: !!lat && !!lng && !!radius,
  });

  const { hasNextPage, fetchNextPage } = query;

  const refState = useIntersectionObserver<HTMLDivElement>({
    isRoot: true,
    fetchNextPage,
    hasNextPage,
    intersectionOptions: {
      rootMargin: '80px',
      triggerOnce: true,
    },
  });

  return {
    query,
    refState,
  };
}

export default useGetNearbySearchPlaces;
