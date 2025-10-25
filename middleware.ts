import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'nova-store-secret-key-change-in-production'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Admin authentication only
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    console.log('Checking admin authentication for:', pathname); // Debug log
    
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      console.log('No admin token found, redirecting to login'); // Debug log
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const { payload } = await jwtVerify(token, secret);
      if (payload.role !== 'admin') {
        console.log('Invalid admin role, redirecting to login'); // Debug log
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      console.log('Admin authentication successful'); // Debug log
    } catch (error) {
      console.log('Token verification failed:', error); // Debug log
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};