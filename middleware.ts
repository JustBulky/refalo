import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 1. Check if the user is trying to access the /admin area
  if (req.nextUrl.pathname.startsWith('/admin')) {

    // 2. Get the authorization header from the browser
    const basicAuth = req.headers.get('authorization');
    const url = req.nextUrl;

    // 3. Define your credentials (USER:PASSWORD)
    // CHANGE "admin" and "password123" to your desired login!
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      if (user === 'admin' && pwd === '*8OYq!pQqR') {
        return NextResponse.next();
      }
    }

    // 4. If no valid credentials, demand them
    url.pathname = '/api/auth';
    return new NextResponse('Auth Required.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

// Configure which paths this middleware applies to
export const config = {
  matcher: ['/admin/:path*'],
};
