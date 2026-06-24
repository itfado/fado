import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const handleI18nRouting = createMiddleware(routing)

const ECOSYS_HOST = 'ecosys.fadoai.com'

export default function proxy(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const isEcoSys = host === ECOSYS_HOST || host.startsWith(`${ECOSYS_HOST}:`)

  return handleI18nRouting(request)
}

export const config = {
  matcher: [
    '/((?!_next|_vercel|opengraph-image|twitter-image|apple-icon|icon|.*\\..*).*)',
    '/',
  ],
}
