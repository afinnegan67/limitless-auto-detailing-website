import Image from 'next/image'
import { Menu } from 'lucide-react'


const navItems = [
  ['services', 'Services'],
]

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground/15 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="Limitless Auto Detailing home"><Image src="/media/limitless-auto-logo.webp" alt="Limitless Auto Detailing" width={1254} height={1254} className="size-20 rounded-full bg-white object-contain sm:size-[5.5rem]" priority /></a>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {navItems.map(([href, label]) => <a key={href} href={`#${href}`} className="text-sm font-medium text-foreground/70 transition-colors hover:text-accent">{label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <a href="/find-your-package" className="shrink-0 bg-primary px-3 py-3 text-[10px] font-black uppercase leading-tight tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 sm:px-5 sm:text-sm">Find my package</a>
          <details className="group relative md:hidden"><summary className="flex size-11 cursor-pointer list-none items-center justify-center border border-foreground/30 [&::-webkit-details-marker]:hidden"><Menu aria-hidden="true" className="size-5" /><span className="sr-only">Open navigation</span></summary><div className="absolute right-0 top-14 flex w-64 flex-col gap-1 border border-border bg-card p-3 shadow-2xl">{navItems.map(([href, label]) => <a key={href} href={`#${href}`} className="px-4 py-3 text-sm hover:bg-muted">{label}</a>)}<a href="/find-your-package" className="mt-2 bg-primary px-4 py-3 text-center text-sm font-bold text-primary-foreground">Find my package</a></div></details>
        </div>
      </div>
    </header>
  )
}
