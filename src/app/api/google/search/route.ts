import { NextRequest, NextResponse } from 'next/server';

import { Language } from '@googlemaps/google-maps-services-js';

import { FetchError } from '../..';
import { getGoogleTextSearch } from '../handler';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
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

  try {
    const response = await getGoogleTextSearch({
      query,
      region: 'KR',
      language: Language.ko,
      opennow: false,
      pagetoken: nextCursor ?? undefined,
    });

    return NextResponse.json(response, {
      status: 200,
    });
  } catch (error) {
    const fetchError = error as FetchError;

    return NextResponse.json(null, {
      status: fetchError.response?.status,
      statusText: fetchError.response?.statusText,
      headers: fetchError.response?.headers,
    });
  }
}
