import { NextRequest, NextResponse } from 'next/server';

import { TextSearchResponseData } from '@googlemaps/google-maps-services-js';
import { checkEmpty } from '@nf-team/core';

import { paramsSerializer } from '@/lib/apis';
import { filteredPlaces } from '@/utils';

export const runtime = 'edge';

const TEN_MINUTES = 600;
const BATCH_SIZE = 10;
const DELAY = 1000;

const fetchNaverSearchNaverBlog = async ({
  query, includePost,
}: { query: string; includePost: boolean; }, init?: RequestInit) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/naver/search/blog?query=${query}&include_post=${includePost}`, init);

  return response;
};

const fetchAllSettledSearchNaverBlogs = async ({
  placeName,
}: {
  placeName: string[];
}, init?: RequestInit) => {
  const copyPlaceName = [...placeName];
  const firstPlaceName = copyPlaceName.splice(0, BATCH_SIZE);

  const firstResponse = await Promise
    .allSettled([...firstPlaceName.map((query) => fetchNaverSearchNaverBlog({
      query,
      includePost: true,
    }, init))]);

  if (placeName.length <= 10) {
    return firstResponse;
  }

  await new Promise((resolve) => {
    setTimeout(resolve, DELAY);
  });

  const secondResponse = await Promise
    .allSettled([...copyPlaceName.map((query) => fetchNaverSearchNaverBlog({
      query,
      includePost: true,
    }, init))]);

  return [...firstResponse, ...secondResponse];
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const requestHeaders = new Headers(request.headers);

  const query = searchParams.get('query');
  const nextCursor = searchParams.get('nextCursor');

  const textSearchResponse = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN}/api/google/search?${paramsSerializer({
    query,
    nextCursor,
  })}`, {
    method: 'GET',
    next: {
      revalidate: TEN_MINUTES,
    },
    headers: requestHeaders,
  });

  if (!textSearchResponse.ok) {
    return NextResponse.json(null, textSearchResponse);
  }

  const places = await textSearchResponse.json() as TextSearchResponseData;

  const placesResult = filteredPlaces(checkEmpty(places?.results));
  const placeName = placesResult.filter((place) => !!place?.name).map((place) => place.name);

  const searchBlogPosts = await fetchAllSettledSearchNaverBlogs({ placeName }, {
    method: 'GET',
    next: {
      revalidate: TEN_MINUTES,
    },
    headers: {
      ...requestHeaders,
      'nfteam-api-token': process.env.API_HEADER_TOKEN,
    },
  });

  const response = placesResult.map((place, index) => ({
    ...place,
    searchBlogPost: searchBlogPosts[index],
  }));

  return NextResponse.json({
    ...places,
    results: response,
  }, {
    ...textSearchResponse,
    headers: {
      ...textSearchResponse.headers,
      'Cache-Control': 'public, s-maxage=1',
      'CDN-Cache-Control': 'public, s-maxage=60',
      'Vercel-CDN-Cache-Control': `public, s-maxage=${TEN_MINUTES}`,
    },
  });
}
