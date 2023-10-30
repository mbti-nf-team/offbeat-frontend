import { NextRequest, NextResponse } from 'next/server';

import { TextSearchResponseData } from '@googlemaps/google-maps-services-js';
import { checkEmpty } from '@nf-team/core';

import { paramsSerializer } from '@/lib/apis';
import { filteredPlaces } from '@/utils';

import { fetchAllSettledSearchNaverBlogs } from '../../handler';

export const runtime = 'nodejs';

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
  });
}
