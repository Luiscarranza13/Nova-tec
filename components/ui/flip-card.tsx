'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface FlipCardProps {
  front: React.ReactNode
  back: React.ReactNode
  className?: string
  height?: number
}

export function FlipCard({ front, back, className = '', height = 280 }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      style={{ height, perspective: 1000 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
      >
        {/* Front */}
        <div style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}>
          {front}
        </div>
        {/* Back */}
        <div style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0, transform: 'rotateY(180deg)' }}>
          {back}
        </div>
      </motion.div>
    </div>
  )
}
