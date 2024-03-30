import { NextRequest, NextResponse } from 'next/server';

import { FetchError } from '@/lib/apis';
import CookieNames from '@/lib/constants/cookies';

export const runtime = 'edge';

// const TEN_MINUTES = 600;

export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const accessToken = request.cookies.get(CookieNames.ACCESS_TOKEN)?.value;

  if (!accessToken) {
    return NextResponse.json(null, {
      headers: requestHeaders,
      status: 401,
    });
  }

  try {
    // const response = await api<FavoritePlacesResponse>({
    //   url: `${process.env.NEXT_PUBLIC_API_HOST}/favorite-places`,
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });

    // const googleDetails = await fetchAllSettledPlaceDetails({
    //   placeIds: response.items.map((item) => item.google_place_id),
    // });

    // const { address_components, ...placeDetailResult } = placeDetails.result;

    // const country = address_components
    //   ?.find((address) => address.types.includes(PlaceType2.country));

    // const placePhotoUrls = checkEmpty(placeDetails.result.photos)
    //   .map((photo) => getPlacePhotoUrl(photo.photo_reference, 500))
    //   .filter((photoUrl) => !!photoUrl);

    // const searchBlogPost = await fetchNaverSearchBlog<true>({
    //   query: placeDetails.result.name, includePost: true,
    // });

    // return NextResponse.json({
    //   ...placeDetails,
    //   result: {
    //     ...placeDetailResult,
    //     country,
    //     thumbnail: placePhotoUrls[0],
    //     photoUrls: placePhotoUrls,
    //     searchBlogPost,
    //   },
    // }, {
    //   headers: {
    //     'Cache-Control': 'public, s-maxage=1',
    //     'CDN-Cache-Control': 'public, s-maxage=60',
    //     'Vercel-CDN-Cache-Control': `public, s-maxage=${TEN_MINUTES}`,
    //   },
    // });
  } catch (error) {
    const fetchError = error as FetchError;

    return NextResponse.json(null, {
      status: fetchError.response?.status || 500,
      statusText: fetchError.response?.statusText || fetchError.message,
      headers: fetchError.response?.headers,
    });
  }
}
