import { NextRequest, NextResponse } from 'next/server';

import { checkEmpty } from '@nf-team/core';
import QueryString from 'qs';

import api, { FetchError } from '@/lib/apis';
import { FavoritePlacesResponse } from '@/lib/apis/favoritePlace/model';
import CookieNames from '@/lib/constants/cookies';

import { fetchAllPlaceDetails, getPlacePhotoUrl } from '../../handler';

export const runtime = 'edge';

const TEN_MINUTES = 600;

export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const { searchParams } = new URL(request.url);

  const params = QueryString.parse(searchParams.toString());

  const accessToken = request.cookies.get(CookieNames.ACCESS_TOKEN)?.value;

  if (!accessToken) {
    return NextResponse.json(null, {
      headers: requestHeaders,
      status: 401,
    });
  }

  try {
    const response = await api<FavoritePlacesResponse>({
      url: '/favorite-places',
      type: 'public',
      method: 'GET',
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const placeIds = response.items.map((item) => item.google_place_id);

    const googleDetails = await fetchAllPlaceDetails({ placeIds });

    const favoritePlaces = googleDetails.map((detail, index) => {
      const placePhotoUrls = checkEmpty(detail.result.photos)
        .map((photo) => getPlacePhotoUrl(photo.photo_reference, 500))
        .filter((photoUrl) => !!photoUrl);

      const favoritePlace = response.items[index];

      return {
        ...detail.result,
        ...favoritePlace,
        photoUrls: placePhotoUrls,
      };
    });

    return NextResponse.json({
      ...response,
      items: favoritePlaces,
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
