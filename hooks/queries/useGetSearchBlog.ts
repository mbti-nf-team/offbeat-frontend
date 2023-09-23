import { useQuery } from '@tanstack/react-query';

import { fetchNaverSearchBlog } from 'lib/apis/search';

function useGetSearchBlog<T = false>({
  placeName, includePost, enabled,
}: { placeName: string[]; includePost?: T; enabled?: boolean; }) {
  const query = useQuery(
    [{ placeName, includePost }],
    () => Promise.allSettled([...placeName.map((keyword) => fetchNaverSearchBlog({
      keyword, includePost,
    }))]),
    {
      enabled,
    },
  );

  return query;
}

export default useGetSearchBlog;
