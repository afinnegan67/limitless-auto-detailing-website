import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | Limitless Auto Detailing',
  description: 'How Limitless Auto Detailing collects, uses, and protects your personal information.',
}

const sections = [
  {
    heading: 'Information we collect',
    body: [
      'When you request a quote, book a service, or submit a form on our website or through our ads (including lead forms on Facebook and Instagram), we may collect your name, phone number, email address, service address or general location, vehicle information, and any details you share about the service you want.',
      'Like most websites, we also automatically collect basic technical information such as your IP address, browser type, and pages visited, through cookies and similar technologies used for analytics and advertising measurement.',
    ],
  },
  {
    heading: 'How we use your information',
    body: [
      'We use your information to respond to your inquiries, provide quotes, schedule and perform detailing services, send appointment reminders and follow-ups, and let you know about offers we think you may want. If you give us your phone number, we may contact you by call or text about your inquiry or appointment. Message and data rates may apply, and you can opt out of texts at any time by replying STOP.',
    ],
  },
  {
    heading: 'How we share information',
    body: [
      'We do not sell your personal information. We share it only with service providers that help us run our business — such as scheduling, payment, messaging, and advertising platforms (including Meta for ad measurement) — and only as needed to provide our services or as required by law.',
    ],
  },
  {
    heading: 'Data retention and security',
    body: [
      'We keep your information only as long as needed for the purposes above or as required by law, and we take reasonable measures to protect it from unauthorized access or disclosure.',
    ],
  },
  {
    heading: 'Your choices',
    body: [
      'You may ask us to access, correct, or delete the personal information we hold about you, or to stop contacting you for marketing, at any time. To make a request, email or call us using the contact information below.',
    ],
  },
  {
    heading: 'Contact us',
    body: [
      'Limitless Auto Detailing — Seattle, Washington. Current contact details will be published before the website begins accepting customer information.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-20 max-w-4xl items-center justify-between px-5 sm:px-8">
          <a href="/" aria-label="Limitless Auto Detailing home"><Image src="/media/limitless-auto-logo.webp" alt="Limitless Auto Detailing" width={1254} height={1254} className="size-16 rounded-full bg-white object-contain" priority /></a>
          <a href="/" className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft className="size-4" /> Back to site</a>
        </div>
      </header>
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
        <h1 className="text-3xl font-black uppercase leading-none sm:text-5xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: July 17, 2026</p>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Limitless Auto Detailing (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This policy explains what
          information we collect when you use our website or respond to our ads, how we use it, and the choices you have.
        </p>
        {sections.map((section) => (
          <section key={section.heading} className="mt-8">
            <h2 className="text-lg font-bold uppercase sm:text-xl">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
      <footer className="border-t border-border px-5 py-8 sm:px-8">
        <p className="mx-auto max-w-3xl text-sm text-muted-foreground">© 2026 Limitless Auto Detailing</p>
      </footer>
    </main>
  )
}
