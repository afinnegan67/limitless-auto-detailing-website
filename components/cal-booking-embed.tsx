type CalBookingEmbedProps = {
  selectedVehicle?: string
  price?: string
  className?: string
}

export const LIMITLESS_FAMILY_INTERIOR_CAL_URL = 'https://cal.com/opulence-funnels/limitless-auto-detailing-booking?layout=mobile&overlayCalendar=true'

export function CalBookingEmbed({ selectedVehicle, price, className = '' }: CalBookingEmbedProps) {
  return (
    <div className={className}>
      {(selectedVehicle || price) && (
        <div className="mb-4 rounded-xl border border-[#78b936]/30 bg-[#78b936]/[0.06] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#78b936]">Your selected package</p>
          <p className="mt-1 font-bold text-white">Family Interior Reset{selectedVehicle ? ` · ${selectedVehicle}` : ''}{price ? ` · ${price}` : ''}</p>
        </div>
      )}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white">
        <iframe
          src={LIMITLESS_FAMILY_INTERIOR_CAL_URL}
          title="Book the Limitless Auto Detailing Family Interior Reset"
          className="block h-[760px] w-full border-0 sm:h-[720px]"
          loading="lazy"
          allow="payment; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <p className="mt-3 text-center text-xs text-white/50">
        Calendar not loading?{' '}
        <a className="font-bold text-[#a7dc72] underline underline-offset-4" href={LIMITLESS_FAMILY_INTERIOR_CAL_URL} target="_blank" rel="noreferrer">
          Open the booking calendar directly
        </a>
        .
      </p>
    </div>
  )
}
