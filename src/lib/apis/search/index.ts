import { api, paramsSerializer } from '..';

import {
  NaverSearchBlogResponse, PlaceDetailResponse, SearchPlacesResponse, TextSearchPlaceResponse,
} from './model';

const BATCH_SIZE = 10;
const DELAY = 1000;

export const fetchNaverSearchBlog = async <T = boolean>({
  keyword, includePost,
}: { keyword: string; includePost?: T; }) => {
  const response = await api<NaverSearchBlogResponse<T>>({
    method: 'GET',
    url: '/naver/search',
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
  keyword, nextCursor,
}: { keyword: string; nextCursor?: string; }) => {
  const response = await api<TextSearchPlaceResponse>({
    method: 'GET',
    url: '/google/search',
    params: {
      query: keyword,
      nextCursor,
    },
    paramsSerializer,
    isBFF: true,
  });

  return response;
};

export const fetchSearchPlaces = async ({
  keyword, nextCursor,
}: { keyword: string; nextCursor?: string; }) => {
  const response = await api<SearchPlacesResponse>({
    method: 'GET',
    url: '/search/places',
    params: {
      query: keyword,
      nextCursor,
    },
    paramsSerializer,
    isBFF: true,
  });

  return response;
};

export const fetchPlaceDetail = async ({
  placeId, sessionToken,
}: { placeId: string; sessionToken?: string; }) => {
  const response = await api<PlaceDetailResponse>({
    method: 'GET',
    url: '/google/search/detail',
    params: {
      placeId,
    },
    headers: {
      'session-token': sessionToken,
    },
    paramsSerializer,
    isBFF: true,
  });

  return response;
};
