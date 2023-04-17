import { useQuery } from '@tanstack/react-query';
import { fetchNaverSearchBlog } from 'lib/apis/search';
import { PlaceResult } from 'lib/types/google.maps';

import { checkEmpty } from 'utils';

function useGetSearchBlog<T = false>({
  placesResult, includePost, enabled,
}: { placesResult: PlaceResult[]; includePost?: T; enabled?: boolean; }) {
  const query = useQuery(
    [{ placesResult, includePost }],

    () => {
      const placeName = placesResult.map((place) => place.name);

      return Promise.all([...placeName.map((keyword) => fetchNaverSearchBlog({
        keyword, includePost,
      }))]);
    },
    {
      enabled,
      select: (searchBlogPosts) => placesResult.map((place, index) => ({
        ...place,
        ...searchBlogPosts[index],
      })),
    },
  );

  return {
    ...query,
    data: checkEmpty(query.data),
  };
}

export default useGetSearchBlog;
