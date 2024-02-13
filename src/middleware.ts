import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|manifest.webmanifest|sitemap.xml|robots.txt|favicon.ico).*)'],
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request,
  });

  return response;
}
