import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchSearchPlaces } from '@/lib/apis/search';
import { SearchPlacesResponse } from '@/lib/apis/search/model';

import useIntersectionObserver from '../useIntersectionObserver';

const TEN_MINUTES = 600000;

function useGetSearchPlaces({ keyword }: { keyword: string; }) {
  const query = useInfiniteQuery<SearchPlacesResponse>(['searchPlaces', keyword], ({ pageParam }) => fetchSearchPlaces({ keyword, nextCursor: pageParam }), {
    enabled: !!keyword,
    staleTime: TEN_MINUTES,
    cacheTime: TEN_MINUTES,
    getNextPageParam: ({ next_page_token }) => next_page_token,
  });

  const { hasNextPage, fetchNextPage } = query;

  const refState = useIntersectionObserver<HTMLDivElement>({
    isRoot: true,
    fetchNextPage,
    hasNextPage,
    intersectionOptions: {
      rootMargin: '80px',
    },
  });

  return {
    query,
    refState,
  };
}

export default useGetSearchPlaces;
