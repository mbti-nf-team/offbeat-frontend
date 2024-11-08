import { NextRequest, NextResponse } from 'next/server';

import { ensureArray } from '@nf-team/core';

import { fetchNaverSearchBlog, getGooglePlaceDetails, getPlacePhotoUrl } from '@/app/api/handler';
import { FetchError } from '@/lib/apis';
import { PlaceDetail, PlaceDetailsResponseData, PlaceType2 } from '@/lib/types/google.maps';

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
      language: 'ko',
      region: 'KR',
      reviews_sort: 'most_relevant',
      fields: ['geometry', 'name', 'photos', 'place_id', 'rating', 'reviews', 'url', 'user_ratings_total', 'address_components'],
      reviews_no_translations: false,
    });

    if (!hasPlaceId(placeDetails)) {
      return NextResponse.json(null, {
        headers: requestHeaders,
        status: 400,
        statusText: 'not found place name',
      });
    }

    const { address_components, ...placeDetailResult } = placeDetails.result;

    const country = address_components
      ?.find((address) => address.types.includes(PlaceType2.country));

    const placePhotoUrls = ensureArray(placeDetails.result.photos)
      .map((photo) => getPlacePhotoUrl(photo.photo_reference, 500))
      .filter((photoUrl) => !!photoUrl);

    const searchBlogPost = await fetchNaverSearchBlog<true>({
      query: placeDetails.result.name, includePost: true,
    });

    return NextResponse.json({
      ...placeDetails,
      result: {
        ...placeDetailResult,
        country,
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
