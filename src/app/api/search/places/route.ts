import { NextRequest, NextResponse } from 'next/server';

import { checkEmpty } from '@nf-team/core';

import { FetchError } from '@/lib/apis';
import { filteredPlaces } from '@/utils';

import { fetchAllSettledSearchNaverBlogs, getGoogleTextSearch, getPlacePhotoUrl } from '../../handler';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const requestHeaders = new Headers(request.headers);

  const query = searchParams.get('query');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const nextCursor = searchParams.get('nextCursor');
  const radius = searchParams.get('radius');

  if (!query) {
    return NextResponse.json(null, {
      headers: requestHeaders,
      status: 400,
      statusText: 'not found query',
    });
  }

  try {
    const places = await getGoogleTextSearch({
      query,
      language: 'ko',
      opennow: false,
      radius: radius ?? undefined,
      pagetoken: nextCursor ?? undefined,
      location: (lat && lng) ? [lat, lng] : undefined,
    });

    const placesResult = filteredPlaces(checkEmpty(places?.results));
    const placeName = placesResult.filter((place) => !!place?.name).map((place) => place.name);

    const searchBlogPosts = await fetchAllSettledSearchNaverBlogs({ placeName });

    const response = placesResult.map((place, index) => ({
      ...place,
      photoUrls: checkEmpty(place.photos)
        .map((photo) => getPlacePhotoUrl(photo.photo_reference, 500))
        .filter((photoUrl) => !!photoUrl),
      searchBlogPost: searchBlogPosts[index],
    }));

    return NextResponse.json({
      ...places,
      results: response,
    }, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof FetchError) {
      return NextResponse.json(null, {
        status: error.status,
        statusText: error.message,
      });
    }

    return NextResponse.json(null, {
      status: 500,
      statusText: 'internal server error',
    });
  }
}
