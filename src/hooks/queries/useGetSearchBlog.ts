import { useQuery } from '@tanstack/react-query';

import { fetchAllSettledSearchBlogs } from '@/lib/apis/search';
import { PlaceResult } from '@/lib/types/google.maps';

const TEN_MINUTES = 600000;

function useGetSearchBlog<T = boolean>({
  placesResult, includePost, enabled,
}: { placesResult: PlaceResult[]; includePost?: T; enabled?: boolean; }) {
  const placeName = placesResult.map((place) => place?.name);

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

  return query;
}

export default useGetSearchBlog;
