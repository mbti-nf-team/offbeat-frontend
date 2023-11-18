import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchSearchPlaces } from '@/lib/apis/search';
import { SearchPlacesResponse } from '@/lib/apis/search/model';
import { LatLngLiteral } from '@/lib/types/google.maps';

import useIntersectionObserver from '../useIntersectionObserver';

function useGetSearchPlaces({
  keyword, lat, lng, radius,
}: {
  keyword: string; radius?: number; } & Partial<LatLngLiteral>) {
  const query = useInfiniteQuery<SearchPlacesResponse>({
    queryKey: ['searchPlaces', keyword, lat, lng, radius],
    queryFn: ({ pageParam }) => fetchSearchPlaces({
      keyword, nextCursor: pageParam as string, lat, lng, radius,
    }),
    getNextPageParam: ({ next_page_token }) => next_page_token,
    initialPageParam: undefined,
    enabled: !!keyword,
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

export default useGetSearchPlaces;
