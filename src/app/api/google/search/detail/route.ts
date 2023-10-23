import { NextRequest, NextResponse } from 'next/server';

import { Client, Language } from '@googlemaps/google-maps-services-js';

export const runtime = 'nodejs';

const TEN_MINUTES = 600;

export async function GET(request: NextRequest) {
  const client = new Client({});

  const { searchParams } = new URL(request.url);
  const requestHeaders = new Headers(request.headers);

  const placeId = searchParams.get('placeId');
  const sessionToken = requestHeaders.get('session-token');

  if (!placeId) {
    return NextResponse.json(null, {
      headers: requestHeaders,
      status: 400,
      statusText: 'not found place',
    });
  }

  const response = await client.placeDetails({
    params: {
      key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
      place_id: placeId,
      region: 'KR',
      language: Language.ko,
      sessiontoken: sessionToken ?? undefined,
    },
  });

  if (response.status !== 200) {
    return NextResponse.json(null, {
      status: response.status,
      statusText: response.statusText,
      headers: requestHeaders,
    });
  }

  const thumbnailPhotoReference = response.data.result.photos?.[0].photo_reference;

  if (!thumbnailPhotoReference) {
    return NextResponse.json(response.data, {
      status: response.status,
      statusText: response.statusText,
      headers: requestHeaders,
    });
  }

  const thumbnailPhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${thumbnailPhotoReference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;

  return NextResponse.json({
    ...response.data,
    result: {
      ...response.data.result,
      thumbnail: thumbnailPhotoUrl,
    },
  }, {
    status: response.status,
    statusText: response.statusText,
    headers: {
      ...requestHeaders,
      'Cache-Control': 'public, s-maxage=1',
      'CDN-Cache-Control': 'public, s-maxage=60',
      'Vercel-CDN-Cache-Control': `public, s-maxage=${TEN_MINUTES}`,
    },
  });
}
