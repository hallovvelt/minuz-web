import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// Next.js 16: renamed from middleware.ts to proxy.ts
// Note: edge runtime is not supported here — this runs on Node.js only.
export default createMiddleware(routing)

export const config = {
  matcher: ['/((?!api|_next|_vercel|demo|.*\\..*).*)'],
}
