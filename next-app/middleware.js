import { NextResponse } from 'next/server'

const LOCALES       = ['de', 'en', 'es', 'fr', 'it']
const DEFAULT_LOCALE = 'de'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Skip Next.js internals, API routes, static files, and admin
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api')   ||
    pathname.startsWith('/admin') ||  // ← add this
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