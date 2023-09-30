import { useQuery } from '@tanstack/react-query';

import { fetchAllSettledSearchBlogs } from '@/lib/apis/search';
import { PlaceResult } from '@/lib/types/google.maps';

function useGetSearchBlog<T = boolean>({
  placesResult, includePost, enabled,
}: { placesResult: PlaceResult[]; includePost?: T; enabled?: boolean; }) {
  const placeName = placesResult.map((place) => place?.name);

  const query = useQuery(
    [{ placeName, includePost }],
    () => fetchAllSettledSearchBlogs<T>({ placeName, includePost }),
    {
      enabled,
      select: (searchBlogPosts) => placesResult.map((place, index) => ({
        ...place,
        searchBlogPost: searchBlogPosts[index],
      })),
    },
  );

  return query;
}

export default useGetSearchBlog;
