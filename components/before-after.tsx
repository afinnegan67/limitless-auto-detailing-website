'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

type BeforeAfterProps = {
  before: string
  after: string
  alt: string
  className?: string
}

export function BeforeAfter({ before, after, alt, className = '' }: BeforeAfterProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updateFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden ${className}`}
      onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); updateFromClientX(e.clientX) }}
      onPointerMove={(e) => { if (dragging.current) updateFromClientX(e.clientX) }}
      onPointerUp={() => { dragging.current = false }}
      style={{ touchAction: 'pan-y' }}
    >
      <Image src={after} alt={`${alt} — after detailing`} fill className="pointer-events-none object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src={before} alt={`${alt} — before detailing`} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-primary" style={{ left: `${position}%` }}>
        <span className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-xs font-black text-primary-foreground shadow-lg">{'<>'}</span>
      </div>
      <span className="pointer-events-none absolute left-3 top-3 bg-background/80 px-2 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur">Before</span>
      <span className="pointer-events-none absolute right-3 top-3 bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">After</span>
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label={`Compare before and after: ${alt}`}
        className="absolute inset-x-0 bottom-0 h-8 w-full cursor-ew-resize opacity-0"
      />
    </div>
  )
}
