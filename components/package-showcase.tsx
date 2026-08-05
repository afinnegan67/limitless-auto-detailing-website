'use client'

import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react'

const BOOKING_URL = '/find-your-package'
const FAMILY_INTERIOR_LANDING_URL = '/family-interior-reset'
const CERAMIC_COATING_LANDING_URL = '/seattle-coating-special'
const COMPLETE_DETAIL_LANDING_URL = '/complete-detail'

type Package = {
  title: string
  description: string
  video: string
  poster: string
  services: { name: string; value: string }[]
  totalValue: string
  specialPrice: string
  priceNote: string
  bookingUrl?: string
  featured?: boolean
}

const packages: Package[] = [
  {
    title: 'Family Interior Reset',
    video: '/media/family-interior-loop-v2.mp4',
    poster: '/media/family-interior-poster-v2.jpg',
    description: 'A complete interior reset for family vehicles, commuters, pet owners, spills, and everyday buildup.',
    services: [
      { name: 'Deep vacuum — seats, carpet, crevices', value: '$79' },
      { name: 'Seat + carpet shampoo included', value: '$159' },
      { name: 'Wipe + sanitize all surfaces', value: '$79' },
      { name: 'Floor mats cleaned + protected', value: '$49' },
      { name: 'Windows — inside + out', value: '$49' },
      { name: 'Interior plastics protected', value: '$79' },
      { name: 'Door jambs cleaned + waxed', value: '$39' },
      { name: 'Spot + stain treatment', value: '$59' },
      { name: 'Odor treatment', value: '$79' },
    ],
    totalValue: '$671',
    specialPrice: '$225',
    priceNote: '2-row SUV/truck $250 · 3-row/oversized $275',
    bookingUrl: FAMILY_INTERIOR_LANDING_URL,
  },
  {
    title: 'Complete Mobile Detail',
    video: '/media/complete-detail-loop-v2.mp4',
    poster: '/media/complete-detail-poster-v2.jpg',
    featured: true,
    description: 'A six-hour inside-and-out reset at your driveway, including free clay bar, wax, and six-month ceramic wax protection.',
    services: [
      { name: 'Complete interior reset', value: 'Included' },
      { name: 'Foam hand wash + contact wash', value: '$79' },
      { name: 'Wheels, tires + wheel wells', value: '$59' },
      { name: 'Free clay bar + wax job', value: '$250 value' },
      { name: 'Free six-month ceramic wax coating', value: '$250 value' },
    ],
    totalValue: '$799',
    specialPrice: '$299',
    priceNote: '2-row SUV/truck $325 · 3-row/oversized $349',
    bookingUrl: COMPLETE_DETAIL_LANDING_URL,
  },
  {
    title: 'Seattle Ceramic Coating Special',
    video: '/media/paint-correction-loop-v2.mp4',
    poster: '/media/paint-correction-poster-v2.jpg',
    description: 'A full correction and long-term protection package for Seattle drivers who are done re-waxing every few weeks.',
    services: [
      { name: 'Full paint correction', value: 'Included' },
      { name: 'Two-year ceramic coating', value: 'Included' },
      { name: 'Windshield coating', value: 'Included' },
      { name: 'Complimentary interior detail', value: 'Included' },
    ],
    totalValue: '$2,000',
    specialPrice: '$649',
    priceNote: 'Weekend spots only · One six-hour appointment',
    bookingUrl: CERAMIC_COATING_LANDING_URL,
  },
]

export function PackageShowcase() {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const pkg = packages[index]
  const prev = () => setIndex((i) => (i - 1 + packages.length) % packages.length)
  const next = () => setIndex((i) => (i + 1) % packages.length)
  const handleTouchEnd = (endX: number) => {
    if (touchStartX.current === null) return
    const distance = endX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(distance) < 48) return
    if (distance > 0) prev()
    else next()
  }

  return (
    <div className="mt-6 sm:mt-12">
      <article
        className="grid touch-pan-y overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-[1.2fr_1fr]"
        onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null }}
        onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
      >
        <div className="relative h-36 sm:h-64 lg:h-auto lg:min-h-[320px]">
          <video key={pkg.video} className="absolute inset-0 size-full object-cover" autoPlay muted loop playsInline preload="auto" poster={pkg.poster} aria-label={`${pkg.title} transformation video`}>
            <source src={pkg.video} type="video/mp4" />
          </video>
        </div>
        <div className="flex flex-col p-4 sm:p-10">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-black uppercase leading-none text-balance sm:text-4xl">{pkg.title}</h3>
            {pkg.featured && <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-background">Most booked</span>}
          </div>
          <p className="mt-4 hidden leading-relaxed text-muted-foreground sm:block">{pkg.description}</p>
          <div className="mt-3 flex flex-col gap-1.5 border-t border-border pt-3 sm:mt-6 sm:gap-3 sm:pt-5">
            {pkg.services.map((service) => <div key={service.name} className="flex items-center gap-2 text-[11px] leading-tight sm:gap-3 sm:text-sm"><Check className="size-3 shrink-0 text-accent sm:size-4" /><span className="flex-1">{service.name}</span><span className="shrink-0 font-mono text-[10px] text-muted-foreground sm:text-sm">{service.value}</span></div>)}
          </div>
          <div className="mt-3 flex items-end justify-between gap-3 border-t border-border pt-3 sm:mt-6 sm:pt-5">
            <div><p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground sm:text-xs">Total value</p><p className="mt-0.5 text-sm font-bold text-muted-foreground line-through decoration-primary decoration-2 sm:mt-1 sm:text-xl">{pkg.totalValue}</p></div>
            <div className="text-right"><p className="text-[9px] font-bold uppercase tracking-wider text-accent sm:text-xs">Monthly special</p><p className="mt-0.5 text-2xl font-black text-accent sm:mt-1 sm:text-3xl">{pkg.specialPrice}</p></div>
          </div>
          <p className="mt-1 text-right text-[9px] text-muted-foreground sm:mt-3 sm:text-xs">{pkg.priceNote}</p>
          <a href={pkg.bookingUrl || BOOKING_URL} target={pkg.bookingUrl ? undefined : '_blank'} rel={pkg.bookingUrl ? undefined : 'noreferrer'} className="mt-3 flex items-center justify-center gap-2 rounded-full border border-[#b6e58a]/70 bg-gradient-to-r from-[#126c34] via-[#62ad34] to-[#0d5428] px-4 py-3 text-xs font-black uppercase tracking-wide text-[#f7fff8] shadow-[0_0_28px_rgb(98_173_52/0.32),inset_0_1px_0_rgb(255_244_194/0.65)] transition-all hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_38px_rgb(98_173_52/0.5)] sm:mt-7 sm:px-6 sm:py-4 sm:text-base">Book this package <ArrowUpRight aria-hidden="true" className="size-4 sm:size-5" /></a>
        </div>
      </article>
      <div className="mt-3 flex items-center justify-between gap-5 sm:mt-5">
        <div className="flex gap-2">
          {packages.map((p, i) => (
            <button key={p.title} type="button" onClick={() => setIndex(i)} aria-label={`Show ${p.title}`} aria-current={i === index} className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-accent' : 'w-3 bg-border hover:bg-muted-foreground'}`} />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={prev} aria-label="Previous package" className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-accent transition-colors hover:border-accent sm:size-12"><ArrowLeft className="size-4 sm:size-5" /></button>
          <button type="button" onClick={next} aria-label="Next package" className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-accent transition-colors hover:border-accent sm:size-12"><ArrowRight className="size-4 sm:size-5" /></button>
        </div>
      </div>
    </div>
  )
}
