import { NextRequest, NextResponse } from 'next/server';

import { PlaceDetailsResponseData } from '@googlemaps/google-maps-services-js';

import { fetchNaverSearchBlog } from '@/app/api/handler';
import { paramsSerializer } from '@/lib/apis';
import { PlaceDetail } from '@/lib/types/google.maps';

export const runtime = 'nodejs';

const TEN_MINUTES = 600;

const hasPlaceId = (
  placeDetail: PlaceDetailsResponseData,
): placeDetail is PlaceDetail => {
  if (
    !placeDetail?.result
    || !placeDetail.result?.geometry?.location
    || !placeDetail.result?.place_id
    || !placeDetail.result?.name
  ) {
    return false;
  }

  return true;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const requestHeaders = new Headers(request.headers);

  const placeId = searchParams.get('placeId');

  const searchResponse = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN}/api/google/search/detail?${paramsSerializer({
    placeId,
  })}`, {
    method: 'GET',
    next: {
      revalidate: TEN_MINUTES,
    },
    headers: requestHeaders,
  });

  if (!searchResponse.ok) {
    return NextResponse.json(null, searchResponse);
  }

  const placeDetail = await searchResponse.json() as PlaceDetailsResponseData;

  if (!hasPlaceId(placeDetail)) {
    return NextResponse.json(null, {
      headers: requestHeaders,
      status: 400,
      statusText: 'not found place name',
    });
  }

  const searchBlogPost = await fetchNaverSearchBlog({
    query: placeDetail.result.name, includePost: true,
  });

  return NextResponse.json({
    ...placeDetail,
    result: {
      ...placeDetail.result,
      searchBlogPost,
    },
  }, {
    ...searchResponse,
    headers: {
      ...searchResponse.headers,
      'Cache-Control': 'public, s-maxage=1',
      'CDN-Cache-Control': 'public, s-maxage=60',
      'Vercel-CDN-Cache-Control': `public, s-maxage=${TEN_MINUTES}`,
    },
  });
}
