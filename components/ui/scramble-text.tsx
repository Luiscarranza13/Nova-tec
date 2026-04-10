'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'

interface ScrambleTextProps {
  text: string
  className?: string
  duration?: number
  trigger?: boolean
}

export function ScrambleText({ text, className, duration = 1200, trigger = true }: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const hasRun = useRef(false)

  useEffect(() => {
    if ((!inView && !trigger) || hasRun.current) return
    hasRun.current = true

    const steps = 20
    const interval = duration / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      const progress = step / steps
      setDisplayed(
        text.split('').map((char, i) => {
          if (char === ' ') return ' '
          if (i / text.length < progress) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      if (step >= steps) {
        clearInterval(timer)
        setDisplayed(text)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [inView, trigger, text, duration])

  return <span ref={ref} className={className}>{displayed}</span>
}
