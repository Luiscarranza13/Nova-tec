'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

// Spotlight effect wrapper for pricing cards
export function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(300px circle at ${x}px ${y}px, hsl(var(--primary) / 0.12), transparent 70%)`
  )

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className={`relative ${className}`}>
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background }}
      />
      {children}
    </div>
  )
}
