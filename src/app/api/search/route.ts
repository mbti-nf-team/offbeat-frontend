import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const NAVER_SEARCH_API = 'https://openapi.naver.com/v1/search';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const keyword = searchParams.get('keyword');

  const response = await fetch(`${NAVER_SEARCH_API}/blog?query=${keyword}`, {
    method: 'GET',
    headers: {
      'X-Naver-Client-Id': process.env.NEXT_PUBLIC_NAVER_SEARCH_CLIEND_ID,
      'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_NAVER_SEARCH_CLIEND_SECRET,
    },
  });

  if (response.ok) {
    const searchResult = await response.json();

    return NextResponse.json(searchResult, {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  return NextResponse.json(null, {
    headers: {
      'content-type': 'application/json',
    },
    status: 404,
    statusText: 'error',
  });
}
