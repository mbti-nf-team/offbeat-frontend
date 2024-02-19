import { NextRequest, NextResponse } from 'next/server';

import { postAuthRefresh } from './lib/apis/auth';
import CookieNames from './lib/constants/cookies';
import HeaderNames from './lib/constants/headers';
import { isExpired } from './utils/auth';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|manifest.webmanifest|sitemap.xml|robots.txt|favicon.ico).*)'],
};

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(CookieNames.REFRESH_TOKEN);

  if (!refreshToken?.value) {
    return NextResponse.next();
  }

  if (isExpired(refreshToken?.value)) {
    const response = NextResponse.next({
      request,
    });

    response.cookies.delete(CookieNames.ACCESS_TOKEN);
    response.cookies.delete(CookieNames.REFRESH_TOKEN);
    response.headers.delete(HeaderNames.Authorization);

    return response;
  }

  const responseToken = await postAuthRefresh({ refreshToken: refreshToken.value });

  if (responseToken.access_token) {
    const response = NextResponse.next();

    response.cookies.set(CookieNames.ACCESS_TOKEN, responseToken.access_token);
    response.headers.set(HeaderNames.Authorization, responseToken.access_token);

    return response;
  }

  const response = NextResponse.next({
    request,
  });

  response.cookies.delete(CookieNames.ACCESS_TOKEN);
  response.cookies.delete(CookieNames.REFRESH_TOKEN);
  response.headers.delete(HeaderNames.Authorization);

  return response;
}
