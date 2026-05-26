import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { experiences } from '../../data/experiences'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeader } from '../ui/SectionHeader'
import { cn } from '../../lib/cn'

const layout = [
  'md:col-span-2 md:row-span-2',
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-2',
  'md:col-span-2 md:row-span-1',
  'md:col-span-2 md:row-span-1',
]

function ParallaxCard({ exp, onOpen, className }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  function onMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    setTilt({ x, y })
  }
  function onLeave() {
    setTilt({ x: 0, y: 0 })
  }
  return (
    <motion.article
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onOpen}
      whileTap={{ scale: 0.99 }}
      className={cn(
        'group relative h-full cursor-pointer overflow-hidden rounded-3xl bg-navy-700 text-cream-50 shadow-deep',
        className,
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.img
        src={exp.imageUrl}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
        animate={{
          scale: 1.1,
          x: tilt.x * -20,
          y: tilt.y * -20,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-navy-900/90 via-navy-900/30 to-navy-900/0 transition-opacity duration-500 group-hover:from-navy-900/95" />
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          background: `radial-gradient(circle at ${50 + tilt.x * 60}% ${50 + tilt.y * 60}%, rgba(255,255,255,0.18), transparent 55%)`,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />
      <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-7">
        <span className="inline-flex w-max items-center gap-2 rounded-full bg-cream-50/15 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-crimson-500" />
          {exp.kicker}
        </span>
        <h3 className="mt-3 font-display text-2xl leading-snug tracking-tight md:text-3xl">
          {exp.title}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-cream-50/80 line-clamp-2 md:text-base md:line-clamp-3">
          {exp.blurb}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-cream-50/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Read more <span>&rarr;</span>
        </span>
      </div>
    </motion.article>
  )
}

function DetailOverlay({ exp, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-60 grid place-items-center bg-navy-900/75 p-4 backdrop-blur-lg"
      role="dialog"
      aria-modal="true"
      aria-label={exp.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.article
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 240, damping: 26 }}
        className="relative grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-3xl bg-cream-50 text-navy-700 shadow-deep md:grid-cols-[1.1fr_1fr]"
      >
        <div className="relative aspect-4/3 overflow-hidden md:aspect-auto">
          <img src={exp.imageUrl} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-navy-900/60 to-transparent" />
          <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-cream-50/25 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-cream-50 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson-500" />
            {exp.kicker}
          </span>
        </div>
        <div className="flex flex-col gap-5 p-7 md:p-9">
          <h3 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
            {exp.title}
          </h3>
          <p className="text-navy-700/80 leading-relaxed">{exp.blurb}</p>
          <div className="mt-auto flex items-center justify-between">
            <a
              href="#itinerary"
              onClick={onClose}
              className="text-xs font-medium uppercase tracking-[0.22em] text-crimson-600 underline decoration-2 underline-offset-4 hover:text-crimson-700"
            >
              See this in the itinerary
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-navy-700/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-navy-700/70 transition-colors hover:border-navy-700 hover:text-navy-700"
            >
              Close
            </button>
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

export function Experiences() {
  const [activeId, setActiveId] = useState(null)
  const active = experiences.find((e) => e.id === activeId) ?? null

  return (
    <section
      id="experiences"
      className="relative bg-cream-100 py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            number="03"
            kicker="A few of the days"
            title="Six days that stood out."
          />
          <FadeIn delay={0.1}>
            <p className="max-w-md text-navy-700/75 text-pretty md:text-right">
              A mix of planned stops and a few we found on our own. Tap a card to read
              more.
            </p>
          </FadeIn>
        </div>

        <div className="mt-12 grid auto-rows-[18rem] grid-cols-1 gap-4 md:grid-cols-3">
          {experiences.map((exp, i) => (
            <FadeIn
              key={exp.id}
              delay={Math.min(i * 0.06, 0.4)}
              className={layout[i % layout.length]}
            >
              <ParallaxCard exp={exp} onOpen={() => setActiveId(exp.id)} />
            </FadeIn>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <DetailOverlay exp={active} onClose={() => setActiveId(null)} />}
      </AnimatePresence>
    </section>
  )
}
