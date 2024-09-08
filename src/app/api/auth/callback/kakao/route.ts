import { NextRequest, NextResponse } from 'next/server';

import api, { FetchError } from '@/lib/apis';
import { TokenResponse } from '@/lib/apis/auth/model';
import CookieNames from '@/lib/constants/cookies';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const requestHeaders = new Headers(request.headers);

  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code || !state) {
    return NextResponse.json(null, {
      status: 404,
      statusText: 'empty params',
    });
  }

  try {
    const tokenResponse = await api<TokenResponse>({
      url: '/auth/kakao/tokens',
      method: 'POST',
      type: 'public',
      params: {
        code,
        state,
      },
      headers: {
        ...requestHeaders,
      },
      config: {
        cache: 'no-store',
      },
    });

    const response = NextResponse.json(tokenResponse, {
      status: 200,
    });

    response.cookies.set(CookieNames.ACCESS_TOKEN, tokenResponse.access_token);
    response.cookies.set(CookieNames.REFRESH_TOKEN, tokenResponse.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
    });

    return response;
  } catch (error) {
    if (error instanceof FetchError) {
      return NextResponse.json(null, {
        status: error.status,
        statusText: error.message,
      });
    }

    return NextResponse.json(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}
