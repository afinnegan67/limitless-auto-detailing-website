import Image from 'next/image'
import { ArrowUpRight, CalendarDays, Check, MapPin, ShieldCheck } from 'lucide-react'

const FAMILY_INTERIOR_BOOKING_URL = '/find-your-package'

export const metadata = {
  title: 'Family Interior Reset | Limitless Auto Detailing Seattle',
  description: 'A premium mobile interior reset with seat and carpet shampoo included. Weekend appointments in the Seattle area from $225.',
}

const included = [
  'Deep vacuum through every crevice',
  'Every seat shampooed',
  'Carpets and floor mats shampooed',
  'Dash, console, doors, and plastics detailed',
  'Interior glass and door jambs cleaned',
  'Interior surfaces cleaned and protected',
]

export default function FamilyInteriorResetPage() {
  return (
    <main className="overflow-hidden bg-[#111113] pb-20 text-[#f4efe5] sm:pb-0">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/10 bg-black/15 backdrop-blur-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="/" aria-label="Limitless Auto Detailing home">
            <Image src="/media/limitless-auto-logo.webp" alt="Limitless Auto Detailing" width={1254} height={1254} className="size-16 rounded-full bg-white object-contain" priority />
          </a>
          <a href="#book" className="rounded-full border border-[#78b936]/70 bg-black/25 px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-[#a7dc72] sm:px-5 sm:text-xs">See weekend times</a>
        </div>
      </header>

      {/* 1 — Offer */}
      <section className="relative min-h-[720px] border-b border-white/10 sm:min-h-[800px]">
        <video className="absolute inset-0 size-full object-cover" autoPlay muted loop playsInline preload="auto" poster="/media/family-interior-poster-v2.jpg" aria-label="Limitless Auto Family Interior Reset process">
          <source src="/media/family-interior-loop-v2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,.68)_0%,rgba(10,10,12,.35)_35%,rgba(10,10,12,.97)_100%),linear-gradient(90deg,rgba(10,10,12,.68)_0%,rgba(10,10,12,.05)_80%)]" />
        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-end px-5 pb-12 pt-32 sm:min-h-[800px] sm:px-8 sm:pb-20">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#a7dc72] sm:text-xs">
              <span className="flex items-center gap-2"><MapPin className="size-4" /> Mobile in Seattle</span>
              <span className="flex items-center gap-2"><CalendarDays className="size-4" /> Weekends only</span>
            </div>
            <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.86] tracking-[-0.055em] text-balance sm:text-7xl lg:text-[92px]">Get your family car back.</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/78 sm:text-xl">A premium interior reset at your driveway—with <strong className="text-white">every seat and carpet shampooed.</strong></p>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="#book" className="flex items-center justify-center gap-2 rounded-full bg-[#168a42] px-7 py-4 font-black uppercase text-white shadow-[0_16px_45px_rgba(22,138,66,.28)]">See weekend appointments <ArrowUpRight className="size-5" /></a>
              <div className="flex items-baseline justify-center gap-2 sm:justify-start"><span className="text-sm font-bold uppercase text-white/45">From</span><span className="text-4xl font-black text-[#a7dc72]">$225</span></div>
            </div>
            <p className="mt-4 text-xs text-white/45">Sedan / coupe $225 · Hatchback, 2-row SUV, or truck $250 · 3-row vehicle $275</p>
          </div>
        </div>
      </section>

      {/* 2 — Proof + value */}
      <section className="border-b border-white/10 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-9 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <figure className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <Image src="/media/family-before.png" alt="Family GMC interior before detailing, with crumbs, child seats, and debris" width={754} height={1266} className="aspect-[.57] w-full object-cover" />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-black/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest">Before</figcaption>
              </figure>
              <figure className="relative overflow-hidden rounded-xl border border-[#78b936]/35 bg-white/5">
                <Image src="/media/family-after.png" alt="The same family GMC interior after a full interior reset" width={768} height={1376} className="aspect-[.57] w-full object-cover" />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-[#78b936] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-black">After</figcaption>
              </figure>
            </div>

            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#78b936]">Real family-vehicle transformation example.</p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-6xl">Not a quick vacuum.</h2>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {included.map((item) => <p key={item} className="flex items-start gap-2 text-sm leading-snug text-white/70"><Check className="mt-0.5 size-4 shrink-0 text-[#78b936]" />{item}</p>)}
              </div>
              <div className="mt-7 rounded-xl border border-[#78b936]/30 bg-[#78b936]/[0.06] p-4">
                <p className="font-bold">Premium local interior details are advertised as high as $430.</p>
                <p className="mt-1 text-sm text-white/55">The Family Interior Reset includes the deep shampoo from $225—without selling it back to you as an automatic upgrade.</p>
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs text-white/45"><ShieldCheck className="size-4 text-[#78b936]" /> Standard serviceable conditions. Severe contamination requires photo review.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Booking */}
      <section id="book" className="scroll-mt-4 py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-9 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#78b936]">Saturday + Sunday · 8 AM–6 PM</p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-6xl">Pick your vehicle. Pick your weekend.</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-white/60">Choose your vehicle type to see the exact Family Interior Reset price. The booking calendar will sit here once its public embed URL is connected.</p>
          </div>
          <div className="rounded-2xl border border-[#78b936]/35 bg-[#19191b] p-6 shadow-2xl shadow-black/30 sm:p-10">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#78b936]">Vehicle-specific package pricing</p>
            <h3 className="mt-3 text-3xl font-black uppercase sm:text-5xl">Choose your vehicle size.</h3>
            <div className="mt-6 grid gap-3 text-sm text-white/65 sm:grid-cols-3">
              <p className="rounded-xl border border-white/10 p-4"><strong className="block text-lg text-white">Sedan / Coupe</strong>$225 · 4 hours</p>
              <p className="rounded-xl border border-white/10 p-4"><strong className="block text-lg text-white">Hatchback / 2-Row SUV / Truck</strong>$250 · 4 hours</p>
              <p className="rounded-xl border border-white/10 p-4"><strong className="block text-lg text-white">3-Row Vehicle</strong>$275 · 4 hours</p>
            </div>
            <a href={FAMILY_INTERIOR_BOOKING_URL} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#168a42] px-7 py-4 font-black uppercase text-white shadow-[0_16px_45px_rgba(22,138,66,.28)]">Continue to package finder <ArrowUpRight className="size-5" /></a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0c0c0e] px-5 py-7 text-center text-xs leading-relaxed text-white/35">© 2026 Limitless Auto Detailing · Mobile detailing in the Seattle area</footer>
      <a href="#book" className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-full border border-[#f1d18e]/45 bg-[#168a42] px-5 py-3.5 font-black uppercase text-white shadow-2xl shadow-black/60 sm:hidden"><span>See weekend times</span><span>$225+</span></a>
    </main>
  )
}
