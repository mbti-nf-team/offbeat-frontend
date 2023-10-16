import { checkEmpty } from '@nf-team/core';
import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchGoogleSearch } from '@/lib/apis/search';
import { TextSearchPlace } from '@/lib/types/google.maps';
import { filteredPlaces } from '@/utils';

import useIntersectionObserver from '../useIntersectionObserver';

function useGetGoogleSearch({ keyword }: { keyword: string; }) {
  const query = useInfiniteQuery<TextSearchPlace>(['googleSearch', keyword], ({ pageParam }) => fetchGoogleSearch({ keyword, nextCursor: pageParam }), {
    enabled: !!keyword,
    getNextPageParam: ({ next_page_token }) => next_page_token,
    select: (response) => ({
      ...response,
      pages: checkEmpty(response?.pages).map((places) => ({
        ...places,
        results: filteredPlaces(checkEmpty(places?.results)),
      })),
    }),
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

export default useGetGoogleSearch;
