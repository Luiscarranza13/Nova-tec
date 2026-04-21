'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 })
  const trailX = useSpring(cursorX, { stiffness: 120, damping: 25 })
  const trailY = useSpring(cursorY, { stiffness: 120, damping: 25 })

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setVisible(true)
    }
    const down = () => setClicking(true)
    const up = () => setClicking(false)
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const isInteractive = el.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]')
      setHovering(!!isInteractive)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mousemove', checkHover)
    document.addEventListener('mousedown', down)
    document.addEventListener('mouseup', up)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)

    // Hide default cursor
    document.documentElement.style.cursor = 'none'

    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mousemove', checkHover)
      document.removeEventListener('mousedown', down)
      document.removeEventListener('mouseup', up)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
      document.documentElement.style.cursor = ''
    }
  }, [cursorX, cursorY])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      {/* Trail / outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 44 : clicking ? 20 : 32,
          height: hovering ? 44 : clicking ? 20 : 32,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-full h-full rounded-full border-2 border-white opacity-60" />
      </motion.div>

      {/* Dot / inner cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: clicking ? 6 : 8,
          height: clicking ? 6 : 8,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      >
        <div className="w-full h-full rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.8)]" />
      </motion.div>
    </>
  )
}
