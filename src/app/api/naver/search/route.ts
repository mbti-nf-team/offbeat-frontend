import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const TEN_MINUTES = 600;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const requestHeaders = new Headers(request.headers);

  const query = searchParams.get('query');
  const includePost = searchParams.get('include_post');

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/naver/search/blog?query=${query}&include_post=${includePost}`, {
    method: 'GET',
    next: {
      revalidate: TEN_MINUTES,
    },
    headers: {
      ...requestHeaders,
      'nfteam-api-token': process.env.API_HEADER_TOKEN,
    },
  });

  if (response.ok) {
    const searchResult = await response.json();

    return NextResponse.json(searchResult, {
      ...response,
      headers: {
        ...response.headers,
        'Cache-Control': 'public, s-maxage=1',
        'CDN-Cache-Control': 'public, s-maxage=60',
        'Vercel-CDN-Cache-Control': `public, s-maxage=${TEN_MINUTES}`,
      },
    });
  }

  return NextResponse.json(null, response);
}
