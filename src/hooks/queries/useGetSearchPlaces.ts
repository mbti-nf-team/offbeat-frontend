import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchSearchPlaces } from '@/lib/apis/search';
import { SearchPlacesResponse } from '@/lib/apis/search/model';
import { LatLngLiteral } from '@/lib/types/google.maps';

import useIntersectionObserver from '../useIntersectionObserver';

function useGetSearchPlaces({ keyword, lat, lng }: { keyword: string; } & Partial<LatLngLiteral>) {
  const query = useInfiniteQuery<SearchPlacesResponse>({
    queryKey: ['searchPlaces', keyword, lat, lng],
    queryFn: ({ pageParam }) => fetchSearchPlaces({
      keyword, nextCursor: pageParam as string, lat, lng,
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
