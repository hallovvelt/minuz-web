"use client"
import { useEffect, useState } from "react"
import { Cormorant_Garamond } from "next/font/google"

const luxuryFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["italic", "normal"]
})

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Anfrage empfangen: ${name} - ${email}`)
  }

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans antialiased overflow-x-hidden relative flex flex-col justify-between selection:bg-zinc-200">
      
      {/* 🎭 SPOTLIGHT EFFECT */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1400px] h-[700px] bg-gradient-to-b from-zinc-200/60 via-white to-transparent rounded-full blur-[140px] pointer-events-none z-0" />
      
      <div 
        className={`absolute top-[8%] left-1/2 -translate-x-1/2 w-[700px] md:w-[1000px] h-[500px] bg-gradient-to-tr from-amber-200/35 via-zinc-200/50 to-slate-300/40 rounded-full blur-[110px] pointer-events-none z-0 transition-all duration-[2000ms] ease-out ${
          mounted ? "opacity-100 scale-105" : "opacity-0 scale-95"
        }`} 
      />

      {/* NAVIGATION */}
      <nav className={`sticky top-0 z-50 w-full backdrop-blur-md bg-white/60 border-b border-zinc-100/80 px-6 md:px-12 py-3.5 flex justify-between items-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}>
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-5 h-2 bg-[#1d1d1f] rounded-[3px] transition-transform duration-500 group-hover:scale-x-125" />
          <span className={`${luxuryFont.className} italic font-semibold text-base text-[#1d1d1f] tracking-wider pl-1`}>Minuz</span>
        </div>
        <div className="flex gap-6 md:gap-8 text-[12px] font-medium text-zinc-500 tracking-wide">
          <a href="#leistungen" className="hover:text-black transition-colors duration-300">Leistungen</a>
          <a href="#preise" className="hover:text-black transition-colors duration-300">Preise</a>
          <a href="#kontakt" className="hover:text-black transition-colors duration-300">Kontakt</a>
        </div>
      </nav>

      {/* 📱 HERO SECTION */}
      <section className="h-[calc(100dvh-70px)] flex flex-col items-center justify-center text-center px-4 relative z-10">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center my-auto py-2">
          
          <div className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
          }`}>
            <div className="flex justify-center mb-6 md:mb-8 relative group cursor-default">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-zinc-200/20 blur-xl rounded-[24px]" />
              <div className="relative border border-white bg-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.02)] backdrop-blur-xl px-14 md:px-18 py-5 md:py-6 rounded-[24px] transition-all duration-500 hover:border-zinc-300 hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.05)]">
                <span className={`${luxuryFont.className} font-semibold text-4xl md:text-5xl tracking-[0.25em] translate-x-[0.12em] inline-block select-none bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-600 bg-clip-text text-transparent`}>
                  <i>MINUZ</i>
                </span>
              </div>
            </div>
          </div>

          <h1 className={`text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight text-[#1d1d1f] leading-[1.15] mb-4 md:mb-6 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            Moderne Websites.
            <span className="block bg-gradient-to-b from-zinc-400 via-zinc-600 to-zinc-900 bg-clip-text text-transparent mt-1 md:mt-2">
              Für lokale Geschäfte.
            </span>
          </h1>

          <p className={`text-zinc-500 text-sm md:text-lg font-normal tracking-wide max-w-sm md:max-w-md mx-auto mb-8 md:mb-10 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[400ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            Schnell. Mehrsprachig. Ultra-Premium.
          </p>

          <div className={`flex flex-row gap-3 md:gap-4 justify-center items-center w-full transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[600ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <a href="#preise" className="flex-1 sm:flex-none bg-[#1d1d1f] text-white font-medium px-6 md:px-10 py-3.5 rounded-full text-xs md:text-sm hover:bg-black transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-98 text-center whitespace-nowrap">
              Tarife ansehen
            </a>
            <a href="#leistungen" className="flex-1 sm:flex-none group text-zinc-700 font-medium px-6 md:px-10 py-3.5 text-xs md:text-sm rounded-full border border-zinc-200 bg-white/40 backdrop-blur-sm hover:bg-white hover:border-zinc-400 hover:text-black transition-all duration-300 flex items-center justify-center gap-1 hover:scale-[1.02] active:scale-98 whitespace-nowrap">
              Mehr erfahren 
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

        </div>
      </section>

      {/* 🏛️ FEATURE SECTION (Yenilenen Grafik Alanı) */}
      <section id="leistungen" className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 relative z-10 border-t border-zinc-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          
          <div className="space-y-6 text-left">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 block">Der neue Standard</span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] leading-tight">
              Ihre Vision.<br /> Unsere digitale Kunst.
            </h2>
            <p className="text-zinc-500 text-base md:text-lg leading-relaxed font-normal">
              Wir bringen Ihr lokales Geschäft auf die luxuriöseste Straße des Internets. Mit voll optimierten, ultraschnellen Designs binden wir Ihre Kunden auf den ersten Blick.
            </p>
            <div className="pt-6 space-y-4 border-t border-zinc-200/60">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#1d1d1f] rounded-full mt-2.5" />
                <div>
                  <h4 className="font-medium text-sm text-[#1d1d1f]">Blitzschnelle Performance</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Ihre Kunden warten nicht. Ihre Seiten laden in Millisekunden.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#1d1d1f] rounded-full mt-2.5" />
                <div>
                  <h4 className="font-medium text-sm text-[#1d1d1f]">Globale Infrastruktur</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Mehrsprachig und bereit für maximales Kundenwachstum.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 💻 YENİLENEN LÜKS SAAS PANEL SİMÜLASYONU (Boş M Harfi Kaldırıldı) */}
          <div className="relative w-full aspect-[4/3] rounded-[24px] border border-white bg-gradient-to-br from-zinc-100 to-zinc-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.03)] backdrop-blur-md p-2 flex items-center justify-center group overflow-hidden">
            <div className="w-full h-full bg-white/90 border border-zinc-200/40 rounded-[18px] shadow-inner flex flex-col justify-between p-5 transition-transform duration-700 group-hover:scale-[1.01]">
              
              {/* Browser Bar */}
              <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-rose-400/80 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-amber-400/80 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-emerald-400/80 rounded-full" />
                </div>
                <div className="text-[10px] text-zinc-400 font-mono bg-zinc-50 px-6 py-0.5 rounded-md border border-zinc-100">minuz.studio/dashboard</div>
                <div className="w-4 h-4 rounded-full bg-zinc-100" />
              </div>

              {/* Premium Dashboard Verileri */}
              <div className="flex-1 grid grid-cols-3 gap-3 pt-4">
                {/* Sol Küçük Kartlar */}
                <div className="col-span-2 space-y-3">
                  <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-xl p-4 text-white space-y-1 shadow-sm">
                    <span className="text-[9px] text-zinc-400 uppercase tracking-wider block">Live-Besucher</span>
                    <div className="text-2xl font-semibold font-mono tracking-tight">1.420 +</div>
                    <div className="text-[9px] text-emerald-400 flex items-center gap-1">↑ +24% diese Woche</div>
                  </div>
                  <div className="border border-zinc-200/60 bg-white/50 rounded-xl p-3.5 space-y-2">
                    <div className="h-2 bg-zinc-200 rounded-full w-1/3" />
                    <div className="space-y-1.5">
                      <div className="h-1.5 bg-zinc-100 rounded-full w-full" />
                      <div className="h-1.5 bg-zinc-100 rounded-full w-5/6" />
                    </div>
                  </div>
                </div>

                {/* Sağ Dairesel Performans Grafiği (Lüks CSS Çizimi) */}
                <div className="border border-zinc-200/60 bg-white/50 rounded-xl p-3 flex flex-col items-center justify-center relative">
                  <div className="w-16 h-16 rounded-full border-4 border-zinc-100 border-t-zinc-900 animate-spin-slow flex items-center justify-center">
                    <span className="text-[10px] font-bold font-mono text-zinc-800">99%</span>
                  </div>
                  <span className="text-[9px] font-medium text-zinc-400 mt-2 text-center block">PageSpeed Score</span>
                </div>
              </div>

              {/* Alt Satır Grafik Çizgisi */}
              <div className="border-t border-zinc-100 pt-3 flex justify-between items-center text-[10px] text-zinc-400">
                <span className="font-medium text-zinc-800">MINUZ Premium Engine</span>
                <div className="flex gap-2 font-mono">
                  <span>SEO: 100</span>
                  <span className="text-emerald-600">✓ Aktiv</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 🏷️ PRICING SECTION (Çok Daha Belirgin ve Bol Konfetili) */}
      <section id="preise" className="w-full py-24 md:py-32 border-t border-zinc-100 bg-[#f5f5f7]/40 relative overflow-hidden z-10">
        
        {/* 🎉 ÇOĞALTILMIŞ VE BÜYÜTÜLMÜŞ LÜKS KONFETİ PARÇACIKLARI */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Sol Taraf Konfetileri */}
          <div className="absolute top-[10%] left-[5%] w-4 h-10 bg-amber-400/40 rounded-full rotate-[25deg] blur-[0.5px]" />
          <div className="absolute top-[22%] left-[12%] w-5 h-5 bg-rose-400/35 rounded-sm rotate-[45deg]" />
          <div className="absolute top-[45%] left-[3%] w-3 h-8 bg-zinc-400/40 rounded-full -rotate-[15deg]" />
          <div className="absolute top-[65%] left-[14%] w-6 h-3 bg-amber-300/40 rounded-full rotate-[60deg]" />
          <div className="absolute bottom-[10%] left-[8%] w-4 h-4 bg-zinc-500/30 rounded-sm rotate-[12deg] blur-[1px]" />

          {/* Sağ Taraf Konfetileri */}
          <div className="absolute top-[8%] right-[8%] w-6 h-4 bg-zinc-400/50 rounded-full -rotate-[35deg]" />
          <div className="absolute top-[28%] right-[4%] w-5 h-5 bg-amber-400/40 rounded-full blur-[1px]" />
          <div className="absolute top-[50%] right-[11%] w-4 h-9 bg-rose-400/40 rounded-full rotate-[40deg]" />
          <div className="absolute top-[70%] right-[3%] w-6 h-6 bg-zinc-300/50 rounded-sm -rotate-[20deg]" />
          <div className="absolute bottom-[12%] right-[12%] w-5 h-2 bg-amber-400/50 rounded-full rotate-[15deg]" />

          {/* Orta Yoğunlaşma Alanları */}
          <div className="absolute top-[15%] left-[45%] w-3 h-7 bg-rose-300/40 rounded-full -rotate-[65deg]" />
          <div className="absolute top-[75%] left-[35%] w-5 h-5 bg-amber-200/50 rounded-sm rotate-[55deg]" />
          <div className="absolute bottom-[5%] left-[50%] w-4 h-8 bg-zinc-400/30 rounded-full rotate-[85deg]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 block">Transparente Preise</span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f]">
              Ein unschlagbares Angebot.
            </h2>
            <p className="text-zinc-500 text-sm md:text-base max-w-md mx-auto">
              Keine versteckten Kosten. Volle Flexibilität für Ihr lokales Geschäft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            
            {/* 1. PLAN: ESSENTIAL */}
            <div className="bg-white border border-zinc-200/60 rounded-[28px] p-8 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.01)] transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1">
              <div className="space-y-6">
                <span className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase bg-zinc-100 px-3 py-1 rounded-full inline-block">Essential</span>
                <h3 className="text-xl font-semibold text-[#1d1d1f]">Minuz Start</h3>
                <p className="text-xs text-zinc-400">Perfekt für kleinere Boutiken, dükkanlar und digitale Visitenkarten.</p>
                
                <div className="pt-4 border-t border-zinc-100">
                  <span className="text-zinc-400 text-sm line-through block">39 €</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-semibold text-[#1d1d1f]">25 €</span>
                    <span className="text-xs text-zinc-400 font-medium">/ Monat *</span>
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-zinc-500 pt-2">
                  <li className="flex items-center gap-2">✓ Premium Design & Hosting</li>
                  <li className="flex items-center gap-2">✓ Google Business Setup</li>
                  <li className="flex items-center gap-2 text-zinc-400">⚡ 30 Tage Testrecht</li>
                </ul>
              </div>
              <a href="#kontakt" className="w-full border border-zinc-200 text-[#1d1d1f] text-center font-medium py-3 rounded-full text-xs hover:border-zinc-400 transition-colors duration-300 mt-8 block">
                Jetzt starten
              </a>
            </div>

            {/* 2. PLAN: STUDIO PRO (KAMPANYALI ANA PLAN) */}
            <div className="bg-white border-2 border-[#1d1d1f] rounded-[28px] p-8 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.04)] relative transition-all duration-500 hover:scale-[1.01] z-10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1d1d1f] text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-full shadow-sm">
                AKTION
              </div>

              <div className="space-y-6">
                <span className="text-[11px] font-bold tracking-wider text-amber-600 uppercase bg-amber-50 px-3 py-1 rounded-full inline-block">Meistgewählt</span>
                <h3 className="text-xl font-semibold text-[#1d1d1f]">Minuz Studio Pro</h3>
                <p className="text-xs text-zinc-400">Die ultimative SaaS-Lösung für maximale Kundenbindung und lüks Performance.</p>
                
                <div className="pt-4 border-t border-zinc-100">
                  <span className="text-zinc-400 text-sm line-through block font-medium">70 €</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-4xl font-bold text-[#1d1d1f]">50 €</span>
                    <span className="text-xs text-zinc-400 font-medium">/ Monat *</span>
                  </div>
                </div>

                <ul className="space-y-3 text-xs font-medium text-zinc-600 pt-2">
                  <li className="flex items-center gap-2 text-emerald-600 font-semibold">💎 0 € Setup (Für die ersten Kunden kostenlos)</li>
                  <li className="flex items-center gap-2 text-indigo-600 font-semibold">🛡️ 30 Tage Kündigungsrecht (Ohne Risiko)</li>
                  <li className="flex items-center gap-2">✓ Ultra-Premium & Mehrsprachig</li>
                  <li className="flex items-center gap-2">✓ Volle SEO & Google Maps Optimierung</li>
                </ul>
              </div>
              <a href="#kontakt" className="w-full bg-[#1d1d1f] text-white text-center font-medium py-3 rounded-full text-xs hover:bg-black transition-all duration-300 shadow-md mt-8 block">
                Angebot sichern
              </a>
            </div>

            {/* 3. PLAN: CUSTOM */}
            <div className="bg-white border border-zinc-200/60 rounded-[28px] p-8 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.01)] transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1">
              <div className="space-y-6">
                <span className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase bg-zinc-100 px-3 py-1 rounded-full inline-block">Exclusive</span>
                <h3 className="text-xl font-semibold text-[#1d1d1f]">Minuz Custom</h3>
                <p className="text-xs text-zinc-400">Für Unternehmen mit mehreren Standorten oder individuellen Automatisierungen.</p>
                
                <div className="pt-4 border-t border-zinc-100">
                  <span className="text-zinc-400 text-sm line-through block">139 €</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-semibold text-[#1d1d1f]">99 €</span>
                    <span className="text-xs text-zinc-400 font-medium">/ Monat *</span>
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-zinc-500 pt-2">
                  <li className="flex items-center gap-2">✓ Unbegrenzte Seitenanzahl</li>
                  <li className="flex items-center gap-2">✓ Custom E-Commerce / Buchungssystem</li>
                  <li className="flex items-center gap-2">✓ 24/7 VIP-Support</li>
                </ul>
              </div>
              <a href="#kontakt" className="w-full border border-zinc-200 text-[#1d1d1f] text-center font-medium py-3 rounded-full text-xs hover:border-zinc-400 transition-colors duration-300 mt-8 block">
                Kontaktieren Sie uns
              </a>
            </div>

          </div>

          <p className="text-center text-[11px] text-zinc-400 mt-10">
            * Basierend auf jährlicher Abrechnung. Alle Preise zzgl. MwSt. Für die ersten Kunden entfällt die Einrichtungsgebühr vollständig.
          </p>
        </div>
      </section>

      {/* 📬 KONTAKT SECTION */}
      <section id="kontakt" className="w-full max-w-3xl mx-auto px-6 py-24 relative z-10 text-center">
        <div className="space-y-4 mb-10">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 block">Kontakt</span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f]">
            Machen Sie den nächsten Schritt.
          </h2>
          <p className="text-zinc-400 text-sm max-w-md mx-auto">
            Sichern Sie sich Ihren Aktionspreis und reservieren Sie Ihren Platz für ein ultra-premium digitales Upgrade.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white/50 border border-zinc-200/80 backdrop-blur-md rounded-[24px] p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] space-y-4 text-left">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5 pl-1">Name / Firma</label>
            <input 
              type="text" 
              required
              placeholder="z.B. Bäckerei Schmidt, Boutique Hotel..." 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/80 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-[#1d1d1f] placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5 pl-1">E-Mail-Adresse</label>
            <input 
              type="email" 
              required
              placeholder="beispiel@firma.de" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/80 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-[#1d1d1f] placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all duration-300"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-[#1d1d1f] text-white font-medium py-3.5 rounded-xl text-sm hover:bg-black transition-all duration-300 shadow-md mt-2 text-center block"
          >
            Angebot anfordern
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-6 text-center text-[10px] md:text-[11px] text-zinc-400 border-t border-zinc-100 px-6 relative z-10">
        <p>© {new Date().getFullYear()} MINUZ Studio. Alle Rechte vorbehalten.</p>
      </footer>

    </main>
  )
}