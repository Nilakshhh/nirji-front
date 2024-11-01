import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';
  const userIdFromCookies = request.cookies.get('id')?.value; // Get the user ID from cookies
  const path = request.nextUrl.pathname;

  // Define paths that require login
  const pathsThatRequireLogin = ['/my-profile', '/profile'];

  // Check if the user is accessing a path that requires login
  if (pathsThatRequireLogin.some(p => path.startsWith(p)) && !isLoggedIn) {
    // Redirect to the login page if not logged in
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Check if the path is /profile/[id] and compare the IDs
  const profileMatch = path.match(/^\/profile\/([^/]+)$/); // Regex to capture the ID from the URL
  if (profileMatch) {
    const profileId = profileMatch[1]; // Get the ID from the matched URL
    if (isLoggedIn && userIdFromCookies === profileId) {
      // If logged in and the IDs match, redirect to /my-profile
      return NextResponse.redirect(new URL('/my-profile', request.url));
    }
  }

  // Allow the request to proceed if all checks pass
  return NextResponse.next();
}
