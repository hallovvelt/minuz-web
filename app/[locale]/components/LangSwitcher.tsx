'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useTransition } from 'react'

const LANGS = [
  { code: 'de', label: 'DE', title: 'Deutsch' },
  { code: 'en', label: 'EN', title: 'English' },
  { code: 'tr', label: 'TR', title: 'Türkçe' },
] as const

export function LangSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [, startTransition] = useTransition()

  const switchLocale = (next: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-1.5">
      {LANGS.map(l => (
        <button
          key={l.code}
          type="button"
          onClick={() => switchLocale(l.code)}
          aria-label={l.title}
          title={l.title}
          className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 cursor-pointer ${
            locale === l.code
              ? 'bg-[#1d1d1f] text-white border-[#1d1d1f]'
              : 'border-zinc-300 text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
