import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get('accessToken')?.value

  // Auth pages are public
  const authPages = ['/auth', '/auth/admin/login', '/auth/admin/signup', '/auth/user/login', '/auth/user/signup', '/auth/forgot-password']
  const isAuthPage = authPages.some(page => pathname.startsWith(page))

  if (isAuthPage) {
    // If already authenticated, redirect away from auth pages
    if (token && pathname === '/auth') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // Protected routes require authentication
  const protectedRoutes = ['/dashboard', '/admin']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Protect all routes except public ones
    '/((?!_next|api|public|favicon.ico).*)',
  ],
}
