'use client'

import { useEffect, useState } from 'react'

interface Bit {
  id: string
  x: number
  dx: number
  dy: number
  r: number
  dr: number
  c: string
  s: number
  shape: 'rect' | 'circle'
  delay: number
}

const PALETTE = ['#D4923C', '#CFE3EE', '#F5BCBC', '#F2D9B3', '#9FC1D4']

export default function Confetti({ trigger }: { trigger: number }) {
  const [bits, setBits] = useState<Bit[]>([])

  useEffect(() => {
    if (!trigger) return
    const fresh: Bit[] = Array.from({ length: 60 }, (_, i) => ({
      id: `${trigger}-${i}`,
      x: 50 + (Math.random() - 0.5) * 30,
      dx: (Math.random() - 0.5) * 80,
      dy: 60 + Math.random() * 40,
      r: Math.random() * 360,
      dr: (Math.random() - 0.5) * 720,
      c: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      s: 0.6 + Math.random() * 0.8,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
      delay: Math.random() * 200,
    }))
    setBits(fresh)
    const t = setTimeout(() => setBits([]), 2400)
    return () => clearTimeout(t)
  }, [trigger])

  if (!bits.length) return null

  return (
    <div className="confetti-layer" aria-hidden="true">
      {bits.map((b) => (
        <div
          key={b.id}
          className={`confetti-bit ${b.shape}`}
          style={
            {
              left: `${b.x}%`,
              background: b.c,
              transform: `translate(0, 0) rotate(${b.r}deg) scale(${b.s})`,
              animationDelay: `${b.delay}ms`,
              ['--dx' as string]: `${b.dx}vw`,
              ['--dy' as string]: `${b.dy}vh`,
              ['--dr' as string]: `${b.dr}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
