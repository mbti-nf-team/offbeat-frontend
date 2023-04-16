import { useQuery } from '@tanstack/react-query';
import { fetchNaverSearchBlog } from 'lib/apis/search';

function useGetSearchBlog<T = false>({
  keyword, includePost,
}: { keyword?: string; includePost?: T; }) {
  const query = useQuery([{ keyword, includePost }], () => fetchNaverSearchBlog<T>({
    keyword: keyword as string,
    includePost,
  }), {
    enabled: !!keyword,
  });

  return query;
}

export default useGetSearchBlog;
