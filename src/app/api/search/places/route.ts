import { NextRequest, NextResponse } from 'next/server';

import { TextSearchResponseData } from '@googlemaps/google-maps-services-js';
import { checkEmpty } from '@nf-team/core';

import { paramsSerializer } from '@/lib/apis';
import { filteredPlaces } from '@/utils';

export const runtime = 'edge';

const TEN_MINUTES = 600;
const BATCH_SIZE = 10;
const DELAY = 1000;

const fetchNaverSearchBlog = async ({
  query, includePost,
}: { query: string; includePost: boolean; }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN}/api/naver/search?${paramsSerializer({
    query,
    include_post: includePost,
  })}`);

  if (response.ok) {
    const searchResult = await response.json();

    return searchResult;
  }

  return null;
};

const fetchAllSettledSearchNaverBlogs = async ({
  placeName,
}: {
  placeName: string[];
}) => {
  const copyPlaceName = [...placeName];
  const firstPlaceName = copyPlaceName.splice(0, BATCH_SIZE);

  const firstResponse = await Promise
    .allSettled([...firstPlaceName.map((query) => fetchNaverSearchBlog({
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
    .allSettled([...copyPlaceName.map((query) => fetchNaverSearchBlog({
      query,
      includePost: false,
    }))]);

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

  const searchBlogPosts = await fetchAllSettledSearchNaverBlogs({ placeName });

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
