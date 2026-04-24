import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import { itinerary } from '../../data/itinerary'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeader } from '../ui/SectionHeader'
import { cn } from '../../lib/cn'

function dayNumberFromDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { day: 'numeric' })
}
function monthFromDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short' })
}

function cityColor(city) {
  if (city === 'Lisbon') return { chip: 'bg-crimson-600/10 text-crimson-700', dot: '#9E1B32' }
  if (city === 'Porto') return { chip: 'bg-azulejo-500/15 text-azulejo-700', dot: '#1F4E75' }
  return { chip: 'bg-gold-500/15 text-gold-500', dot: '#B8862A' }
}

const cityFilters = ['All', 'Lisbon', 'Porto', 'Sintra', 'Braga']

export function Itinerary() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.1'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const [openId, setOpenId] = useState(itinerary[0].id)
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(() => {
    if (filter === 'All') return itinerary
    return itinerary.filter((d) => d.city === filter)
  }, [filter])

  function scrollToDay(id) {
    setOpenId(id)
    const el = document.getElementById(`day-${id}`)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  function pickRandom() {
    const pool = filtered.length ? filtered : itinerary
    const day = pool[Math.floor(Math.random() * pool.length)]
    scrollToDay(day.id)
  }

  return (
    <section
      ref={ref}
      id="itinerary"
      className="relative overflow-hidden bg-cream-50 py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeader
          number="02"
          kicker="Day by day"
          title="Fourteen days, in order."
          subtitle="What we actually did, in the order we did it. Filter by city, jump to a specific day, or tap any card for the whole story."
        />

        <FadeIn delay={0.1}>
          <div className="mt-10 overflow-x-auto">
            <div className="flex min-w-max gap-1.5 pb-3">
              {itinerary.map((day, i) => {
                const inFilter = filter === 'All' || day.city === filter
                const isOpen = openId === day.id
                const { dot } = cityColor(day.city)
                return (
                  <button
                    key={day.id}
                    type="button"
                    onClick={() => scrollToDay(day.id)}
                    aria-label={`Jump to day ${i + 1}: ${day.title}`}
                    className={cn(
                      'group relative flex w-16 flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-center transition-all',
                      isOpen
                        ? 'border-crimson-600 bg-crimson-600/10 text-crimson-700'
                        : 'border-navy-700/10 bg-cream-100 text-navy-700 hover:border-crimson-600/50',
                      !inFilter && 'opacity-30',
                    )}
                  >
                    <span className="text-[9px] uppercase tracking-[0.18em] text-navy-700/55 group-hover:text-navy-700">
                      {day.weekday}
                    </span>
                    <span className="font-display text-lg leading-none tabular-nums">
                      {dayNumberFromDate(day.date)}
                    </span>
                    <span
                      className="mt-1 h-1 w-1 rounded-full"
                      style={{ background: dot }}
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.22em] text-navy-700/55">
                Filter
              </span>
              {cityFilters.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setFilter(city)}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] transition-all',
                    filter === city
                      ? 'bg-navy-700 text-cream-50'
                      : 'bg-cream-100 text-navy-700/70 hover:bg-cream-200 hover:text-navy-700',
                  )}
                >
                  {city}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={pickRandom}
              className="group inline-flex items-center gap-2 rounded-full border border-navy-700/15 bg-cream-50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-navy-700 transition-colors hover:border-crimson-600 hover:text-crimson-600"
            >
              <span className="transition-transform group-hover:rotate-90">&#9858;</span>
              Surprise me
            </button>
          </div>
        </FadeIn>

        <div className="relative mt-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-5.5 top-2 bottom-2 w-px bg-navy-700/10 md:left-24"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: lineScale, transformOrigin: 'top' }}
            className="pointer-events-none absolute left-5.5 top-2 bottom-2 w-px bg-crimson-600 md:left-24"
          />

          <ol className="space-y-4">
            <AnimatePresence initial={false}>
              {filtered.map((day, idx) => {
                const isOpen = openId === day.id
                const colors = cityColor(day.city)
                return (
                  <motion.li
                    key={day.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.03, 0.2) }}
                    id={`day-${day.id}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : day.id)}
                      aria-expanded={isOpen}
                      className={cn(
                        'group grid w-full grid-cols-[48px_1fr] items-start gap-5 rounded-3xl border p-5 text-left transition-all md:grid-cols-[120px_1fr] md:p-7',
                        isOpen
                          ? 'border-crimson-600/50 bg-cream-100 shadow-deep'
                          : 'border-navy-700/10 bg-cream-100/60 hover:border-crimson-600/40 hover:bg-cream-100',
                      )}
                    >
                      <div className="relative flex flex-col items-center md:items-start">
                        <span
                          className={cn(
                            'relative z-10 grid h-11 w-11 place-items-center rounded-full border-2 bg-cream-50 font-display text-lg transition-colors',
                            isOpen
                              ? 'border-crimson-600 text-crimson-600'
                              : 'border-navy-700/20 text-navy-700',
                          )}
                        >
                          {dayNumberFromDate(day.date)}
                        </span>
                        <span className="mt-2 hidden text-[10px] uppercase tracking-[0.22em] text-navy-700/55 md:block">
                          {monthFromDate(day.date)} &middot; {day.weekday}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className={cn(
                              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em]',
                              colors.chip,
                            )}
                          >
                            {day.city}
                          </span>
                          <span className="text-[11px] uppercase tracking-[0.2em] text-navy-700/55">
                            {day.tag}
                          </span>
                          <span className="text-[11px] uppercase tracking-[0.2em] text-navy-700/45 md:hidden">
                            {monthFromDate(day.date)} {dayNumberFromDate(day.date)}
                          </span>
                        </div>
                        <h3 className="font-display text-2xl leading-snug tracking-tight text-navy-700 md:text-3xl">
                          {day.title}
                        </h3>
                        <motion.div
                          initial={false}
                          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                          transition={{ duration: 0.35, ease: [0.2, 0.65, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-navy-700/80 text-pretty">{day.blurb}</p>
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {day.highlights.map((h) => (
                              <li
                                key={h}
                                className="rounded-full border border-navy-700/10 bg-cream-50 px-3 py-1 text-xs text-navy-700 transition-colors hover:border-crimson-600 hover:bg-crimson-600 hover:text-cream-50"
                              >
                                {h}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      </div>
                    </button>
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </ol>

          {filtered.length === 0 && (
            <p className="mt-8 text-center text-sm text-navy-700/60">
              No days in this filter. Try another.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
