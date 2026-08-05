export type PackageKey = 'family-interior' | 'complete-mobile' | 'restore-protect' | 'maintenance'
export type VehicleTier = 'car' | 'midsize-suv' | 'three-row'

const SERVICE_ENV_KEYS: Record<PackageKey, string> = {
  'family-interior': 'SQUARE_SERVICE_FAMILY_INTERIOR_RESET',
  'complete-mobile': 'SQUARE_SERVICE_COMPLETE_MOBILE_DETAIL',
  'restore-protect': 'SQUARE_SERVICE_RESTORE_PROTECT',
  maintenance: 'SQUARE_SERVICE_MAINTENANCE',
}

const TIER_ENV_SUFFIXES: Record<VehicleTier, string> = {
  car: 'CAR',
  'midsize-suv': 'MIDSIZE_SUV',
  'three-row': 'THREE_ROW',
}

export class SquareConfigurationError extends Error {}
export class SquareApiError extends Error {
  status: number
  details: unknown

  constructor(message: string, status: number, details: unknown) {
    super(message)
    this.status = status
    this.details = details
  }
}

export function getSquareConfig() {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN
  const locationId = process.env.SQUARE_LOCATION_ID
  const environment = process.env.SQUARE_ENVIRONMENT === 'sandbox' ? 'sandbox' : 'production'

  if (!accessToken || !locationId) throw new SquareConfigurationError('Live availability is not connected yet.')

  return {
    accessToken,
    locationId,
    baseUrl: environment === 'sandbox' ? 'https://connect.squareupsandbox.com' : 'https://connect.squareup.com',
    apiVersion: process.env.SQUARE_API_VERSION || '2026-07-15',
  }
}

export function getServiceVariationId(packageKey: string, vehicleTier?: string) {
  if (!(packageKey in SERVICE_ENV_KEYS)) throw new SquareConfigurationError('That package is not available for online booking.')
  const baseEnvKey = SERVICE_ENV_KEYS[packageKey as PackageKey]
  const tierSuffix = vehicleTier && vehicleTier in TIER_ENV_SUFFIXES ? TIER_ENV_SUFFIXES[vehicleTier as VehicleTier] : null
  const envKey = tierSuffix ? `${baseEnvKey}_${tierSuffix}` : baseEnvKey
  const serviceVariationId = process.env[envKey]
  if (!serviceVariationId) throw new SquareConfigurationError('Live availability is not connected for this package yet.')
  return serviceVariationId
}

export async function squareRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const config = getSquareConfig()
  const response = await fetch(`${config.baseUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      'Square-Version': config.apiVersion,
      'Content-Type': 'application/json',
      ...init.headers,
    },
    cache: 'no-store',
  })

  const data = await response.json().catch(() => ({})) as {
    errors?: Array<{ detail?: string; code?: string }>
  } & Record<string, unknown>
  if (!response.ok) {
    const firstError = Array.isArray(data.errors) ? data.errors[0] : null
    throw new SquareApiError(firstError?.detail || firstError?.code || 'Square could not complete the request.', response.status, data.errors || data)
  }
  return data as T
}

export async function getBookableTeamMemberIds() {
  const configuredIds = process.env.SQUARE_TEAM_MEMBER_IDS?.split(',').map((id) => id.trim()).filter(Boolean)
  if (configuredIds?.length) return configuredIds

  const data = await squareRequest<{ team_member_booking_profiles?: Array<{ team_member_id?: string }> }>('/v2/bookings/team-member-booking-profiles?bookable_only=true&limit=100')
  const ids = (data.team_member_booking_profiles || []).map((profile) => profile.team_member_id).filter((id): id is string => Boolean(id))
  if (!ids.length) throw new SquareConfigurationError('No bookable Square team members were found.')
  return ids
}

export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  if (digits.length >= 9 && digits.length <= 16 && value.trim().startsWith('+')) return `+${digits}`
  throw new Error('Enter a valid phone number.')
}
