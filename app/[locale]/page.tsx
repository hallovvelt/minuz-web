'use client'

import { useEffect, useState, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Cormorant_Garamond } from 'next/font/google'
import { LangSwitcher } from './components/LangSwitcher'

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['italic', 'normal'],
})

// ─── LOCALE-KEYED DATA ────────────────────────────────────────────────────────

type Plan = {
  badge: string; name: string; desc: string; old: string
  price: string; per: string; features: string[]
  cta: string; highlight?: boolean; promo?: string
}

const PLANS: Record<string, Plan[]> = {
  de: [
    { badge: 'Essential',    name: 'Minuz Start',      desc: 'Perfekt für kleinere Boutiken und digitale Visitenkarten.',      old: '39 €',  price: '25 €',  per: '/ Monat *', features: ['Premium Design & Hosting', 'Google Business Setup', '30 Tage Testrecht'], cta: 'Jetzt starten' },
    { badge: 'Meistgewählt', name: 'Minuz Studio Pro', desc: 'Die ultimative Lösung für maximale Kundenbindung.',              old: '70 €',  price: '50 €',  per: '/ Monat *', features: ['0 € Setup (Für erste Kunden)', '30 Tage Kündigungsrecht', 'Ultra-Premium & Mehrsprachig', 'SEO & Google Maps'], cta: 'Angebot sichern', highlight: true, promo: 'AKTION' },
    { badge: 'Exclusive',    name: 'Minuz Custom',     desc: 'Für Unternehmen mit mehreren Standorten oder individuellen Lösungen.', old: '139 €', price: '99 €',  per: '/ Monat *', features: ['Unbegrenzte Seitenanzahl', 'Custom E-Commerce / Buchung', '24/7 VIP-Support'], cta: 'Kontaktieren Sie uns' },
  ],
  en: [
    { badge: 'Essential',    name: 'Minuz Start',      desc: 'Perfect for smaller boutiques and digital business cards.',      old: '€39',  price: '€25',  per: '/ month *', features: ['Premium Design & Hosting', 'Google Business Setup', '30-day trial'], cta: 'Get Started' },
    { badge: 'Most Popular', name: 'Minuz Studio Pro', desc: 'The ultimate solution for maximum customer retention.',          old: '€70',  price: '€50',  per: '/ month *', features: ['€0 Setup (for first customers)', '30-day cancellation', 'Ultra-Premium & Multilingual', 'SEO & Google Maps'], cta: 'Secure Offer', highlight: true, promo: 'DEAL' },
    { badge: 'Exclusive',    name: 'Minuz Custom',     desc: 'For businesses with multiple locations or custom solutions.',    old: '€139', price: '€99',  per: '/ month *', features: ['Unlimited pages', 'Custom E-Commerce / Booking', '24/7 VIP Support'], cta: 'Contact Us' },
  ],
  tr: [
    { badge: 'Essential',    name: 'Minuz Start',      desc: 'Küçük butikler ve dijital kartvizitler için mükemmel.',         old: '39 €',  price: '25 €',  per: '/ ay *', features: ['Premium Tasarım & Hosting', 'Google Business Kurulumu', '30 Gün Deneme'], cta: 'Hemen Başla' },
    { badge: 'En Popüler',   name: 'Minuz Studio Pro', desc: 'Maksimum müşteri bağlılığı için nihai çözüm.',                  old: '70 €',  price: '50 €',  per: '/ ay *', features: ['0 € Kurulum (İlk müşteriler)', '30 Gün İptal Hakkı', 'Ultra-Premium & Çok Dilli', 'SEO & Google Maps'], cta: 'Teklifi Al', highlight: true, promo: 'KAMPANYA' },
    { badge: 'Exclusive',    name: 'Minuz Custom',     desc: 'Birden fazla şubesi olan veya özel çözüm isteyen işletmeler.',  old: '139 €', price: '99 €',  per: '/ ay *', features: ['Sınırsız Sayfa', 'Özel E-Ticaret / Rezervasyon', '7/24 VIP Destek'], cta: 'Bize Ulaşın' },
  ],
}

const TESTIMONIALS = [
  { initials: 'KH', color: 'bg-blue-100 text-blue-700',   name: 'Karl-Heinz M.', biz: 'Müller Fahrschule, Hamburg',  quote: 'Innerhalb von 8 Tagen waren wir online. Die Anfragen kamen sofort — wir mussten eine Warteliste einführen.' },
  { initials: 'YÖ', color: 'bg-rose-100 text-rose-700',   name: 'Yasmin Ö.',     biz: 'Studio Y, Berlin',            quote: 'Endlich eine Website, auf die ich stolz bin. Unsere Buchungen sind um 40% gestiegen. Jeder fragt mich, wer das gemacht hat.' },
  { initials: 'MF', color: 'bg-amber-100 text-amber-700', name: 'Marco F.',      biz: 'Trattoria Marco, München',    quote: 'Das Team hat unser Restaurant-Feeling perfekt eingefangen. Professionell, schnell — und wirklich günstig für das, was man bekommt.' },
]

// ─── PORTFOLIO MOCKUPS ────────────────────────────────────────────────────────

function FahrschulePreview() {
  return (
    <div className="w-full h-full bg-[#050c1a] flex flex-col select-none">
      <nav className="flex items-center justify-between px-6 py-3 bg-[#050c1a] border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2"><div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center"><span className="text-white text-[9px] font-black">FA</span></div><span className="text-white font-bold text-xs">FahrAkademie Berlin</span></div>
        <div className="hidden md:flex gap-4 text-[10px] text-zinc-500"><span>Klassen</span><span>Preise</span><span className="bg-blue-600 text-white px-2.5 py-1 rounded-full font-semibold">Termin</span></div>
      </nav>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 bg-gradient-to-br from-blue-950/70 via-[#050c1a] to-[#050c1a] px-5 py-5 flex flex-col justify-between">
          <div><div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map(s=><span key={s} className="text-amber-400 text-[10px]">★</span>)}</div><div className="text-white text-lg font-bold mb-1">Dein Weg zum<br/><span className="text-blue-400">Führerschein.</span></div><p className="text-zinc-500 text-[10px] mb-4">Klasse B, A, C & BE · Berlin</p><div className="flex gap-2"><span className="bg-blue-600 text-white text-[9px] font-bold px-3 py-1.5 rounded-full">Termin buchen</span><span className="border border-white/15 text-white/60 text-[9px] px-3 py-1.5 rounded-full">Preise</span></div></div>
          <div className="grid grid-cols-3 gap-1.5">{[['98%','Bestehensrate'],['1.2k+','Fahrschüler'],['15J','Erfahrung']].map(([v,l])=><div key={l} className="bg-white/5 rounded-lg p-2 text-center"><div className="text-blue-400 text-xs font-bold">{v}</div><div className="text-zinc-600 text-[8px]">{l}</div></div>)}</div>
        </div>
        <div className="hidden md:flex w-44 flex-col gap-1.5 p-3 bg-[#070e20]">
          <div className="text-[8px] text-zinc-600 uppercase tracking-wider mb-1 font-semibold">Klassen</div>
          {[['B','PKW','1.299€'],['A','Motorrad','789€'],['C','LKW','2.499€'],['BE','Anhänger','449€']].map(([cls,n,p])=><div key={cls} className="flex items-center gap-2 bg-white/3 rounded-lg px-2.5 py-2 border border-white/5"><div className="w-6 h-6 bg-blue-500/20 rounded-md flex items-center justify-center shrink-0"><span className="text-blue-400 text-[9px] font-black">{cls}</span></div><div><div className="text-white text-[9px] font-medium">{n}</div><div className="text-zinc-600 text-[8px]">{p}</div></div></div>)}
        </div>
      </div>
    </div>
  )
}
function FriseurPreview() {
  return (
    <div className="w-full h-full bg-white flex flex-col select-none">
      <nav className="flex items-center justify-between px-6 py-3 bg-white border-b border-zinc-100 shrink-0"><div><div className={`${serif.className} italic text-base text-zinc-800`}>Studio Belle</div><div className="text-[7px] text-rose-400 uppercase tracking-widest font-semibold">Premium Hair · Hamburg</div></div><div className="hidden md:flex gap-4 text-[10px] text-zinc-400"><span>Leistungen</span><span className="bg-zinc-900 text-white px-3 py-1 rounded-full font-medium">Buchen</span></div></nav>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 bg-gradient-to-br from-rose-50 to-white px-5 py-5 flex flex-col justify-between">
          <div><div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map(s=><span key={s} className="text-amber-400 text-[10px]">★</span>)}</div><div className="text-zinc-800 text-lg font-semibold mb-1">Schönheit,<br/>die begeistert.</div><p className="text-zinc-500 text-[10px] mb-4">Premium Produkte, Premium Ergebnis.</p><span className="bg-zinc-900 text-white text-[9px] font-medium px-3 py-1.5 rounded-full">Termin buchen →</span></div>
          <div>{[['Schnitt & Styling','ab 45€'],['Balayage & Farbe','ab 120€'],['Keratin','ab 180€']].map(([s,p])=><div key={s} className="flex justify-between py-1.5 border-b border-zinc-100 last:border-0"><span className="text-[9px] text-zinc-700">{s}</span><span className="text-[9px] text-rose-500 font-semibold">{p}</span></div>)}</div>
        </div>
        <div className="hidden md:grid grid-cols-2 gap-1 w-32 p-2.5 bg-zinc-50 content-start">{['bg-rose-200','bg-amber-100','bg-pink-100','bg-rose-100','bg-amber-50','bg-pink-200'].map((c,i)=><div key={i} className={`${c} rounded-lg ${i===0?'col-span-2 h-14':'h-10'}`}/>)}</div>
      </div>
    </div>
  )
}
function RestaurantPreview() {
  return (
    <div className="w-full h-full bg-[#100a04] flex flex-col select-none">
      <nav className="flex items-center justify-between px-6 py-3 border-b border-amber-900/20 shrink-0"><div><div className={`${serif.className} italic text-base text-amber-400`}>La Bella Cucina</div><div className="text-[7px] text-amber-800/50 uppercase tracking-widest">München · Seit 1998</div></div><div className="hidden md:flex gap-4 text-[10px] text-amber-900/50"><span>Menü</span><span className="border border-amber-700/40 text-amber-400 px-3 py-1 rounded-full font-medium">Reservieren</span></div></nav>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 px-5 py-5 flex flex-col justify-between">
          <div><div className="text-[8px] text-amber-700 uppercase tracking-wider font-semibold mb-2">🍷 Tägl. 18–23 Uhr</div><div className={`${serif.className} italic text-amber-100 text-xl mb-2`}>Ein Abend, den<br/>Sie nicht vergessen.</div><span className="border border-amber-700/50 text-amber-400 text-[9px] font-medium px-3 py-1.5 rounded-full inline-block">Tisch reservieren →</span></div>
          <div><div className="text-[8px] text-amber-800/50 uppercase tracking-wider mb-1.5 font-semibold">Empfehlungen</div>{[['Linguine al Tartufo','28€'],['Branzino al Forno','34€'],['Tiramisù','9€']].map(([d,p])=><div key={d} className="flex justify-between py-1 border-b border-amber-900/15 last:border-0"><span className="text-[9px] text-amber-200/70">{d}</span><span className="text-[9px] text-amber-500 font-semibold">{p}</span></div>)}</div>
        </div>
        <div className="hidden md:flex w-36 flex-col p-2.5 gap-1.5 bg-black/20">{['bg-amber-950/40','bg-amber-900/25','bg-orange-950/30'].map((c,i)=><div key={i} className={`${c} rounded-xl flex-1 border border-amber-800/10`}/>)}</div>
      </div>
    </div>
  )
}
function BoutiquePreview() {
  return (
    <div className="w-full h-full bg-[#fafaf9] flex flex-col select-none">
      <nav className="flex items-center justify-between px-6 py-3 bg-white border-b border-zinc-100 shrink-0"><span className={`${serif.className} italic text-lg text-zinc-900 tracking-widest`}>MAISON K.</span><div className="hidden md:flex gap-5 text-[9px] text-zinc-400 uppercase tracking-widest"><span>Neu</span><span>Kollektion</span><span className="border border-zinc-300 text-zinc-700 px-3 py-1 rounded-full font-medium tracking-normal text-[10px]">Kontakt</span></div></nav>
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-zinc-700 to-zinc-950 relative"><div className="absolute inset-0 flex flex-col justify-end p-6"><div className="text-white/30 text-[8px] uppercase tracking-widest mb-1">S/S 2025</div><div className="text-white text-xl font-light">Neue<br/>Kollektion</div></div></div>
        <div className="flex-1 flex flex-col justify-between px-5 py-5 bg-[#fafaf9]">
          <div><div className="text-[8px] uppercase tracking-widest text-zinc-400 mb-2">Premium Boutique · Hamburg</div><div className="text-xl font-light text-zinc-900 mb-2">Mode,<br/>die bleibt.</div><span className="bg-zinc-900 text-white text-[9px] font-medium px-3 py-1.5 rounded-full inline-block">Entdecken →</span></div>
          <div className="grid grid-cols-2 gap-1.5 max-w-[160px]">{[['Kleider','bg-amber-100'],['Blusen','bg-zinc-100'],['Accessoires','bg-rose-50'],['Schuhe','bg-stone-100']].map(([cat,c])=><div key={cat} className={`${c} rounded-lg p-2 text-center`}><div className="text-[9px] text-zinc-600 font-medium">{cat}</div></div>)}</div>
        </div>
      </div>
    </div>
  )
}
function FitnessPreview() {
  return (
    <div className="w-full h-full bg-[#0a0a0a] flex flex-col select-none">
      <nav className="flex items-center justify-between px-6 py-3 bg-[#0a0a0a] border-b border-white/5 shrink-0"><div className="flex items-center gap-2"><div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center"><span className="text-white text-[9px] font-black">F</span></div><span className="text-white font-black text-xs tracking-widest uppercase">FlexGym</span></div><div className="hidden md:flex gap-4 text-[9px] text-zinc-600 uppercase tracking-wider"><span>Angebote</span><span>Kurse</span><span className="bg-orange-500 text-white px-2.5 py-1 rounded-full font-bold tracking-normal text-[9px]">Testen</span></div></nav>
      <div className="flex-1 bg-gradient-to-br from-orange-950/30 via-[#0a0a0a] to-[#0a0a0a] px-5 py-5 flex flex-col justify-between">
        <div><div className="text-orange-400 text-[8px] uppercase tracking-widest font-bold mb-2">⚡ 1 Monat gratis</div><div className="text-white text-xl font-black uppercase tracking-tight mb-1">Stärker.<br/><span className="text-orange-400">Jeden Tag.</span></div><p className="text-zinc-600 text-[10px] mb-4">24/7 · 60+ Kurse/Woche · Modernste Geräte</p><div className="flex gap-2"><span className="bg-orange-500 text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase">Gratis testen</span></div></div>
        <div className="grid grid-cols-3 gap-2 max-w-[200px]">{[{n:'Flex',p:'29€',h:false},{n:'Pro',p:'49€',h:true},{n:'Elite',p:'79€',h:false}].map(m=><div key={m.n} className={`rounded-xl p-2.5 text-center ${m.h?'bg-orange-500':'bg-white/5 border border-white/8'}`}><div className={`text-[8px] font-bold uppercase mb-0.5 ${m.h?'text-orange-100':'text-zinc-600'}`}>{m.n}</div><div className="text-white text-sm font-black">{m.p}</div></div>)}</div>
      </div>
    </div>
  )
}

type PortfolioItem = { id: string; name: string; url: string; demoUrl?: string; Preview: () => React.JSX.Element }
const PORTFOLIO_MAP: Record<string, PortfolioItem> = {
  fahrschule: { id:'fahrschule', name:'FahrAkademie Lahr', url:'fahrakademie-lahr.de', demoUrl:'/demo/fahrschule', Preview:FahrschulePreview },
  friseur:    { id:'friseur',    name:'Studio Belle',      url:'studio-belle.de',                                  Preview:FriseurPreview    },
  restaurant: { id:'restaurant', name:'La Bella Cucina',   url:'labellacucina.de',                                 Preview:RestaurantPreview },
  boutique:   { id:'boutique',   name:'Maison K.',         url:'maison-k.de',                                      Preview:BoutiquePreview   },
  fitness:    { id:'fitness',    name:'FlexGym',           url:'flexgym.de',                                       Preview:FitnessPreview    },
}

// ─── COUNTER HOOK ─────────────────────────────────────────────────────────────

function useCounter(target: number, duration = 1800, trigger: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start = 0
    const step = duration / target
    const t = setInterval(() => {
      start += 1
      setVal(start)
      if (start >= target) clearInterval(t)
    }, step)
    return () => clearInterval(t)
  }, [trigger, target, duration])
  return val
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function LocalePage() {
  const t = useTranslations()
  const locale = useLocale()
  const plans = PLANS[locale] ?? PLANS.de

  const [mounted, setMounted] = useState(false)
  const [openPortfolio, setOpenPortfolio] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name:'', email:'', phone:'', branch:'', message:'' })
  const [formState, setFormState] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [featuresVisible, setFeaturesVisible] = useState(false)
  const featuresRef = useRef<HTMLDivElement>(null)

  // Counter targets from messages
  const features = t.raw('features.cards') as { num: string; unit: string; title: string; desc: string }[]
  const counter7  = useCounter(7,  1200, featuresVisible)
  const counter99 = useCounter(99, 1800, featuresVisible)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const el = featuresRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setFeaturesVisible(true); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (openPortfolio) {
      document.body.style.overflow = 'hidden'
      const id = requestAnimationFrame(() => setModalVisible(true))
      return () => cancelAnimationFrame(id)
    } else {
      document.body.style.overflow = ''
      const id = requestAnimationFrame(() => setModalVisible(false))
      return () => cancelAnimationFrame(id)
    }
  }, [openPortfolio])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenPortfolio(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(formData) })
      setFormState(res.ok ? 'success' : 'error')
    } catch { setFormState('error') }
  }

  const activePortfolio = openPortfolio ? PORTFOLIO_MAP[openPortfolio] : null
  const trust = t.raw('hero.trust') as string[]
  const steps = t.raw('steps.items') as { n:string; t:string; d:string }[]
  const faqItems = t.raw('faq.items') as { q:string; a:string }[]
  const contactSteps = t.raw('contact.steps') as { t:string; d:string }[]
  const branches = t.raw('contact.branches') as string[]
  const categories = t.raw('portfolio.categories') as { id:string; icon:string; label:string; hint:string }[]

  // Word stagger for hero headline
  const t1words = t('hero.t1').split(' ')
  const t2words = t('hero.t2').split(' ')
  const allWords = [...t1words, ...t2words]

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased overflow-x-hidden relative flex flex-col selection:bg-zinc-200">

      {/* Background particles + gradient */}
      <div className="hero-bg pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-zinc-200/50 to-transparent rounded-full blur-[120px]" />
        <div className={`absolute top-[6%] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-amber-200/25 via-zinc-200/35 to-slate-300/25 rounded-full blur-[90px] transition-all duration-[2500ms] ${mounted ? 'opacity-100 scale-105' : 'opacity-0 scale-90'}`} />
        <span className="particle particle-1" aria-hidden="true" />
        <span className="particle particle-2" aria-hidden="true" />
        <span className="particle particle-3" aria-hidden="true" />
        <span className="particle particle-4" aria-hidden="true" />
        <span className="particle particle-5" aria-hidden="true" />
        <span className="particle particle-6" aria-hidden="true" />
      </div>

      {/* Lang switcher (fixed top-right) */}
      <LangSwitcher />

      {/* ── NAV ───────────────────────────────────────────────────────────── */}
      <nav className={`sticky top-0 z-40 w-full backdrop-blur-xl bg-white/70 border-b border-zinc-100/80 px-5 md:px-12 py-3.5 flex justify-between items-center transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-5 h-2 bg-[#1d1d1f] rounded-sm transition-transform duration-500 group-hover:scale-x-125" />
          <span className={`${serif.className} italic font-semibold text-base tracking-wider pl-1`}>Minuz</span>
        </div>
        <div className="hidden md:flex gap-7 text-[12px] font-medium text-zinc-500 tracking-wide pr-28">
          <a href="#leistungen" className="hover:text-black transition-colors">{t('nav.services')}</a>
          <a href="#portfolio"  className="hover:text-black transition-colors">{t('nav.portfolio')}</a>
          <a href="#preise"     className="hover:text-black transition-colors">{t('nav.pricing')}</a>
          <a href="#kontakt"    className="hover:text-black transition-colors">{t('nav.contact')}</a>
        </div>
      </nav>

      {/* ── HERO (exactly 100dvh, no overflow) ────────────────────────────── */}
      <section className="h-[calc(100dvh-57px)] flex flex-col items-center justify-center text-center px-4 relative z-10 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">

          {/* Badge */}
          <div className={`flex justify-center mb-4 md:mb-5 ${mounted ? 'animate-fade-in-up stagger-0' : 'opacity-0'}`}>
            <div className="border border-zinc-200/80 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[11px] font-medium text-zinc-500 tracking-wide">{t('hero.badge')}</span>
            </div>
          </div>

          {/* Logo box */}
          <div className={`flex justify-center mb-4 md:mb-6 relative ${mounted ? 'animate-scale-in stagger-1' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200/15 to-zinc-200/15 blur-2xl rounded-[24px]" />
            <div className="relative border border-zinc-200/60 bg-white/60 backdrop-blur-xl px-10 md:px-16 py-3.5 md:py-5 rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)] transition-shadow duration-500">
              <span className={`${serif.className} italic font-semibold text-3xl md:text-5xl tracking-[0.25em] translate-x-[0.12em] inline-block bg-gradient-to-b from-zinc-800 to-zinc-500 bg-clip-text text-transparent select-none`}>
                MINUZ
              </span>
            </div>
          </div>

          {/* Staggered headline */}
          <h1 className="text-[clamp(1.8rem,5vw,4.5rem)] font-semibold tracking-tight text-[#1d1d1f] leading-[1.12] mb-3 md:mb-4">
            {t1words.map((word, i) => (
              <span key={i} className={`inline-block mr-[0.25em] last:mr-0 ${mounted ? `animate-fade-in-up stagger-${Math.min(i + 2, 7)}` : 'opacity-0'}`}>
                {word}
              </span>
            ))}
            <br />
            <span className="bg-gradient-to-b from-zinc-500 to-zinc-900 bg-clip-text text-transparent">
              {t2words.map((word, i) => (
                <span key={i} className={`inline-block mr-[0.25em] last:mr-0 ${mounted ? `animate-fade-in-up stagger-${Math.min(i + t1words.length + 2, 7)}` : 'opacity-0'}`}>
                  {word}
                </span>
              ))}
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-zinc-500 text-xs md:text-base max-w-xs md:max-w-xl mx-auto mb-5 md:mb-7 leading-relaxed ${mounted ? 'animate-fade-in-up stagger-6' : 'opacity-0'}`}>
            {t('hero.sub')}
          </p>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row gap-2.5 justify-center w-full mb-5 md:mb-7 ${mounted ? 'animate-fade-in-up stagger-7' : 'opacity-0'}`}>
            <a href="#portfolio" className="group bg-[#1d1d1f] text-white font-medium px-7 md:px-10 py-3 md:py-3.5 rounded-full text-xs md:text-sm hover:bg-black transition-all shadow-md hover:shadow-lg hover:scale-[1.02] text-center flex items-center justify-center gap-1.5">
              {t('hero.cta1')}<span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a href="#preise" className="text-zinc-700 font-medium px-7 md:px-10 py-3 md:py-3.5 text-xs md:text-sm rounded-full border border-zinc-200 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-zinc-300 hover:text-black transition-all text-center hover:scale-[1.02]">
              {t('hero.cta2')}
            </a>
          </div>

          {/* Trust signals */}
          <div className={`flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-1.5 ${mounted ? 'animate-fade-in-up stagger-7' : 'opacity-0'}`} style={{ animationDelay: '700ms' }}>
            {trust.map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-[11px] md:text-[12px] text-zinc-400 font-medium">
                <span className="text-emerald-500 font-bold">✓</span>{item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES (counter animation) ──────────────────────────────────── */}
      <section id="leistungen" className="w-full border-t border-zinc-100 py-24 md:py-32 relative z-10" ref={featuresRef}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center space-y-4 mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 block">{t('features.label')}</span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f]">{t('features.h2')}</h2>
            <p className="text-zinc-500 text-sm md:text-base max-w-sm mx-auto">{t('features.p')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((card, i) => {
              const displayNum = i === 0 ? (featuresVisible ? counter7 : 0)
                : i === 1 ? (featuresVisible ? counter99 : 0)
                : card.num
              return (
                <div key={i} className={`rounded-[28px] p-8 transition-all duration-500 hover:-translate-y-1.5 ${i === 1 ? 'bg-[#1d1d1f] text-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)]' : 'bg-white border border-zinc-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)]'}`}>
                  <div className={`text-5xl font-bold tracking-tight mb-0.5 ${i===1?'text-white':'text-[#1d1d1f]'}`}>
                    {typeof displayNum === 'number' ? displayNum : card.num}
                  </div>
                  <div className={`text-xs font-semibold uppercase tracking-widest mb-6 ${i===1?'text-zinc-500':'text-zinc-400'}`}>{card.unit}</div>
                  <h3 className={`text-lg font-semibold mb-2.5 ${i===1?'text-white':'text-[#1d1d1f]'}`}>{card.title}</h3>
                  <p className={`text-sm leading-relaxed ${i===1?'text-zinc-400':'text-zinc-400'}`}>{card.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ─────────────────────────────────────────────────────── */}
      <section id="portfolio" className="w-full border-t border-zinc-100 py-24 md:py-32 relative z-10">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center space-y-4 mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 block">{t('portfolio.label')}</span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f]">{t('portfolio.h2')}</h2>
            <p className="text-zinc-500 text-sm md:text-base max-w-lg mx-auto">{t('portfolio.p')}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map(cat => (
              <button type="button" key={cat.id} onClick={() => setOpenPortfolio(cat.id)}
                className="group flex items-center gap-3 bg-white border border-zinc-200/70 hover:border-zinc-400 rounded-[20px] px-5 md:px-7 py-3.5 md:py-5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.09)] transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <span className="text-2xl md:text-3xl">{cat.icon}</span>
                <div className="text-left">
                  <div className="text-sm md:text-base font-semibold text-[#1d1d1f]">{cat.label}</div>
                  <div className="text-[10px] text-zinc-400 group-hover:text-zinc-600 transition-colors">{cat.hint}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO MODAL ───────────────────────────────────────────────── */}
      {openPortfolio && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-3 md:p-8 transition-all duration-300 ${modalVisible ? 'bg-black/65 backdrop-blur-sm' : 'bg-transparent'}`}
          onClick={e => { if (e.target === e.currentTarget) setOpenPortfolio(null) }}
        >
          <div className={`w-full max-w-5xl bg-white rounded-[24px] overflow-hidden shadow-2xl shadow-black/30 flex flex-col max-h-[90vh] transition-all duration-300 ${modalVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'}`}>
            <div className="flex items-center gap-2 px-4 py-3 bg-[#f5f5f7] border-b border-zinc-200/50 shrink-0">
              <button type="button" onClick={() => setOpenPortfolio(null)} aria-label="Close" className="flex gap-1.5 group/d">
                <div className="w-3 h-3 rounded-full bg-rose-400 group-hover/d:bg-rose-500 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </button>
              <div className="flex-1 mx-4 bg-white/90 rounded-lg py-1 px-4 text-[11px] text-zinc-500 font-mono border border-zinc-200/60 text-center truncate">
                🔒 {activePortfolio?.url}
              </div>
              <div className="w-16" />
            </div>
            <div className="flex-1 overflow-hidden min-h-[320px] max-h-[65vh]">
              {activePortfolio && <activePortfolio.Preview />}
            </div>
            <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-zinc-100 shrink-0 flex-wrap gap-2">
              <div>
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider">{categories.find(c => c.id === openPortfolio)?.label}</div>
                <div className="text-base font-semibold text-[#1d1d1f] mt-0.5">{activePortfolio?.name}</div>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap justify-end">
                <button type="button" onClick={() => setOpenPortfolio(null)} className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors">{t('portfolio.close')}</button>
                {activePortfolio?.demoUrl && (
                  <a href={activePortfolio.demoUrl} target="_blank" rel="noopener noreferrer"
                    className="border border-zinc-200 text-zinc-700 text-sm font-medium px-5 py-2.5 rounded-full hover:border-zinc-400 hover:text-black transition-colors whitespace-nowrap">
                    {t('portfolio.demoBtn')}
                  </a>
                )}
                <a href="#kontakt" onClick={() => setOpenPortfolio(null)}
                  className="bg-[#1d1d1f] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-black transition-colors whitespace-nowrap">
                  {t('portfolio.modalCta')}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="w-full border-t border-zinc-100 py-24 md:py-32 bg-[#f5f5f7]/50 relative z-10">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 block">{t('steps.label')}</span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f]">{t('steps.h2')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-center justify-center mb-5 transition-all duration-300 group-hover:shadow-[0_10px_32px_rgba(0,0,0,0.08)] group-hover:-translate-y-1">
                  <span className="text-[11px] font-bold text-zinc-400 font-mono">{step.n}</span>
                </div>
                <h3 className="text-base font-semibold text-[#1d1d1f] mb-2">{step.t}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="w-full border-t border-zinc-100 py-24 md:py-32 relative z-10">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 block">{t('testimonials.label')}</span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f]">{t('testimonials.h2')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((tm, i) => (
              <div key={i} className="bg-white border border-zinc-200/60 rounded-[24px] p-7 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 flex flex-col gap-5">
                <div className="flex gap-0.5">{[1,2,3,4,5].map(s=><span key={s} className="text-amber-400 text-sm">★</span>)}</div>
                <p className="text-zinc-600 text-sm leading-relaxed flex-1">&ldquo;{tm.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2 border-t border-zinc-100">
                  <div className={`w-9 h-9 ${tm.color} rounded-full flex items-center justify-center text-xs font-bold shrink-0`}>{tm.initials}</div>
                  <div><div className="text-sm font-semibold text-[#1d1d1f]">{tm.name}</div><div className="text-[11px] text-zinc-400">{tm.biz}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <section id="preise" className="w-full border-t border-zinc-100 py-24 md:py-32 bg-[#f5f5f7]/40 relative z-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[12%] left-[6%] w-3 h-9 bg-amber-400/35 rounded-full rotate-[25deg]" />
          <div className="absolute top-[25%] left-[13%] w-4 h-4 bg-rose-400/30 rounded-sm rotate-[45deg]" />
          <div className="absolute top-[10%] right-[9%] w-5 h-3 bg-zinc-400/40 rounded-full -rotate-[35deg]" />
          <div className="absolute top-[35%] right-[5%] w-4 h-4 bg-amber-400/35 rounded-full" />
          <div className="absolute bottom-[15%] right-[4%] w-5 h-5 bg-zinc-300/40 rounded-sm -rotate-[20deg]" />
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 block">{t('pricing.label')}</span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f]">{t('pricing.h2')}</h2>
            <p className="text-zinc-500 text-sm md:text-base max-w-md mx-auto">{t('pricing.p')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
            {plans.map((plan, i) => (
              <div key={i} className={`rounded-[28px] p-8 flex flex-col relative transition-all duration-500 ${plan.highlight ? 'bg-white border-2 border-[#1d1d1f] shadow-[0_12px_48px_rgba(0,0,0,0.06)] hover:scale-[1.01] z-10' : 'bg-white border border-zinc-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.05)] hover:-translate-y-1'}`}>
                {plan.promo && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1d1d1f] text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-full whitespace-nowrap">{plan.promo}</div>}
                <div className="space-y-5 flex-1">
                  <span className={`text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full inline-block ${plan.highlight ? 'text-amber-600 bg-amber-50' : 'text-zinc-400 bg-zinc-100'}`}>{plan.badge}</span>
                  <div><h3 className="text-xl font-semibold text-[#1d1d1f]">{plan.name}</h3><p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">{plan.desc}</p></div>
                  <div className="pt-4 border-t border-zinc-100"><span className="text-zinc-400 text-sm line-through block">{plan.old}</span><div className="flex items-baseline gap-1 mt-0.5"><span className={`font-semibold text-[#1d1d1f] ${plan.highlight ? 'text-4xl font-bold' : 'text-3xl'}`}>{plan.price}</span><span className="text-xs text-zinc-400">{plan.per}</span></div></div>
                  <ul className="space-y-2.5 text-xs pt-1">{plan.features.map((f, j) => (<li key={j} className={`flex items-start gap-2 ${plan.highlight ? 'font-medium text-zinc-700' : 'text-zinc-500'}`}><span className="text-emerald-500 font-bold mt-0.5 shrink-0">✓</span>{f}</li>))}</ul>
                </div>
                <a href="#kontakt" className={`w-full text-center font-medium py-3 rounded-full text-xs transition-all duration-300 mt-8 block ${plan.highlight ? 'bg-[#1d1d1f] text-white hover:bg-black shadow-md' : 'border border-zinc-200 text-[#1d1d1f] hover:border-zinc-400'}`}>{plan.cta}</a>
              </div>
            ))}
          </div>
          <p className="text-center text-[11px] text-zinc-400 mt-10">{t('pricing.note')}</p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="w-full border-t border-zinc-100 py-24 md:py-32 relative z-10">
        <div className="max-w-2xl mx-auto px-6 md:px-12">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 block">{t('faq.label')}</span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f]">{t('faq.h2')}</h2>
          </div>
          <div className="divide-y divide-zinc-100">
            {faqItems.map((item, i) => (
              <div key={i}>
                <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4">
                  <span className="font-medium text-[#1d1d1f] text-sm md:text-base">{item.q}</span>
                  <span className={`text-zinc-400 text-sm shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>▾</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-48 pb-5' : 'max-h-0'}`}>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section id="kontakt" className="w-full border-t border-zinc-100 py-24 md:py-32 bg-[#f5f5f7]/40 relative z-10">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-10">
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 block mb-4">{t('contact.label')}</span>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] leading-snug whitespace-pre-line">{t('contact.h2')}</h2>
                <p className="text-zinc-500 text-sm md:text-base mt-4 leading-relaxed">{t('contact.p')}</p>
              </div>
              <div>
                <div className="text-xs font-semibold tracking-[0.15em] uppercase text-zinc-400 mb-5">{t('contact.stepsTitle')}</div>
                <div className="space-y-5">
                  {contactSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-7 h-7 rounded-full bg-[#1d1d1f] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i+1}</div>
                      <div><div className="text-sm font-semibold text-[#1d1d1f]">{step.t}</div><div className="text-xs text-zinc-400 mt-0.5">{step.d}</div></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-zinc-200 pt-8 space-y-3">
                <div className="text-xs font-semibold tracking-[0.15em] uppercase text-zinc-400 mb-4">{t('contact.orTitle')}</div>
                <a href="https://wa.me/4915201234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-zinc-600 hover:text-black transition-colors group">
                  <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 group-hover:scale-105 transition-transform">W</div>
                  <span>WhatsApp</span>
                </a>
                <a href="mailto:ibrahimmertminuz@gmail.com" className="flex items-center gap-3 text-sm text-zinc-600 hover:text-black transition-colors group">
                  <div className="w-9 h-9 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 text-sm shrink-0 group-hover:bg-zinc-200 transition-colors">✉</div>
                  <span>ibrahimmertminuz@gmail.com</span>
                </a>
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-md border border-zinc-200/70 rounded-[28px] p-7 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.03)]">
              {formState === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-12 gap-5">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-3xl">✓</div>
                  <h3 className="text-xl font-semibold text-[#1d1d1f]">{t('contact.successTitle')} 🎉</h3>
                  <p className="text-zinc-500 text-sm max-w-xs">{t('contact.successDesc')}</p>
                  <button type="button" onClick={() => setFormState('idle')} className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors mt-2 underline underline-offset-2">{t('contact.newRequest')}</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-zinc-500 mb-1.5 pl-1">{t('contact.nameLabel')}</label>
                      <input type="text" required placeholder={t('contact.namePlaceholder')} value={formData.name} onChange={e=>setFormData(d=>({...d,name:e.target.value}))} className="w-full bg-white/80 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-[#1d1d1f] placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1.5 pl-1">{t('contact.emailLabel')}</label>
                      <input type="email" required placeholder={t('contact.emailPlaceholder')} value={formData.email} onChange={e=>setFormData(d=>({...d,email:e.target.value}))} className="w-full bg-white/80 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-[#1d1d1f] placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1.5 pl-1">{t('contact.phoneLabel')}</label>
                      <input type="tel" placeholder={t('contact.phonePlaceholder')} value={formData.phone} onChange={e=>setFormData(d=>({...d,phone:e.target.value}))} className="w-full bg-white/80 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-[#1d1d1f] placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-zinc-500 mb-1.5 pl-1">{t('contact.branchLabel')}</label>
                      <select value={formData.branch} onChange={e=>setFormData(d=>({...d,branch:e.target.value}))} title={t('contact.branchLabel')} aria-label={t('contact.branchLabel')} className="w-full bg-white/80 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-[#1d1d1f] focus:outline-none focus:border-zinc-400 focus:bg-white transition-all appearance-none cursor-pointer">
                        {branches.map((b,i) => <option key={b} value={i===0?'':b}>{b}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-zinc-500 mb-1.5 pl-1">{t('contact.msgLabel')}</label>
                      <textarea rows={3} placeholder={t('contact.msgPlaceholder')} value={formData.message} onChange={e=>setFormData(d=>({...d,message:e.target.value}))} className="w-full bg-white/80 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-[#1d1d1f] placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all resize-none" />
                    </div>
                  </div>
                  {formState === 'error' && <p className="text-rose-500 text-xs text-center">{t('contact.errorDesc')}</p>}
                  <button type="submit" disabled={formState === 'loading'}
                    className="w-full bg-[#1d1d1f] text-white font-medium py-3.5 rounded-xl text-sm hover:bg-black transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {formState === 'loading' ? (<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Senden...</span></>) : t('contact.submit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="w-full py-8 border-t border-zinc-100 px-6 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-zinc-400">
          <div className="flex items-center gap-2">
            <span className={`${serif.className} italic font-semibold text-sm text-zinc-600`}>Minuz</span>
            <span>·</span>
            <span>© {new Date().getFullYear()} MINUZ Studio. {t('footer')}</span>
          </div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-zinc-700 transition-colors">Impressum</a>
            <a href="#" className="hover:text-zinc-700 transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-zinc-700 transition-colors">AGB</a>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ─────────────────────────────────────────────── */}
      <a href="https://wa.me/4915201234567" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 hover:bg-emerald-400 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-all duration-300 wa-pulse-btn">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </main>
  )
}
