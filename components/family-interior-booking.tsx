'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, CalendarDays, Check, Loader2 } from 'lucide-react'

type VehicleTier = 'car' | 'midsize-suv' | 'three-row'
type Screen = 'vehicle' | 'availability' | 'details' | 'confirmed'

type Slot = {
  startAt: string
  teamMemberId: string
  serviceVariationId: string
  serviceVariationVersion: number
  durationMinutes: number
}

type AvailabilityResponse = { message?: string; configured?: boolean; slots?: Slot[] }
type BookingResponse = { message?: string; bookingId?: string; startAt?: string }

const vehicleTiers: Array<{ key: VehicleTier; label: string; description: string; price: number }> = [
  { key: 'car', label: 'Car', description: 'Sedan, coupe, hatchback, or compact', price: 225 },
  { key: 'midsize-suv', label: 'Midsize SUV', description: 'Two-row SUV or crossover', price: 250 },
  { key: 'three-row', label: 'Three-row vehicle', description: 'Three-row SUV, minivan, or oversized vehicle', price: 275 },
]

function formatSlot(iso: string) {
  const date = new Date(iso)
  return {
    day: new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric', timeZone: 'America/Los_Angeles' }).format(date),
    time: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Los_Angeles' }).format(date),
  }
}

export function FamilyInteriorBooking() {
  const [screen, setScreen] = useState<Screen>('vehicle')
  const [tier, setTier] = useState<VehicleTier | null>(null)
  const [slots, setSlots] = useState<Slot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [requestId, setRequestId] = useState('')
  const [confirmation, setConfirmation] = useState<{ bookingId: string; startAt: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const selectedTier = useMemo(() => vehicleTiers.find((vehicle) => vehicle.key === tier) ?? null, [tier])

  async function chooseTier(nextTier: VehicleTier) {
    setTier(nextTier)
    setLoading(true)
    setError('')
    try {
      const start = new Date()
      const end = new Date(start.getTime() + 31 * 24 * 60 * 60 * 1000)
      const response = await fetch('/api/booking/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageKey: 'family-interior', vehicleTier: nextTier, startAt: start.toISOString(), endAt: end.toISOString() }),
      })
      const data = await response.json() as AvailabilityResponse
      if (!response.ok) throw new Error(data.message || 'Weekend availability could not be loaded.')
      setSlots(data.slots || [])
      setScreen('availability')
    } catch (caught) {
      setSlots([])
      setError(caught instanceof Error ? caught.message : 'Weekend availability could not be loaded.')
      setScreen('availability')
    } finally {
      setLoading(false)
    }
  }

  async function submitBooking(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedSlot || !tier) return
    setLoading(true)
    setError('')
    const form = new FormData(event.currentTarget)
    const id = requestId || crypto.randomUUID()
    if (!requestId) setRequestId(id)
    try {
      const response = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: id,
          packageKey: 'family-interior',
          vehicleTier: tier,
          slot: selectedSlot,
          contact: Object.fromEntries(form.entries()),
          quiz: { scope: 'interior', size: tier, issues: [], longevity: 'now' },
        }),
      })
      const data = await response.json() as BookingResponse
      if (!response.ok) throw new Error(data.message || 'The appointment could not be booked.')
      if (!data.bookingId || !data.startAt) throw new Error('Square did not return a booking confirmation.')
      setConfirmation({ bookingId: data.bookingId, startAt: data.startAt })
      setScreen('confirmed')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The appointment could not be booked.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-[#78b936]/35 bg-[#19191b] p-5 shadow-2xl shadow-black/30 sm:p-8">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#78b936]">Weekend appointments only</p>
          <h2 className="mt-2 text-2xl font-black uppercase leading-none sm:text-4xl">Choose your vehicle</h2>
        </div>
        {selectedTier && <p className="shrink-0 text-2xl font-black text-[#78b936]">${selectedTier.price}</p>}
      </div>

      {screen === 'vehicle' && (
        <div className="mt-5 grid gap-3">
          {vehicleTiers.map((vehicle) => (
            <button key={vehicle.key} type="button" onClick={() => chooseTier(vehicle.key)} disabled={loading} className="flex min-h-20 items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition-colors hover:border-[#78b936]/70 disabled:opacity-60">
              <span><span className="block font-bold">{vehicle.label}</span><span className="mt-1 block text-xs text-white/55">{vehicle.description}</span></span>
              <span className="text-xl font-black text-[#78b936]">${vehicle.price}</span>
            </button>
          ))}
          {loading && <p className="flex items-center justify-center gap-2 pt-2 text-sm text-white/60"><Loader2 className="size-4 animate-spin" /> Loading weekend appointments…</p>}
          <p className="pt-1 text-center text-xs leading-relaxed text-white/45">Seat and carpet shampoo is included at every vehicle tier. Condition-based charges apply only to restoration-level pet hair, biological contamination, mold, or similarly severe conditions.</p>
        </div>
      )}

      {screen === 'availability' && (
        <div className="mt-6">
          <p className="font-bold">Select a Saturday or Sunday</p>
          {slots.length > 0 ? (
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {slots.map((slot) => {
                const formatted = formatSlot(slot.startAt)
                return <button key={`${slot.startAt}-${slot.teamMemberId}`} type="button" onClick={() => { setSelectedSlot(slot); setScreen('details'); setError('') }} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left hover:border-[#78b936]/70"><span className="block text-xs text-white/50">{formatted.day}</span><span className="mt-1 block font-bold">{formatted.time}</span></button>
              })}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-[#78b936]/25 bg-[#78b936]/[0.06] p-4">
              <p className="font-bold">The new Family Interior Reset calendar is not live yet.</p>
              <p className="mt-2 text-sm leading-relaxed text-white/60">The page is ready, but Limitless Auto&apos;s current Square catalog does not yet contain exact $225, $250, and $275 package variations. We will not send you to a mismatched service or show made-up times.</p>
            </div>
          )}
          {error && <p className="mt-3 text-sm text-amber-300">{error}</p>}
          <button type="button" onClick={() => { setScreen('vehicle'); setError('') }} className="mt-5 flex items-center gap-2 text-xs font-bold uppercase text-white/50"><ArrowLeft className="size-4" /> Change vehicle</button>
        </div>
      )}

      {screen === 'details' && selectedSlot && selectedTier && (
        <form className="mt-6" onSubmit={submitBooking}>
          <p className="font-bold">{formatSlot(selectedSlot.startAt).day} at {formatSlot(selectedSlot.startAt).time}</p>
          <p className="mt-1 text-sm text-white/50">Family Interior Reset · {selectedTier.label} · ${selectedTier.price}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
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
          <label className="mt-3 block"><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-white/50">Anything we should know?</span><textarea name="notes" rows={3} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-[#78b936]" /></label>
          {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
          <button type="submit" disabled={loading} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#168a42] px-6 py-4 font-black uppercase text-white disabled:opacity-60">{loading ? <Loader2 className="size-5 animate-spin" /> : <CalendarDays className="size-5" />} Book weekend appointment</button>
          <button type="button" onClick={() => setScreen('availability')} className="mt-4 flex items-center gap-2 text-xs font-bold uppercase text-white/50"><ArrowLeft className="size-4" /> Choose another time</button>
        </form>
      )}

      {screen === 'confirmed' && confirmation && (
        <div className="py-10 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#78b936] text-black"><Check className="size-7" /></span>
          <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#78b936]">You&apos;re booked</p>
          <h3 className="mt-2 text-3xl font-black uppercase">Your reset is reserved.</h3>
          <p className="mt-3 text-white/60">{formatSlot(confirmation.startAt).day} at {formatSlot(confirmation.startAt).time}</p>
          <p className="mt-2 text-xs text-white/40">Confirmation: {confirmation.bookingId}</p>
        </div>
      )}
    </div>
  )
}

function Field({ name, label, type = 'text', autoComplete, placeholder, required, wide }: { name: string; label: string; type?: string; autoComplete?: string; placeholder?: string; required?: boolean; wide?: boolean }) {
  return <label className={wide ? 'sm:col-span-2' : ''}><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-white/50">{label}</span><input name={name} type={type} autoComplete={autoComplete} placeholder={placeholder} required={required} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-[#78b936]" /></label>
}
