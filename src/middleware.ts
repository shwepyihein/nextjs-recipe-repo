import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get('accessToken');
  const path = request.nextUrl.pathname;

  console.log(path, session);

  //Return to /login if don't have a session
  if (!session && path !== '/login' && path !== '/register') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && (path === '/signup' || path === '/signup' || path === '/')) {
    return NextResponse.redirect(new URL('/recipe', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/'],
};
