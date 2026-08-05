import Image from 'next/image'
import { ArrowUpRight, CalendarDays, Check, MapPin, ShieldCheck, Sparkles } from 'lucide-react'

const CERAMIC_BOOKING_URL = '/find-your-package'

export const metadata = {
  title: 'Seattle Ceramic Coating Special | Limitless Auto Detailing',
  description: 'Full paint correction, a two-year ceramic coating, windshield coating, and complimentary interior detail in Seattle for $649. Weekend appointments only.',
}

const included = [
  'Full paint correction to refine the finish',
  'Two-year ceramic coating applied correctly',
  'Windshield coating included',
  'Complimentary interior detail',
  'Easy-wash gloss and paint protection for years',
  'Application and final finish inspection',
]

export default function SeattleCeramicCoatingSpecialPage() {
  return (
    <main className="overflow-hidden bg-[#111113] pb-20 text-[#f4efe5] sm:pb-0">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/10 bg-black/15 backdrop-blur-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="/" aria-label="Limitless Auto Detailing home">
            <Image src="/media/limitless-auto-logo.webp" alt="Limitless Auto Detailing" width={1254} height={1254} className="size-16 rounded-full bg-white object-contain" priority />
          </a>
          <a href={CERAMIC_BOOKING_URL} className="rounded-full border border-[#78b936]/70 bg-black/25 px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-[#a7dc72] sm:px-5 sm:text-xs">See package options</a>
        </div>
      </header>

      <section className="relative min-h-[720px] border-b border-white/10 sm:min-h-[800px]">
        <video className="absolute inset-0 size-full object-cover" autoPlay muted loop playsInline preload="auto" poster="/media/paint-correction-poster-v2.jpg" aria-label="Limitless Auto paint correction process">
          <source src="/media/paint-correction-loop-v2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,.72)_0%,rgba(10,10,12,.32)_35%,rgba(10,10,12,.97)_100%),linear-gradient(90deg,rgba(10,10,12,.7)_0%,rgba(10,10,12,.06)_80%)]" />
        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-end px-5 pb-12 pt-32 sm:min-h-[800px] sm:px-8 sm:pb-20">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#a7dc72] sm:text-xs">
              <span className="flex items-center gap-2"><MapPin className="size-4" /> Mobile in Seattle</span>
              <span className="flex items-center gap-2"><CalendarDays className="size-4" /> Weekends only</span>
            </div>
            <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.86] tracking-[-0.055em] text-balance sm:text-7xl lg:text-[90px]">Protect your paint right the first time.</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/78 sm:text-xl">Full paint correction, a <strong className="text-white">two-year ceramic coating, windshield coating,</strong> and a complimentary interior detail—without a $2,000 price tag.</p>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href={CERAMIC_BOOKING_URL} className="flex items-center justify-center gap-2 rounded-full bg-[#168a42] px-7 py-4 font-black uppercase text-white shadow-[0_16px_45px_rgba(22,138,66,.28)]">Find my package <ArrowUpRight className="size-5" /></a>
              <div className="flex items-baseline justify-center gap-2 sm:justify-start"><span className="text-sm font-bold uppercase text-white/45">This weekend special</span><span className="text-4xl font-black text-[#a7dc72]">$649</span></div>
            </div>
            <p className="mt-4 text-xs text-white/50">One six-hour appointment · Limited Saturday + Sunday availability</p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-9 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <figure className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <Image src="/media/paint-before.png" alt="Vehicle paint before correction work" width={768} height={1024} className="aspect-[.74] w-full object-cover" />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-black/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest">Before correction</figcaption>
              </figure>
              <figure className="relative overflow-hidden rounded-xl border border-[#78b936]/35 bg-white/5">
                <Image src="/media/paint-finish.png" alt="Glossy vehicle paint finish after correction work" width={768} height={1024} className="aspect-[.74] w-full object-cover" />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-[#78b936] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-black">Corrected finish</figcaption>
              </figure>
            </div>

            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#78b936]">Correction before protection</p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-6xl">Wax is cheaper today. Not over time.</h2>
              <p className="mt-5 max-w-xl leading-relaxed text-white/65">Wax is gone in weeks. This package corrects the paint first, then locks in a durable gloss and easier washes for the next two years.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {included.map((item) => <p key={item} className="flex items-start gap-2 text-sm leading-snug text-white/70"><Check className="mt-0.5 size-4 shrink-0 text-[#78b936]" />{item}</p>)}
              </div>
              <div className="mt-7 rounded-xl border border-[#78b936]/30 bg-[#78b936]/[0.06] p-4">
                <p className="flex items-center gap-2 font-bold"><Sparkles className="size-4 text-[#78b936]" /> $649 for the complete weekend package.</p>
                <p className="mt-1 text-sm text-white/55">Cheap coatings fail, then you pay to strip them and redo the work. Limitless Auto handles the correction and coating together, correctly from the start.</p>
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs text-white/45"><ShieldCheck className="size-4 text-[#78b936]" /> Standard serviceable paint conditions. Severe defects or restoration-level paint require photo review.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="book" className="scroll-mt-4 py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-9 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#78b936]">Saturday + Sunday only</p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-6xl">Pick your six-hour spot.</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-white/60">The package and price are ready. Live weekend selection will appear here once the Limitless booking calendar is connected.</p>
          </div>
          <div className="rounded-2xl border border-[#78b936]/35 bg-[#19191b] p-6 shadow-2xl shadow-black/30 sm:p-10">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#78b936]">Seattle ceramic coating package</p>
            <h3 className="mt-3 text-3xl font-black uppercase sm:text-5xl">Ceramic coating special</h3>
            <div className="mt-6 rounded-xl border border-white/10 p-5 text-white/65">
              <p className="text-3xl font-black text-[#a7dc72]">$649</p>
              <p className="mt-2 text-sm">Full paint correction · Two-year ceramic coating · Windshield coating · Complimentary interior detail</p>
              <p className="mt-3 text-xs text-white/45">One six-hour weekend appointment</p>
            </div>
            <a href={CERAMIC_BOOKING_URL} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#168a42] px-7 py-4 font-black uppercase text-white shadow-[0_16px_45px_rgba(22,138,66,.28)]">Continue to package finder <ArrowUpRight className="size-5" /></a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0c0c0e] py-7 text-center text-xs text-white/35">© 2026 Limitless Auto Detailing · Mobile detailing in the Seattle area</footer>
      <a href={CERAMIC_BOOKING_URL} className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-full border border-[#a7dc72]/45 bg-[#168a42] px-5 py-3.5 font-black uppercase text-white shadow-2xl shadow-black/60 sm:hidden"><span>See package options</span><span>$649</span></a>
    </main>
  )
}
