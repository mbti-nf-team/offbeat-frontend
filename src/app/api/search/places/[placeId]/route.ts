import { NextRequest, NextResponse } from 'next/server';

import { Language, PlaceDetailsResponseData } from '@googlemaps/google-maps-services-js';
import { checkEmpty } from '@nf-team/core';

import { fetchNaverSearchBlog, getGooglePlaceDetails, getPlacePhotoUrl } from '@/app/api/handler';
import { FetchError } from '@/lib/apis';
import { PlaceDetail } from '@/lib/types/google.maps';

export const runtime = 'edge';

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

  if (!placeId) {
    return NextResponse.json(null, {
      headers: requestHeaders,
      status: 400,
      statusText: 'not found query',
    });
  }

  try {
    const placeDetails = await getGooglePlaceDetails({
      place_id: placeId,
      language: Language.ko,
      region: 'KR',
      reviews_sort: 'newest',
      fields: ['geometry', 'name', 'photos', 'place_id', 'rating', 'reviews', 'url', 'user_ratings_total'],
      reviews_no_translations: false,
    });

    if (!hasPlaceId(placeDetails)) {
      return NextResponse.json(null, {
        headers: requestHeaders,
        status: 400,
        statusText: 'not found place name',
      });
    }

    const placePhotoUrls = checkEmpty(placeDetails.result.photos)
      .map((photo) => getPlacePhotoUrl(photo.photo_reference))
      .filter((photoUrl) => !!photoUrl);

    const searchBlogPost = await fetchNaverSearchBlog<true>({
      query: placeDetails.result.name, includePost: true,
    });

    return NextResponse.json({
      ...placeDetails,
      result: {
        ...placeDetails.result,
        thumbnail: placePhotoUrls[0],
        photoUrls: placePhotoUrls,
        searchBlogPost,
      },
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=1',
        'CDN-Cache-Control': 'public, s-maxage=60',
        'Vercel-CDN-Cache-Control': `public, s-maxage=${TEN_MINUTES}`,
      },
    });
  } catch (error) {
    const fetchError = error as FetchError;

    return NextResponse.json(null, {
      status: fetchError.response?.status || 500,
      statusText: fetchError.response?.statusText || fetchError.message,
      headers: fetchError.response?.headers,
    });
  }
}
