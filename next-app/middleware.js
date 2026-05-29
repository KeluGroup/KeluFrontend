// middleware.js
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
  locales: ['de', 'en', 'es', 'fr', 'it'],
  defaultLocale: 'de',
})

export default function middleware(request) {
  const { pathname } = request.nextUrl

  // Skip locale handling for admin routes entirely
  if (pathname.startsWith('/admin')) {
    return
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}