import {
  Language, PlaceDetailsResponseData, PlacesNearbyResponseData, TextSearchResponseData,
} from '@googlemaps/google-maps-services-js';

import api, { paramsSerializer } from '@/lib/apis';

import {
  NaverSearchBlogResponse,
  NearbySearchRequestParams,
  PlaceDetailsRequestParams,
  TextSearchRequestParams,
} from './model';

const BATCH_SIZE = 10;
const DELAY = 1000;
const TEN_MINUTES = 100;

export const fetchNaverSearchBlog = async <T>({
  query, includePost,
}: { query: string; includePost: T; }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN}/api/naver/search?${paramsSerializer({
    query,
    include_post: includePost,
  })}`);

  if (response.ok) {
    const searchResult = await response.json() as NaverSearchBlogResponse<T>;

    return searchResult;
  }

  return null;
};

export const fetchAllSettledSearchNaverBlogs = async ({
  placeName,
}: {
  placeName: string[];
}) => {
  const copyPlaceName = [...placeName];
  const firstPlaceName = copyPlaceName.splice(0, BATCH_SIZE);

  const firstResponse = await Promise
    .allSettled([...firstPlaceName.map((query) => fetchNaverSearchBlog<false>({
      query,
      includePost: false,
    }))]);

  if (placeName.length <= 10) {
    return firstResponse;
  }

  await new Promise((resolve) => {
    setTimeout(resolve, DELAY);
  });

  const secondResponse = await Promise
    .allSettled([...copyPlaceName.map((query) => fetchNaverSearchBlog<false>({
      query,
      includePost: false,
    }))]);

  return [...firstResponse, ...secondResponse];
};

export const fetchAllPlaceDetails = async ({
  placeIds,
}: {
  placeIds: string[];
}) => {
  const response = await Promise
    .all([...placeIds.map((placeId) => getGooglePlaceDetails({
      place_id: placeId,
      language: Language.ko,
      region: 'KR',
      fields: ['name', 'photos', 'rating', 'url', 'user_ratings_total', 'address_components'],
      reviews_no_translations: false,
    }))]);

  return response;
};

export const getGoogleTextSearch = async (params: TextSearchRequestParams) => {
  const response = await api<TextSearchResponseData>({
    url: '/place/textsearch/json',
    type: 'google',
    method: 'GET',
    params,
  });

  return response;
};

export const getGoogleNearbySearch = async (params: NearbySearchRequestParams) => {
  const response = await api<PlacesNearbyResponseData>({
    url: '/place/nearbysearch/json',
    type: 'google',
    method: 'GET',
    params,
  });

  return response;
};

export const getGooglePlaceDetails = async (params: PlaceDetailsRequestParams) => {
  const response = await api<PlaceDetailsResponseData>({
    url: '/place/details/json',
    type: 'google',
    method: 'GET',
    config: {
      next: {
        revalidate: TEN_MINUTES,
      },
    },
    params,
  });

  return response;
};

export const getPlacePhotoUrl = (photoReference?: string, size = 800) => {
  const photoUrl = photoReference ? `${process.env.GOOGLE_MAP_API_ORIGIN}/place/photo?maxwidth=${size}&photoreference=${photoReference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}` : undefined;

  return photoUrl;
};
