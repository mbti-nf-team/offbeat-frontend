import { NextRequest, NextResponse } from 'next/server';

import { Language } from '@googlemaps/google-maps-services-js';

import { paramsSerializer } from '@/lib/apis';

export const runtime = 'nodejs';

// const TEN_MINUTES = 600;

export async function GET(request: NextRequest) {
  // const client = new Client({});

  const { searchParams } = new URL(request.url);
  const requestHeaders = new Headers(request.headers);

  const placeId = searchParams.get('placeId');
  // const sessionToken = requestHeaders.get('session-token');

  if (!placeId) {
    return NextResponse.json(null, {
      headers: requestHeaders,
      status: 400,
      statusText: 'not found place',
    });
  }

  const response = await fetch(`${process.env.NEW_GOOGLE_MAP_API_ORIGIN}/places/${placeId}${paramsSerializer({
    languageCode: Language.ko,
    regionCode: 'KR',
  })}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
      'X-Goog-FieldMask': '*',
    },
  });

  if (!response.ok) {
    return NextResponse.json(null, response);
  }

  // const places = await response.json() as TextSearchResponseData;

  // const thumbnailPhotoReference = response.data.result.photos?.[0].photo_reference;

  // if (!thumbnailPhotoReference) {
  //   return NextResponse.json(response.data, {
  //     status: response.status,
  //     statusText: response.statusText,
  //     headers: requestHeaders,
  //   });
  // }

  // const thumbnailPhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${thumbnailPhotoReference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;

  // return NextResponse.json({
  //   ...response.data,
  //   result: {
  //     ...response.data.result,
  //     thumbnail: thumbnailPhotoUrl,
  //   },
  // }, {
  //   status: response.status,
  //   statusText: response.statusText,
  //   headers: {
  //     ...requestHeaders,
  //     'Cache-Control': 'public, s-maxage=1',
  //     'CDN-Cache-Control': 'public, s-maxage=60',
  //     'Vercel-CDN-Cache-Control': `public, s-maxage=${TEN_MINUTES}`,
  //   },
  // });
}
