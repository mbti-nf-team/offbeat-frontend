import { api, paramsSerializer } from '..';

import { NaverSearchBlogResponse } from './model';

// eslint-disable-next-line import/prefer-default-export
export const fetchNaverSearchBlog = async <T = boolean>({
  keyword, includePost,
}: { keyword: string; includePost?: T; }) => {
  const response = await api<NaverSearchBlogResponse<T>>({
    method: 'GET',
    url: '/naver/search/blog',
    params: {
      query: keyword,
      include_post: includePost,
    },
    paramsSerializer,
  });

  return response;
};
