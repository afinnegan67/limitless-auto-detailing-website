import { NextResponse } from 'next/server'
import { getBookableTeamMemberIds, getServiceVariationId, getSquareConfig, normalizePhone, SquareApiError, SquareConfigurationError, squareRequest } from '@/lib/square'

type Slot = {
  startAt?: string
  teamMemberId?: string
  serviceVariationId?: string
  serviceVariationVersion?: number
  durationMinutes?: number
}

type Contact = {
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  vehicle?: string
  address?: string
  city?: string
  state?: string
  postalCode?: string
  notes?: string
}

function clean(value: unknown, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>
    const packageKey = clean(body.packageKey, 50)
    const vehicleTier = clean(body.vehicleTier, 50)
    const requestId = clean(body.requestId, 100)
    const slot = (body.slot || {}) as Slot
    const contact = (body.contact || {}) as Contact

    if (!requestId || !packageKey) return NextResponse.json({ message: 'Booking request is incomplete.' }, { status: 400 })

    const firstName = clean(contact.firstName, 300)
    const lastName = clean(contact.lastName, 300)
    const email = clean(contact.email, 254).toLowerCase()
    const phone = normalizePhone(clean(contact.phone, 30))
    const vehicle = clean(contact.vehicle, 300)
    const address = clean(contact.address, 500)
    const city = clean(contact.city, 200)
    const state = clean(contact.state, 50).toUpperCase()
    const postalCode = clean(contact.postalCode, 20)
    const notes = clean(contact.notes, 1500)

    if (!firstName || !lastName || !email || !vehicle || !address || !city || !state || !postalCode) return NextResponse.json({ message: 'Complete all required contact, vehicle, and address fields.' }, { status: 400 })
    if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ message: 'Enter a valid email address.' }, { status: 400 })

    const expectedServiceVariationId = getServiceVariationId(packageKey, vehicleTier)
    const teamMemberIds = await getBookableTeamMemberIds()
    const start = new Date(clean(slot.startAt, 50))

    if (!Number.isFinite(start.getTime()) || start.getTime() <= Date.now()) return NextResponse.json({ message: 'That appointment time is no longer valid.' }, { status: 400 })
    const localWeekday = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'America/Los_Angeles' }).format(start)
    if (packageKey === 'family-interior' && localWeekday !== 'Sat' && localWeekday !== 'Sun') return NextResponse.json({ message: 'Family Interior Reset appointments are available on weekends only.' }, { status: 400 })
    if (slot.serviceVariationId !== expectedServiceVariationId) return NextResponse.json({ message: 'The selected service does not match this package.' }, { status: 400 })
    if (!slot.teamMemberId || !teamMemberIds.includes(slot.teamMemberId)) return NextResponse.json({ message: 'The selected team member is not bookable.' }, { status: 400 })
    if (!Number.isInteger(slot.durationMinutes) || Number(slot.durationMinutes) <= 0 || Number(slot.durationMinutes) > 1440) return NextResponse.json({ message: 'The selected appointment duration is invalid.' }, { status: 400 })
    if (!Number.isSafeInteger(slot.serviceVariationVersion) || Number(slot.serviceVariationVersion) <= 0) return NextResponse.json({ message: 'The selected service version is invalid.' }, { status: 400 })

    const quiz = (body.quiz || {}) as Record<string, unknown>
    const customerNote = [
      `Vehicle: ${vehicle}`,
      `Detail match: scope=${clean(quiz.scope, 30)}, size=${vehicleTier || clean(quiz.size, 30)}, issues=${Array.isArray(quiz.issues) ? quiz.issues.map((item: unknown) => clean(item, 30)).filter(Boolean).join(', ') || 'none' : 'none'}, longevity=${clean(quiz.longevity, 30) || 'n/a'}`,
      notes ? `Customer notes: ${notes}` : '',
    ].filter(Boolean).join('\n').slice(0, 3000)

    const customerResponse = await squareRequest<{ customer?: { id?: string } }>('/v2/customers', {
      method: 'POST',
      body: JSON.stringify({
        idempotency_key: `${requestId}-customer`,
        given_name: firstName,
        family_name: lastName,
        email_address: email,
        phone_number: phone,
        address: {
          address_line_1: address,
          locality: city,
          administrative_district_level_1: state,
          postal_code: postalCode,
          country: 'US',
        },
        note: customerNote,
      }),
    })

    const customerId = customerResponse.customer?.id
    if (!customerId) throw new Error('Square created the customer without returning an ID.')

    const config = getSquareConfig()
    const bookingResponse = await squareRequest<{ booking?: { id?: string; start_at?: string } }>('/v2/bookings', {
      method: 'POST',
      body: JSON.stringify({
        idempotency_key: `${requestId}-booking`,
        booking: {
          location_id: config.locationId,
          start_at: start.toISOString(),
          customer_id: customerId,
          customer_note: customerNote,
          appointment_segments: [{
            duration_minutes: slot.durationMinutes,
            team_member_id: slot.teamMemberId,
            service_variation_id: expectedServiceVariationId,
            service_variation_version: slot.serviceVariationVersion,
          }],
        },
      }),
    })

    const booking = bookingResponse.booking
    if (!booking?.id || !booking.start_at) throw new Error('Square created the appointment without returning confirmation details.')

    return NextResponse.json({ bookingId: booking.id, startAt: booking.start_at })
  } catch (error) {
    if (error instanceof SquareConfigurationError) return NextResponse.json({ message: error.message, configured: false }, { status: 503 })
    if (error instanceof SquareApiError) return NextResponse.json({ message: error.message }, { status: error.status >= 500 ? 502 : error.status })
    return NextResponse.json({ message: error instanceof Error ? error.message : 'The appointment could not be booked.' }, { status: 500 })
  }
}
