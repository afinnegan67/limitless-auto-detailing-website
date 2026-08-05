import { NextResponse } from 'next/server'
import { getBookableTeamMemberIds, getServiceVariationId, getSquareConfig, SquareApiError, SquareConfigurationError, squareRequest } from '@/lib/square'

type Availability = {
  start_at?: string
  appointment_segments?: Array<{
    duration_minutes?: number
    team_member_id?: string
    service_variation_id?: string
    service_variation_version?: number
  }>
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { packageKey, vehicleTier, startAt, endAt } = body as { packageKey?: string; vehicleTier?: string; startAt?: string; endAt?: string }
    if (!packageKey || !startAt || !endAt) return NextResponse.json({ message: 'Package and date range are required.' }, { status: 400 })

    const start = new Date(startAt)
    const end = new Date(endAt)
    if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || end <= start) return NextResponse.json({ message: 'Choose a valid date range.' }, { status: 400 })
    if (end.getTime() - start.getTime() > 31 * 24 * 60 * 60 * 1000) return NextResponse.json({ message: 'Availability searches are limited to 31 days.' }, { status: 400 })

    const config = getSquareConfig()
    const serviceVariationId = getServiceVariationId(packageKey, vehicleTier)
    const teamMemberIds = await getBookableTeamMemberIds()

    const data = await squareRequest<{ availabilities?: Availability[] }>('/v2/bookings/availability/search', {
      method: 'POST',
      body: JSON.stringify({
        query: {
          filter: {
            start_at_range: { start_at: start.toISOString(), end_at: end.toISOString() },
            location_id: config.locationId,
            segment_filters: [{
              service_variation_id: serviceVariationId,
              team_member_id_filter: { any: teamMemberIds },
            }],
          },
        },
      }),
    })

    const slots = (data.availabilities || []).flatMap((availability) => {
      const segment = availability.appointment_segments?.[0]
      if (!availability.start_at || !segment?.team_member_id || !segment.service_variation_id || segment.service_variation_version === undefined || !segment.duration_minutes) return []
      const localWeekday = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'America/Los_Angeles' }).format(new Date(availability.start_at))
      if (packageKey === 'family-interior' && localWeekday !== 'Sat' && localWeekday !== 'Sun') return []
      return [{
        startAt: availability.start_at,
        teamMemberId: segment.team_member_id,
        serviceVariationId: segment.service_variation_id,
        serviceVariationVersion: segment.service_variation_version,
        durationMinutes: segment.duration_minutes,
      }]
    })

    return NextResponse.json({ slots })
  } catch (error) {
    if (error instanceof SquareConfigurationError) return NextResponse.json({ message: error.message, configured: false }, { status: 503 })
    if (error instanceof SquareApiError) return NextResponse.json({ message: error.message }, { status: error.status >= 500 ? 502 : error.status })
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Availability could not be loaded.' }, { status: 500 })
  }
}
