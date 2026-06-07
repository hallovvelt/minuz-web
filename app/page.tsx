import { redirect } from 'next/navigation'

// The middleware (next-intl) rewrites "/" → "/de" with localePrefix:'as-needed'.
// This file is a safety net for any request that bypasses middleware.
export default function RootPage() {
  redirect('/de')
}
