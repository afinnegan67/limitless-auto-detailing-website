import Image from 'next/image'
import { ArrowDown, ArrowUpRight, Check, CheckCircle2, MapPin } from 'lucide-react'
import { PackageShowcase } from '@/components/package-showcase'
import { SiteHeader } from '@/components/site-header'

const BOOKING_URL = '/find-your-package'

const maintenanceIncludes = [
  'Full interior vacuum and wipe-down',
  'Exterior hand wash and dry',
  'Wheels, tires, and tire dressing',
  'Interior and exterior glass',
  'Door jambs and touchpoints',
  'Priority scheduling every visit',
]


const workHighlights = [
  {
    name: 'Interior reset',
    image: '/media/family-after.png',
    imagePosition: 'center 60%',
    bio: 'Deep vacuuming, shampoo, stain treatment, and protected surfaces.',
  },
  {
    name: 'Paint finish',
    image: '/media/paint-finish.png',
    imagePosition: 'center 55%',
    bio: 'Careful exterior cleaning, correction, gloss, and long-term protection.',
  },
]

export default function Page() {
  return <main id="top" className="overflow-hidden">
    <SiteHeader />

    <section className="relative flex min-h-[100svh] flex-col justify-end border-b border-border bg-[url('/media/hero-poster-v2.jpg')] bg-cover bg-center">
      <video className="hero-video absolute inset-0 size-full object-cover" autoPlay muted loop playsInline preload="auto" poster="/media/hero-poster-v2.jpg" aria-hidden="true"><source src="/media/hero-loop-v2.mp4" type="video/mp4" /></video>
      <div className="hero-shade absolute inset-0" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start px-5 pb-14 pt-40 sm:px-8 sm:pb-20">
        <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-accent-foreground"><MapPin className="size-4" /> Seattle, Washington</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-black uppercase leading-none tracking-tight text-balance sm:text-6xl lg:text-7xl">Let&apos;s elevate <span className="text-accent-foreground">your car.</span></h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/90 sm:text-lg">Professional mobile detailing at your home or office. Deep-cleaned interiors, flawless finishes, and no shop drop-off.</p>
        <div className="mt-8 flex w-full flex-col gap-3 pb-6 sm:w-auto sm:flex-row"><a href={BOOKING_URL} className="flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90">Find my package <ArrowUpRight className="size-5" /></a><a href="#services" className="flex items-center justify-center gap-2 rounded-full border border-foreground/40 bg-background/60 px-7 py-4 font-bold uppercase tracking-wide backdrop-blur transition-colors hover:bg-background/80">See the work <ArrowDown className="size-5" /></a></div>
      </div>
    </section>

    <section id="services" className="scroll-mt-12 border-b border-border bg-secondary px-5 pb-10 pt-24 sm:px-8 sm:py-20 lg:py-28"><div className="mx-auto max-w-6xl"><h2 className="max-w-3xl text-3xl font-black uppercase leading-none sm:text-6xl">Monthly special packages</h2><PackageShowcase /><p className="mt-5 text-[11px] leading-relaxed text-muted-foreground sm:mt-8 sm:text-sm">Standard pricing assumes normal vehicle conditions. Severe pet hair, mold, biohazards, excessive staining, and restoration-level conditions require adjusted scope and pricing.</p></div></section>

    <section id="maintenance" className="scroll-mt-12 px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-12">
          <div>
            <h2 className="text-4xl font-black uppercase leading-none text-foreground sm:text-6xl">Maintenance plan</h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">Our twice-monthly maintenance visits keep your car clean without you having to think twice.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground">Every visit includes</p>
            <div className="mt-4 grid grid-cols-3 gap-2 border-b border-border pb-4 text-center">
              <div><p className="text-[9px] uppercase tracking-wide text-muted-foreground">Cars</p><p className="mt-1 font-mono text-sm font-bold text-foreground">$169/mo</p></div>
              <div><p className="text-[9px] uppercase tracking-wide text-muted-foreground">SUVs &amp; trucks</p><p className="mt-1 font-mono text-sm font-bold text-foreground">$199/mo</p></div>
              <div><p className="text-[9px] uppercase tracking-wide text-muted-foreground">3-row &amp; oversized</p><p className="mt-1 font-mono text-sm font-bold text-foreground">$229/mo</p></div>
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {maintenanceIncludes.map((item) => <li key={item} className="flex items-start gap-2 text-xs leading-snug sm:text-sm"><Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-accent-foreground" />{item}</li>)}
            </ul>
            <p className="mt-4 border-t border-border pt-3 text-[10px] text-muted-foreground sm:text-xs">Two visits per month. Initial full detail required.</p>
          </div>
        </div>

        <a href={BOOKING_URL} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold uppercase text-primary-foreground transition-colors hover:bg-primary/90 sm:mx-auto sm:w-fit sm:px-8">Find my package <ArrowUpRight className="size-5" /></a>
      </div>
    </section>

    <section id="about" className="scroll-mt-12 border-t border-border bg-secondary px-5 py-12 sm:px-8 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 sm:gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-black uppercase leading-none sm:text-6xl">A reset you can see.</h2>
            <div className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:gap-4 sm:text-lg">
              <p>Limitless Auto brings the tools, products, and process to your driveway so you can get your vehicle back without losing a day to a shop.</p>
              <p>Choose the level of care your vehicle needs, see the exact vehicle-size price, and book the appointment that fits your schedule.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {workHighlights.map((item) => (
              <div key={item.name} className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card text-center">
                <div className="relative aspect-square w-full overflow-hidden sm:aspect-[4/5]">
                  <Image src={item.image} alt={`${item.name} detailing example`} fill className="object-cover" style={{ objectPosition: item.imagePosition }} sizes="(max-width: 640px) 50vw, 25vw" />
                </div>
                <div className="flex flex-1 flex-col items-center p-3 sm:p-6">
                  <h3 className="text-base font-bold uppercase sm:text-xl">{item.name}</h3>
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground sm:text-xs">Professional mobile detailing</p>
                  <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm">{item.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden border-t border-border"><Image src="/media/gmc-denali.png" alt="Detailed white GMC Denali" fill className="object-cover" style={{ objectPosition: 'center 67%' }} sizes="100vw" /><div className="absolute inset-0 bg-background/80" /><div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-5 py-16 text-center lg:py-24"><CheckCircle2 className="size-8 text-accent-foreground" /><h2 className="mt-5 max-w-3xl text-4xl font-black uppercase leading-none text-balance sm:text-6xl">Drive something that feels new again.</h2><p className="mt-6 max-w-xl text-lg text-foreground/85">Choose your service and let us bring professional vehicle care to your driveway.</p><a href={BOOKING_URL} className="mt-8 flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-bold uppercase text-primary-foreground transition-colors hover:bg-primary/90">Find my package <ArrowUpRight className="size-5" /></a></div></section>

    <footer className="border-t border-border px-5 py-10 sm:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xl font-black uppercase">Limitless Auto Detailing</p><p className="mt-2 text-sm text-muted-foreground">Mobile detailing in Seattle and the surrounding area.</p></div><div className="text-sm text-muted-foreground sm:text-right"><p>Online booking calendar coming soon.</p><p className="mt-2">© 2026 Limitless Auto Detailing</p><p className="mt-1"><a href="/privacy-policy" className="underline underline-offset-2 transition-colors hover:text-foreground">Privacy Policy</a></p></div></div></footer>
  </main>
}
