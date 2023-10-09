import { TextSearchResponseData } from '@googlemaps/google-maps-services-js';

import { api, paramsSerializer } from '..';

import { NaverSearchBlogResponse } from './model';

const BATCH_SIZE = 10;
const DELAY = 1000;

export const fetchNaverSearchBlog = async <T = boolean>({
  keyword, includePost,
}: { keyword: string; includePost?: T; }) => {
  const response = await api<NaverSearchBlogResponse<T>>({
    method: 'GET',
    url: '/search',
    params: {
      query: keyword,
      include_post: includePost,
    },
    paramsSerializer,
    isBFF: true,
  });

  return response;
};

export const fetchAllSettledSearchBlogs = async <T = boolean>({
  placeName, includePost,
}: {
  placeName: string[]; includePost?: T;
}) => {
  const copyPlaceName = [...placeName];
  const firstPlaceName = copyPlaceName.splice(0, BATCH_SIZE);

  const firstResponse = await Promise
    .allSettled([...firstPlaceName.map((keyword) => fetchNaverSearchBlog<T>({
      keyword,
      includePost,
    }))]);

  if (placeName.length <= 10) {
    return firstResponse;
  }

  await new Promise((resolve) => {
    setTimeout(resolve, DELAY);
  });

  const secondResponse = await Promise
    .allSettled([...copyPlaceName.map((keyword) => fetchNaverSearchBlog<T>({
      keyword,
      includePost,
    }))]);

  return [...firstResponse, ...secondResponse];
};

export const fetchGoogleSearch = async ({
  keyword,
}: { keyword: string; }) => {
  const response = await api<TextSearchResponseData>({
    method: 'GET',
    url: '/google-text-search',
    params: {
      query: keyword,
    },
    paramsSerializer,
    isBFF: true,
  });

  return response;
};
