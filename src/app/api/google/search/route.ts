import { NextRequest, NextResponse } from 'next/server';

import { Client, Language } from '@googlemaps/google-maps-services-js';

export const runtime = 'nodejs';

const TEN_MINUTES = 600;

export async function GET(request: NextRequest) {
  const client = new Client({});

  const { searchParams } = new URL(request.url);
  const requestHeaders = new Headers(request.headers);

  const query = searchParams.get('query');
  const nextCursor = searchParams.get('nextCursor');

  if (!query) {
    return NextResponse.json(null, {
      headers: requestHeaders,
      status: 400,
      statusText: 'not found query',
    });
  }

  const response = await client.textSearch({
    params: {
      key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
      query,
      region: 'KR',
      language: Language.ko,
      opennow: false,
      pagetoken: nextCursor ?? undefined,
    },
  });

  if (response.status === 200) {
    return NextResponse.json(response.data, {
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

  return NextResponse.json(null, {
    status: response.status,
    statusText: response.statusText,
    headers: requestHeaders,
  });
}
