import { useMemo } from 'react';

import { checkEmpty } from '@nf-team/core';
import { useQuery } from '@tanstack/react-query';

import { fetchAllSettledSearchBlogs } from '@/lib/apis/search';
import { PlaceDetailResult, PlaceResult } from '@/lib/types/google.maps';

const TEN_MINUTES = 600000;

const isPlaceDetail = <T = boolean>(
  placesResult: PlaceDetailResult[] | PlaceResult[],
  includePost?: T,
): placesResult is PlaceDetailResult[] => Boolean(includePost) === true;

function useGetSearchBlog<T = boolean>({
  placesResult, includePost, enabled,
}: {
  placesResult: PlaceDetailResult[] | PlaceResult[];
  includePost?: T;
  enabled?: boolean; }) {
  const placeName = useMemo(() => {
    if (isPlaceDetail<T>(placesResult, includePost)) {
      return placesResult.filter((place) => place).map((place) => place?.name);
    }

    return placesResult.filter((place) => place).map((place) => place?.name);
  }, [placesResult, includePost]);

  const query = useQuery(
    [{ placeName, includePost }],
    () => fetchAllSettledSearchBlogs<T>({ placeName, includePost }),
    {
      enabled,
      staleTime: TEN_MINUTES,
      cacheTime: TEN_MINUTES,
      select: (searchBlogPosts) => placesResult.map((place, index) => ({
        ...place,
        searchBlogPost: searchBlogPosts[index],
      })),
    },
  );

  return {
    ...query,
    data: checkEmpty(query.data),
  };
}

export default useGetSearchBlog;
