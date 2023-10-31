import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchSearchPlaces } from '@/lib/apis/search';
import { SearchPlacesResponse } from '@/lib/apis/search/model';

import useIntersectionObserver from '../useIntersectionObserver';

function useGetSearchPlaces({ keyword }: { keyword: string; }) {
  const query = useInfiniteQuery<SearchPlacesResponse>({
    queryKey: ['searchPlaces', keyword],
    queryFn: ({ pageParam }) => fetchSearchPlaces({ keyword, nextCursor: pageParam as string }),
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
