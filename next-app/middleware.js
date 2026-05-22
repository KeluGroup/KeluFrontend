import { NextResponse } from 'next/server'

const LOCALES      = ['de', 'en', 'es', 'fr', 'it']
const DEFAULT_LOCALE = 'de'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Skip Next.js internals, API routes, and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api')   ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Already has a valid locale prefix → let it through
  const hasLocale = LOCALES.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  if (!hasLocale) {
    return NextResponse.redirect(
      new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}