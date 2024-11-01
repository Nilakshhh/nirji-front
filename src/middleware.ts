import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';
  const path = request.nextUrl.pathname;

  // Define paths that require login
  const pathsThatRequireLogin = ['/my-profile'];

  // Check if the user is accessing a path that requires login
  if (pathsThatRequireLogin.some(p => path.startsWith(p)) && !isLoggedIn) {
    // Redirect to the login page
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Allow the request to proceed if all checks pass
  return NextResponse.next();
}