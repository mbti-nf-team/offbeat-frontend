import { NextRequest, NextResponse } from 'next/server';

import CookieNames from './lib/constants/cookies';
import { isExpired } from './utils/auth';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|manifest.webmanifest|sitemap.xml|robots.txt|favicon.ico).*)'],
};

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(CookieNames.ACCESS_TOKEN);
  const refreshToken = request.cookies.get(CookieNames.REFRESH_TOKEN);

  if (request.nextUrl.pathname !== '/login' && (!accessToken || !refreshToken || isExpired(refreshToken.value))) {
    const response = NextResponse.redirect(new URL('/login', request.url));

    response.cookies.delete({
      name: CookieNames.ACCESS_TOKEN,
    });
    response.cookies.delete({
      name: CookieNames.REFRESH_TOKEN,
    });

    return response;
  }

  const response = NextResponse.next({
    request,
  });

  return response;
}
