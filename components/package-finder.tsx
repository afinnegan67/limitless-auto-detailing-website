'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, Check, Loader2, Sparkles } from 'lucide-react'


type Scope = 'interior' | 'exterior' | 'both' | 'maintenance'
type VehicleSize = 'car' | 'suv' | 'oversized'
type Longevity = 'now' | 'months' | 'best'
type PackageKey = 'family-interior' | 'complete-mobile' | 'restore-protect' | 'maintenance' | 'condition-review'
type Screen = 'quiz' | 'result' | 'availability' | 'details' | 'confirmed'

type Slot = {
  startAt: string
  teamMemberId: string
  serviceVariationId: string
  serviceVariationVersion: number
  durationMinutes: number
}

type AvailabilityResponse = { message?: string; slots?: Slot[] }
type BookingResponse = { message?: string; bookingId?: string; startAt?: string }

type Recommendation = {
  key: PackageKey
  name: string
  price: string
  reason: string
  includes: string[]
  bookable: boolean
  reviewRequired?: boolean
}

const scopeOptions: Array<{ value: Scope; label: string; description: string }> = [
  { value: 'interior', label: 'Clean the inside', description: 'Seats, carpets, surfaces, glass, and odors.' },
  { value: 'exterior', label: 'Clean the outside', description: 'Paint, wheels, finish, and protection.' },
  { value: 'both', label: 'Clean both', description: 'A complete inside-and-out transformation.' },
  { value: 'maintenance', label: 'Keep it clean', description: 'Twice-monthly recurring mobile care.' },
]

const sizeOptions: Array<{ value: VehicleSize; label: string; description: string }> = [
  { value: 'car', label: 'Sedan or coupe', description: 'Sedan or two-door coupe.' },
  { value: 'suv', label: 'Hatchback, 2-row SUV, or truck', description: 'Hatchback, crossover, two-row SUV, or pickup.' },
  { value: 'oversized', label: 'Three-row vehicle', description: 'Three-row SUV, minivan, or other three-row vehicle.' },
]

const interiorIssues = [
  ['pet-hair', 'Excessive pet hair'],
  ['stains', 'Deep cloth or carpet stains'],
  ['odor', 'Strong or lingering odor'],
  ['mold', 'Mold or biohazard concerns'],
] as const

const exteriorIssues = [
  ['scratches', 'Scratches or swirl marks'],
  ['oxidation', 'Dull or oxidized paint'],
  ['headlights', 'Foggy headlights'],
  ['protection', 'I want long-term paint protection'],
] as const

const longevityOptions: Array<{ value: Longevity; label: string; description: string }> = [
  { value: 'now', label: 'I mainly need it clean now', description: 'A professional reset for how it looks today.' },
  { value: 'months', label: 'Protect it for the coming months', description: 'Clean it now and help the finish stay that way.' },
  { value: 'best', label: 'Best correction and protection', description: 'Restore the finish and protect it long-term.' },
]

const packageData: Record<Exclude<PackageKey, 'condition-review'>, { name: string; prices: Record<VehicleSize, number>; includes: string[] }> = {
  'family-interior': {
    name: 'Family Interior Reset',
    prices: { car: 225, suv: 250, oversized: 275 },
    includes: ['Deep interior vacuum', 'Seat and carpet shampoo', 'Sanitize every surface', 'Windows and door jambs'],
  },
  'complete-mobile': {
    name: 'Complete Mobile Detail',
    prices: { car: 299, suv: 325, oversized: 349 },
    includes: ['Complete interior reset', 'Exterior hand wash', 'Free clay bar + wax', 'Free six-month ceramic wax coating'],
  },
  'restore-protect': {
    name: 'Restore & Protect',
    prices: { car: 475, suv: 575, oversized: 675 },
    includes: ['Machine paint correction', 'Scratch and swirl reduction', 'Professional finish protection', 'Vehicle-specific restoration plan'],
  },
  maintenance: {
    name: 'Maintenance Plan',
    prices: { car: 169, suv: 199, oversized: 229 },
    includes: ['Two visits every month', 'Interior vacuum and wipe-down', 'Exterior hand wash', 'Priority recurring scheduling'],
  },
}

function getRecommendation(scope: Scope, size: VehicleSize, issues: string[], longevity?: Longevity): Recommendation {
  if (issues.includes('mold')) {
    return {
      key: 'condition-review',
      name: 'Condition Review',
      price: 'Custom quote',
      reason: 'Mold and biohazard concerns need a quick photo review before we confirm the safest scope and price.',
      includes: ['Direct review by the detailing team', 'Vehicle-specific scope', 'Clear price before work begins'],
      bookable: false,
      reviewRequired: true,
    }
  }

  let key: Exclude<PackageKey, 'condition-review'> = 'complete-mobile'
  let reason = 'You want the inside and outside handled in one complete mobile appointment.'

  if (scope === 'maintenance') {
    key = 'maintenance'
    reason = 'You want the vehicle kept clean consistently without having to think twice.'
  } else if (scope === 'interior') {
    key = 'family-interior'
    reason = issues.length > 0
      ? 'Your interior needs a deep reset with focused treatment for the problems you selected.'
      : 'You want a complete interior reset without paying for exterior work you do not need.'
  } else if (issues.some((issue) => ['scratches', 'oxidation', 'protection'].includes(issue)) || longevity === 'best') {
    key = 'restore-protect'
    reason = 'Your paint concerns and protection goals call for correction—not just a surface wash.'
  } else if (scope === 'exterior') {
    key = longevity === 'months' ? 'restore-protect' : 'complete-mobile'
    reason = longevity === 'months'
      ? 'You want the finish cleaned and protected beyond a standard exterior service.'
      : 'This gives your exterior a professional reset and includes a complete interior detail for the best overall value.'
  }

  const pkg = packageData[key]
  const conditionAdjustment = issues.some((issue) => ['pet-hair', 'stains', 'odor'].includes(issue))

  return {
    key,
    name: pkg.name,
    price: `$${pkg.prices[size]}${key === 'restore-protect' ? '+' : ''}`,
    reason: conditionAdjustment ? `${reason} Heavy pet hair, staining, or odor may require a condition adjustment after photo review.` : reason,
    includes: pkg.includes,
    bookable: true,
    reviewRequired: conditionAdjustment,
  }
}

function formatSlot(iso: string) {
  const date = new Date(iso)
  return {
    day: new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'America/Los_Angeles' }).format(date),
    time: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Los_Angeles' }).format(date),
  }
}

export function PackageFinder() {
  const [screen, setScreen] = useState<Screen>('quiz')
  const [step, setStep] = useState(0)
  const [scope, setScope] = useState<Scope | null>(null)
  const [size, setSize] = useState<VehicleSize | null>(null)
  const [issues, setIssues] = useState<string[]>([])
  const [longevity, setLongevity] = useState<Longevity | null>(null)
  const [slots, setSlots] = useState<Slot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [bookingRequestId, setBookingRequestId] = useState('')
  const [confirmation, setConfirmation] = useState<{ bookingId: string; startAt: string } | null>(null)

  const hasInterior = scope === 'interior' || scope === 'both'
  const hasExterior = scope === 'exterior' || scope === 'both'
  const issueOptions = [...(hasInterior ? interiorIssues : []), ...(hasExterior ? exteriorIssues : [])]
  const steps = scope === 'maintenance' || scope === 'interior' ? 3 : 4
  const recommendation = useMemo(() => scope && size ? getRecommendation(scope, size, issues, longevity ?? undefined) : null, [scope, size, issues, longevity])

  function reset() {
    setScreen('quiz')
    setStep(0)
    setScope(null)
    setSize(null)
    setIssues([])
    setLongevity(null)
    setSlots([])
    setSelectedSlot(null)
    setError('')
    setBookingRequestId('')
    setConfirmation(null)
  }

  function chooseScope(value: Scope) {
    setScope(value)
    setIssues([])
    setLongevity(null)
    setStep(1)
  }

  function chooseSize(value: VehicleSize) {
    setSize(value)
    if (scope === 'maintenance') setScreen('result')
    else setStep(2)
  }

  function finishIssues() {
    if (scope === 'interior' || issues.includes('mold')) setScreen('result')
    else setStep(3)
  }

  function toggleIssue(value: string) {
    setIssues((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value])
  }

  async function loadAvailability() {
    if (!recommendation?.bookable) return
    setLoading(true)
    setError('')
    try {
      const start = new Date()
      const end = new Date(start.getTime() + 14 * 24 * 60 * 60 * 1000)
      const response = await fetch('/api/booking/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageKey: recommendation.key, vehicleTier: size === 'suv' ? 'midsize-suv' : size === 'oversized' ? 'three-row' : size, startAt: start.toISOString(), endAt: end.toISOString() }),
      })
      const data = await response.json() as AvailabilityResponse
      if (!response.ok) throw new Error(data.message || 'Live availability is not connected yet.')
      setSlots(data.slots || [])
      setScreen('availability')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not load availability.')
      setScreen('availability')
    } finally {
      setLoading(false)
    }
  }

  async function submitBooking(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedSlot || !recommendation) return
    setLoading(true)
    setError('')
    const form = new FormData(event.currentTarget)
    const contact = Object.fromEntries(form.entries())
    const requestId = bookingRequestId || crypto.randomUUID()
    if (!bookingRequestId) setBookingRequestId(requestId)
    try {
      const response = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          packageKey: recommendation.key,
          vehicleTier: size === 'suv' ? 'midsize-suv' : size === 'oversized' ? 'three-row' : size,
          slot: selectedSlot,
          contact,
          quiz: { scope, size, issues, longevity },
        }),
      })
      const data = await response.json() as BookingResponse
      if (!response.ok) throw new Error(data.message || 'We could not complete the booking.')
      if (!data.bookingId || !data.startAt) throw new Error('Square did not return a booking confirmation.')
      setConfirmation({ bookingId: data.bookingId, startAt: data.startAt })
      setScreen('confirmed')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not complete the booking.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full">
      <div className="border-b border-border pb-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-foreground">Limitless Auto Detail Match</p>
        <h1 id="package-finder-title" className="mt-2 text-3xl font-black uppercase sm:text-5xl">Find your detail package</h1>
      </div>
      <div className="py-5 sm:py-7">
              {screen === 'quiz' && (
                <>
                  <div className="flex gap-1.5">{Array.from({ length: steps }).map((_, index) => <span key={index} className={`h-1.5 flex-1 rounded-full ${index <= step ? 'bg-accent' : 'bg-border'}`} />)}</div>

                  {step === 0 && <QuizQuestion title="What do you want help with?" subtitle="Start with the result you want.">{scopeOptions.map((option) => <Choice key={option.value} label={option.label} description={option.description} onClick={() => chooseScope(option.value)} />)}</QuizQuestion>}

                  {step === 1 && <QuizQuestion title="What best describes your vehicle?" subtitle="This sets the correct package price.">{sizeOptions.map((option) => <Choice key={option.value} label={option.label} description={option.description} onClick={() => chooseSize(option.value)} />)}</QuizQuestion>}

                  {step === 2 && <QuizQuestion title="What condition is it in?" subtitle="Select everything that applies. Leave all unchecked if none apply.">
                    {issueOptions.map(([value, label]) => <Choice key={value} label={label} selected={issues.includes(value)} onClick={() => toggleIssue(value)} />)}
                    <button type="button" onClick={finishIssues} className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-black uppercase text-primary-foreground">Continue <ArrowRight className="size-4" /></button>
                  </QuizQuestion>}

                  {step === 3 && <QuizQuestion title="How long do you want the results to last?" subtitle="Choose the outcome—not a budget.">{longevityOptions.map((option) => <Choice key={option.value} label={option.label} description={option.description} onClick={() => { setLongevity(option.value); setScreen('result') }} />)}</QuizQuestion>}

                  {step > 0 && <button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} className="mt-5 flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground"><ArrowLeft className="size-4" /> Back</button>}
                </>
              )}

              {screen === 'result' && recommendation && (
                <div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-accent/15 text-accent-foreground"><Sparkles className="size-6" /></div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground">Your best fit</p>
                  <div className="mt-2 flex items-end justify-between gap-4 border-b border-border pb-5">
                    <h3 className="max-w-md text-3xl font-black uppercase leading-none sm:text-4xl">{recommendation.name}</h3>
                    <p className="shrink-0 text-xl font-black text-accent-foreground">{recommendation.price}</p>
                  </div>
                  <p className="mt-5 leading-relaxed text-muted-foreground">{recommendation.reason}</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">{recommendation.includes.map((item) => <li key={item} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-accent-foreground" />{item}</li>)}</ul>

                  {recommendation.bookable ? (
                    <button type="button" onClick={loadAvailability} disabled={loading} className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-black uppercase text-primary-foreground disabled:opacity-60">{loading ? <Loader2 className="size-5 animate-spin" /> : <CalendarDays className="size-5" />} See available times</button>
                  ) : (
                    <div className="mt-7 rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">Photo review will be available when the Limitless booking line is connected.</div>
                  )}
                  <button type="button" onClick={reset} className="mt-4 w-full text-center text-xs font-bold uppercase text-muted-foreground">Retake the quiz</button>
                </div>
              )}

              {screen === 'availability' && recommendation && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground">{recommendation.name}</p>
                  <h3 className="mt-2 text-3xl font-black uppercase">Choose a time</h3>
                  {slots.length > 0 ? (
                    <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">{slots.slice(0, 24).map((slot) => { const formatted = formatSlot(slot.startAt); return <button key={`${slot.startAt}-${slot.teamMemberId}`} type="button" onClick={() => { setSelectedSlot(slot); setScreen('details') }} className="rounded-xl border border-border bg-card p-3 text-left transition-colors hover:border-accent"><span className="block text-xs text-muted-foreground">{formatted.day}</span><span className="mt-1 block font-bold">{formatted.time}</span></button> })}</div>
                  ) : (
                    <div className="mt-6 rounded-2xl border border-border bg-card p-5"><p className="font-bold">Live calendar connection is coming online.</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Your package recommendation is ready. Limitless Auto&apos;s booking calendar still needs to be connected before appointments can be reserved here.</p></div>
                  )}
                  {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
                  <button type="button" onClick={() => setScreen('result')} className="mt-5 flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground"><ArrowLeft className="size-4" /> Back to recommendation</button>
                </div>
              )}

              {screen === 'details' && selectedSlot && recommendation && (
                <form onSubmit={submitBooking}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground">One last step</p>
                  <h3 className="mt-2 text-3xl font-black uppercase">Your details</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{formatSlot(selectedSlot.startAt).day} at {formatSlot(selectedSlot.startAt).time} · {recommendation.name}</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Field name="firstName" label="First name" autoComplete="given-name" required />
                    <Field name="lastName" label="Last name" autoComplete="family-name" required />
                    <Field name="phone" label="Phone" type="tel" autoComplete="tel" required />
                    <Field name="email" label="Email" type="email" autoComplete="email" required />
                    <Field name="vehicle" label="Year, make, and model" placeholder="2021 GMC Yukon" required wide />
                    <Field name="address" label="Service address" autoComplete="street-address" required wide />
                    <Field name="city" label="City" autoComplete="address-level2" required />
                    <Field name="state" label="State" autoComplete="address-level1" placeholder="WA" required />
                    <Field name="postalCode" label="ZIP code" autoComplete="postal-code" required />
                  </div>
                  <label className="mt-3 block"><span className="mb-1.5 block text-xs font-bold uppercase text-muted-foreground">Anything else we should know?</span><textarea name="notes" rows={3} className="w-full rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-accent" /></label>
                  {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
                  <button type="submit" disabled={loading} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-black uppercase text-primary-foreground disabled:opacity-60">{loading && <Loader2 className="size-5 animate-spin" />} Book this appointment</button>
                  <button type="button" onClick={() => setScreen('availability')} className="mt-4 flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground"><ArrowLeft className="size-4" /> Choose another time</button>
                </form>
              )}

              {screen === 'confirmed' && confirmation && (
                <div className="py-8 text-center">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent text-background"><Check className="size-8" /></div>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground">You&apos;re booked</p>
                  <h3 className="mt-2 text-3xl font-black uppercase">We&apos;ll see you then.</h3>
                  <p className="mt-4 text-muted-foreground">{formatSlot(confirmation.startAt).day} at {formatSlot(confirmation.startAt).time}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Booking confirmation: {confirmation.bookingId}</p>
                  <a href="/" className="mt-7 inline-flex rounded-full bg-primary px-8 py-3 font-black uppercase text-primary-foreground">Back to Limitless Auto</a>
                </div>
              )}
      </div>
    </section>
  )
}

function QuizQuestion({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return <div className="mt-6"><h3 className="text-2xl font-black uppercase leading-tight sm:text-3xl">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{subtitle}</p><div className="mt-5 grid gap-2">{children}</div></div>
}

function Choice({ label, description, selected, onClick }: { label: string; description?: string; selected?: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition-colors ${selected ? 'border-accent bg-accent/10' : 'border-border bg-card hover:border-accent/60'}`}><span><span className="block font-bold">{label}</span>{description && <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{description}</span>}</span><span className={`flex size-6 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-accent bg-accent text-background' : 'border-border'}`}>{selected ? <Check className="size-4" /> : <ArrowRight className="size-3" />}</span></button>
}

function Field({ name, label, type = 'text', autoComplete, placeholder, required, wide }: { name: string; label: string; type?: string; autoComplete?: string; placeholder?: string; required?: boolean; wide?: boolean }) {
  return <label className={wide ? 'sm:col-span-2' : ''}><span className="mb-1.5 block text-xs font-bold uppercase text-muted-foreground">{label}</span><input name={name} type={type} autoComplete={autoComplete} placeholder={placeholder} required={required} className="w-full rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-accent" /></label>
}
