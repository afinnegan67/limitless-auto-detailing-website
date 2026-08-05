import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const eventUrl = 'https://cal.com/opulence-funnels/limitless-auto-detailing-booking?layout=mobile&overlayCalendar=true'

async function source(path) {
  try {
    return await readFile(new URL(path, root), 'utf8')
  } catch {
    return ''
  }
}

test('the reusable calendar uses the exact Limitless Auto Cal.com event and includes a direct fallback', async () => {
  const embed = await source('components/cal-booking-embed.tsx')

  assert.match(embed, new RegExp(eventUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  assert.match(embed, /Open the booking calendar directly/)
})

test('the Family Interior Reset landing page renders the reusable calendar instead of placeholder copy', async () => {
  const page = await source('app/family-interior-reset/page.tsx')

  assert.match(page, /<CalBookingEmbed/)
  assert.doesNotMatch(page, /calendar will sit here once its public embed URL is connected/i)
})

test('the package finder opens Cal.com for Family Interior Reset without calling legacy availability', async () => {
  const finder = await source('components/package-finder.tsx')

  assert.match(finder, /recommendation\.key === 'family-interior'/)
  assert.match(finder, /<CalBookingEmbed/)
  assert.match(finder, /setScreen\('availability'\)/)
})
