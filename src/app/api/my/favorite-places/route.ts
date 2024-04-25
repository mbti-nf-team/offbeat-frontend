import { NextRequest, NextResponse } from 'next/server';

import { checkEmpty } from '@nf-team/core';
import QueryString from 'qs';

import api, { FetchError } from '@/lib/apis';
import { FavoritePlacesResponse } from '@/lib/apis/favoritePlace/model';
import ISO_3166_COUNTRY_CODES from '@/lib/assets/data/iso3166CountryCodes';
import CookieNames from '@/lib/constants/cookies';

import { fetchAllPlaceDetails, getPlacePhotoUrl } from '../../handler';

export const runtime = 'edge';

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
      config: {
        cache: 'no-store',
      },
    });

    const placeIds = response.items.map((item) => item.google_place_id);

    const googleDetails = await fetchAllPlaceDetails({ placeIds });

    const favoritePlaces = googleDetails.map((detail, index) => {
      const placePhotoUrls = checkEmpty(detail.result.photos)
        .map((photo) => getPlacePhotoUrl(photo.photo_reference, 500))
        .filter((photoUrl) => !!photoUrl);

      const favoritePlace = response.items[index];

      const country = ISO_3166_COUNTRY_CODES.find((
        targetCountry,
      ) => targetCountry.code === favoritePlace.country_code);

      return {
        ...detail.result,
        ...favoritePlace,
        photoUrls: placePhotoUrls,
        country,
      };
    });

    return NextResponse.json({
      ...response,
      items: favoritePlaces,
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
