import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const handleI18nRouting = createMiddleware(routing)

const ECOSYS_HOST = 'ecosys.fadoai.com'

export default function proxy(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const isEcoSys = host === ECOSYS_HOST || host.startsWith(`${ECOSYS_HOST}:`)

  if (isEcoSys) {
    const { pathname } = request.nextUrl
    // Strip /vi prefix — hard redirect so URL bar stays clean
    if (pathname.startsWith('/vi')) {
      const url = request.nextUrl.clone()
      url.pathname = pathname.replace(/^\/vi/, '') || '/'
      return NextResponse.redirect(url)
    }
    // Force English internally — prevents next-intl from detecting
    // Vietnamese browser language and redirecting to /vi/, which would
    // loop back here and cause an infinite redirect chain.
    if (!pathname.startsWith('/en')) {
      const url = request.nextUrl.clone()
      url.pathname = '/en' + (pathname === '/' ? '' : pathname)
      return NextResponse.rewrite(url)
    }
    return NextResponse.next()
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
