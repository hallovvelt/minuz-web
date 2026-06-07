"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const KLASSEN = [
  { cls: 'B',  name: 'PKW',       desc: 'Führerschein für Pkw und Leichtmotorräder — der klassische Einstieg.',          price: 'ab 1.299 €' },
  { cls: 'A',  name: 'Motorrad',  desc: 'Führerschein für Krafträder aller Leistungsstufen.',                             price: 'ab 789 €'   },
  { cls: 'C',  name: 'LKW',       desc: 'Führerschein für Lastkraftwagen über 3,5 Tonnen Gesamtgewicht.',                 price: 'ab 2.499 €' },
  { cls: 'BE', name: 'Anhänger',  desc: 'Erweiterung der Klasse B für Fahrzeugkombinationen mit Anhänger.',               price: 'ab 449 €'   },
]

const REVIEWS = [
  {
    initials: 'KH', name: 'Karl-Heinz M.', date: 'Oktober 2024',
    text: 'Mega gute Fahrschule! Innerhalb von 4 Monaten meinen B-Schein beim ersten Versuch bestanden. Die Fahrlehrer sind geduldig und erklären alles verständlich. Absolut zu empfehlen!',
  },
  {
    initials: 'YS', name: 'Yasmin S.', date: 'September 2024',
    text: 'Sehr professionell und freundlich. Die Online-Theorie hat mir enorm geholfen — ich konnte von zu Hause aus lernen. Erstes Mal beim Theorietest bestanden. Danke!',
  },
  {
    initials: 'MB', name: 'Marco B.', date: 'August 2024',
    text: 'Beim ersten Anlauf bestanden! Das Team ist super motivierend und die Fahrzeuge sind top gepflegt. Ich würde die FahrAkademie jederzeit wieder wählen.',
  },
]

const STATS = [
  { value: '98%',   label: 'Bestehensrate'  },
  { value: '800+',  label: 'Fahrschüler'    },
  { value: '12 J.', label: 'Erfahrung'      },
]

export default function FahrschuleDemo() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="min-h-screen bg-[#060d1a] text-white">

      {/* ── NAV ──────────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4 flex items-center justify-between
          ${scrolled ? 'bg-[#060d1a]/95 backdrop-blur-xl border-b border-white/6 shadow-2xl shadow-black/40' : 'bg-transparent'}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <span className="text-white font-black text-[11px]">FA</span>
          </div>
          <div className="leading-tight">
            <div className="text-white font-bold text-[13px]">FahrAkademie</div>
            <div className="text-blue-400 text-[9px] font-semibold uppercase tracking-[0.15em]">Lahr · Schwarzwald</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-7 text-[12px] text-zinc-400 font-medium">
          <a href="#klassen"     className="hover:text-white transition-colors">Klassen</a>
          <a href="#bewertungen" className="hover:text-white transition-colors">Bewertungen</a>
          <a href="#standort"    className="hover:text-white transition-colors">Standort</a>
          <a href="#termin"      className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-105">
            Termin buchen
          </a>
        </div>

        <a href="#termin" className="md:hidden bg-blue-600 text-white text-[12px] font-semibold px-4 py-2 rounded-full">
          Termin
        </a>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200"
          alt="Fahren auf einer Straße"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-[#060d1a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060d1a]/70 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pb-20 md:pb-32">
          <div className="max-w-2xl">
            {/* Rating badge */}
            <div className="flex items-center gap-2.5 mb-7 w-fit bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => <span key={s} className="text-amber-400 text-[13px] leading-none">★</span>)}
              </div>
              <span className="text-white/80 text-[11px] font-medium">4.9 · 312 Google-Bewertungen</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-[72px] font-bold leading-[1.05] tracking-tight mb-5">
              Dein Weg zum<br />
              <span className="text-blue-400">Führerschein.</span>
            </h1>

            <p className="text-zinc-300 text-base md:text-lg mb-9 leading-relaxed">
              Klasse B, A, C & BE · Online-Theorie · Lahr & Umgebung
            </p>

            <div className="flex flex-wrap gap-3 mb-14">
              <a href="#termin"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/35">
                Termin buchen
              </a>
              <a href="#klassen"
                className="border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-all backdrop-blur-sm">
                Preise ansehen
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {STATS.map(s => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">{s.value}</div>
                  <div className="text-zinc-400 text-xs mt-1 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── KLASSEN ──────────────────────────────────────────────────────────── */}
      <section id="klassen" className="py-24 md:py-32 px-6 md:px-12 bg-[#060d1a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Alle Klassen im Überblick</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Führerschein-Klassen</h2>
            <p className="text-zinc-400 text-sm mt-3 max-w-sm mx-auto">Wählen Sie Ihre Klasse — kostenlose Erstberatung inklusive.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {KLASSEN.map(k => (
              <div key={k.cls}
                className="bg-[#0e1a2e] border border-white/7 rounded-2xl p-6 flex flex-col hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 group">
                {/* Label */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600/30 transition-colors">
                    <span className="text-blue-400 text-sm font-black">{k.cls}</span>
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{k.name}</div>
                    <div className="text-zinc-600 text-[10px]">Klasse {k.cls}</div>
                  </div>
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed flex-1 mb-5">{k.desc}</p>

                <div className="border-t border-white/6 pt-4 mb-4">
                  <div className="text-zinc-600 text-[9px] uppercase tracking-wider mb-1 font-semibold">Preis</div>
                  <div className="text-white font-bold text-xl">{k.price}</div>
                </div>

                <a href="#termin"
                  className="block text-center text-[11px] font-semibold py-2.5 rounded-xl border border-blue-500/35 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-transparent transition-all">
                  Jetzt buchen →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────────────────── */}
      <section id="bewertungen" className="py-24 md:py-32 px-6 md:px-12 bg-[#070e1c]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Google Bewertungen</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Das sagen unsere Fahrschüler</h2>
            <div className="flex items-center justify-center gap-2.5 mt-4">
              <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <span key={s} className="text-amber-400 text-lg">★</span>)}</div>
              <span className="text-white font-bold text-base">4.9</span>
              <span className="text-zinc-500 text-sm">· 312 Bewertungen</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i}
                className="bg-[#0e1a2e] border border-white/7 rounded-2xl p-7 flex flex-col gap-5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
                {/* Stars + Google logo row */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => <span key={s} className="text-amber-400 text-[13px]">★</span>)}
                  </div>
                  <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-wider">Google</span>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</p>

                <div className="flex items-center gap-3 pt-4 border-t border-white/6">
                  <div className="w-10 h-10 bg-blue-600/25 border border-blue-500/30 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-blue-400 text-xs font-bold">{r.initials}</span>
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{r.name}</div>
                    <div className="text-zinc-500 text-[11px]">{r.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOOGLE MAPS ──────────────────────────────────────────────────────── */}
      <section id="standort" className="py-24 md:py-32 px-6 md:px-12 bg-[#060d1a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Wo Sie uns finden</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Unser Standort</h2>
            <p className="text-zinc-400 text-sm mt-3">Hauptstraße 42 · 77933 Lahr (Schwarzwald)</p>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: '📍', label: 'Adresse', val: 'Hauptstraße 42, 77933 Lahr' },
              { icon: '🕐', label: 'Öffnungszeiten', val: 'Mo–Fr 08–18 Uhr · Sa 09–14 Uhr' },
              { icon: '📞', label: 'Telefon', val: '+49 7821 000 000' },
            ].map(info => (
              <div key={info.label} className="bg-[#0e1a2e] border border-white/7 rounded-2xl p-5 flex items-start gap-4">
                <span className="text-xl mt-0.5">{info.icon}</span>
                <div>
                  <div className="text-zinc-500 text-[10px] uppercase tracking-wider font-semibold mb-1">{info.label}</div>
                  <div className="text-white text-sm font-medium">{info.val}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/8 shadow-2xl shadow-black/50">
            <iframe
              src="https://maps.google.com/maps?q=Lahr+Schwarzwald&t=&z=14&ie=UTF8&iwloc=&output=embed"
              title="Standort FahrAkademie Lahr"
              className="w-full h-72 md:h-[420px] grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ── CTA / TERMIN ─────────────────────────────────────────────────────── */}
      <section id="termin" className="py-24 md:py-32 px-6 md:px-12 bg-gradient-to-b from-[#070e1c] to-[#060d1a]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-5">Kostenloses Erstgespräch</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Bereit für deinen Führerschein?</h2>
          <p className="text-zinc-400 text-sm md:text-base mb-12 leading-relaxed max-w-lg mx-auto">
            Ruf uns an oder schreib uns — wir beraten dich kostenlos und finden gemeinsam den besten Weg zu deinem Führerschein.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+4978210000000"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-full text-sm transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2.5">
              <span>📞</span> +49 7821 000 000
            </a>
            <a href="https://wa.me/4915201234567" target="_blank" rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-full text-sm transition-all hover:scale-105 active:scale-95 shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2.5">
              <span>💬</span> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#040912] border-t border-white/5 px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-white font-black text-[11px]">FA</span>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">FahrAkademie Lahr</div>
                  <div className="text-blue-400 text-[9px] uppercase tracking-[0.15em] font-semibold">Schwarzwald</div>
                </div>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed">
                Hauptstraße 42 · 77933 Lahr<br />
                Mo–Fr 08:00–18:00 · Sa 09:00–14:00<br />
                Tel: +49 7821 000 000
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-14 gap-y-3 text-xs text-zinc-500">
              {['Impressum', 'Datenschutz', 'AGB', 'Kontakt', 'Sitemap', 'Karriere'].map(l => (
                <a key={l} href="#" className="hover:text-zinc-300 transition-colors">{l}</a>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] text-zinc-600">
            <span>© 2025 FahrAkademie Lahr GmbH. Alle Rechte vorbehalten.</span>
            <span>
              Website entwickelt von{' '}
              <a href="/" className="text-zinc-400 font-semibold hover:text-white transition-colors">MINUZ Studio</a>
            </span>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ────────────────────────────────────────────────── */}
      <a
        href="https://wa.me/4915201234567"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Über WhatsApp kontaktieren"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 hover:bg-emerald-400 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 hover:shadow-emerald-400/50 transition-all duration-300"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  )
}
