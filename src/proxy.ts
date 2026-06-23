import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const handleI18nRouting = createMiddleware(routing)

const ECOSYS_HOST = 'ecosys.fadoai.com'

export default function proxy(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const isEcoSys = host === ECOSYS_HOST || host.startsWith(`${ECOSYS_HOST}:`)

  if (isEcoSys) {
    // Block Vietnamese locale — redirect /vi/... to /...
    const { pathname } = request.nextUrl
    if (pathname.startsWith('/vi')) {
      const url = request.nextUrl.clone()
      url.pathname = pathname.replace(/^\/vi/, '') || '/'
      return NextResponse.redirect(url)
    }
  }

  return handleI18nRouting(request)
}

export const config = {
  matcher: [
    // Match all pathnames except static files and Next.js internals
    '/((?!_next|_vercel|.*\\..*).*)',
    // Also match root
    '/',
  ],
}
