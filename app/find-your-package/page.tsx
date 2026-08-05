import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { PackageFinder } from '@/components/package-finder'

export const metadata = {
  title: 'Find Your Detail Package | Limitless Auto Detailing',
  description: 'Answer a few quick questions and find the right Limitless Auto detailing package for your vehicle.',
}

export default function FindYourPackagePage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-20 max-w-4xl items-center justify-between px-5 sm:px-8">
          <a href="/" aria-label="Limitless Auto Detailing home"><Image src="/media/limitless-auto-logo.webp" alt="Limitless Auto Detailing" width={1254} height={1254} className="size-16 rounded-full bg-white object-contain" priority /></a>
          <a href="/" className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft className="size-4" /> Back to site</a>
        </div>
      </header>
      <div className="mx-auto w-full max-w-2xl px-5 py-8 sm:px-8 sm:py-14">
        <PackageFinder />
      </div>
    </main>
  )
}
