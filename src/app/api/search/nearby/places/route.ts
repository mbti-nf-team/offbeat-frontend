import { NextRequest, NextResponse } from 'next/server';

import { Language } from '@googlemaps/google-maps-services-js';
import { checkEmpty } from '@nf-team/core';

import { fetchAllSettledSearchNaverBlogs, getGoogleNearbySearch } from '@/app/api/handler';
import { FetchError } from '@/lib/apis';
import { filteredPlaces } from '@/utils';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const requestHeaders = new Headers(request.headers);

  const keyword = searchParams.get('keyword');
  const radius = searchParams.get('radius');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const nextCursor = searchParams.get('nextCursor');

  if (!lat || !lng || !radius) {
    return NextResponse.json(null, {
      headers: requestHeaders,
      status: 400,
      statusText: 'not found query',
    });
  }

  try {
    const places = await getGoogleNearbySearch({
      keyword: keyword ?? undefined,
      language: Language.ko,
      radius,
      pagetoken: nextCursor ?? undefined,
      location: [lat, lng],
    });

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
      status: 200,
    });
  } catch (error) {
    const fetchError = error as FetchError;

    return NextResponse.json(null, {
      status: fetchError.response?.status,
      statusText: fetchError.response?.statusText,
      headers: fetchError.response?.headers,
    });
  }
}
