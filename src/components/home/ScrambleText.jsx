import { useEffect, useRef, useState } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function randomChar() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
}

function readPrefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function ScrambleText({
  text,
  duration = 900,
  delay = 0,
  revealOnHover = true,
  className = '',
  as: Tag = 'span',
}) {
  const prefersReduced = readPrefersReducedMotion()
  const [animatedDisplay, setAnimatedDisplay] = useState(() => text.replace(/\S/g, ' '))
  const [animatedSettled, setAnimatedSettled] = useState(false)
  const display = prefersReduced ? text : animatedDisplay
  const settled = prefersReduced || animatedSettled
  const rafRef = useRef(0)
  const startRef = useRef(0)
  const runIdRef = useRef(0)

  function run(force = false) {
    if (settled && !force) return

    const id = ++runIdRef.current
    cancelAnimationFrame(rafRef.current)
    startRef.current = 0

    function step(ts) {
      if (id !== runIdRef.current) return
      if (!startRef.current) {
        startRef.current = ts + delay
        setAnimatedSettled(false)
      }
      const elapsed = Math.max(0, ts - startRef.current)
      const progress = Math.min(1, elapsed / duration)

      let next = ''
      for (let i = 0; i < text.length; i += 1) {
        const char = text[i]
        if (char === ' ') {
          next += ' '
          continue
        }
        const charThreshold = i / text.length
        if (progress > charThreshold + 0.08) {
          next += char
        } else if (progress > charThreshold - 0.1) {
          next += randomChar()
        } else {
          next += ' '
        }
      }
      setAnimatedDisplay(next)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        setAnimatedDisplay(text)
        setAnimatedSettled(true)
      }
    }

    rafRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    if (prefersReduced) return undefined
    const startFrame = requestAnimationFrame(() => run())
    return () => {
      cancelAnimationFrame(startFrame)
      cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, duration, delay, prefersReduced])

  return (
    <Tag
      className={className}
      onMouseEnter={revealOnHover && settled ? () => run(true) : undefined}
    >
      <span className="relative inline-block whitespace-pre">
        <span aria-hidden="true" className="invisible">
          {text}
        </span>
        <span aria-hidden={!settled} className="absolute inset-0">
          {display}
        </span>
      </span>
    </Tag>
  )
}
