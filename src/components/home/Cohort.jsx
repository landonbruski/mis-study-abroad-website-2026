import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { students as roster, faculty } from '../../data/cohort'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeader } from '../ui/SectionHeader'
import { cn } from '../../lib/cn'

function initials(name) {
  return name
    .replace(/\([^)]*\)/g, '')
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function shuffle(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const tints = [
  'from-crimson-600/15 to-cream-100',
  'from-azulejo-500/15 to-cream-100',
  'from-gold-400/20 to-cream-100',
  'from-navy-700/10 to-cream-100',
]

const rotations = ['-rotate-2', '-rotate-1', 'rotate-0', 'rotate-1', 'rotate-2']

function seeded(val, index) {
  let h = 0
  for (const c of val) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return (h + index) % tints.length
}

function Polaroid({ person, index, listKey }) {
  const tintIdx = seeded(person.slug, index)
  const rotIdx = (person.slug.length + index) % rotations.length
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      key={`${listKey}-${person.slug}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 24,
        delay: Math.min(index * 0.02, 0.3),
      }}
      whileHover={{ y: -8, rotate: 0, scale: 1.03 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn('relative', rotations[rotIdx])}
      style={{ transformOrigin: 'center' }}
    >
      <Link
        to={`/students/${person.slug}`}
        aria-label={person.cardPlay ? `Play ${person.name}'s trip page` : `Open ${person.name}'s trip page`}
        className="group relative block aspect-4/5 cursor-pointer rounded-2xl border border-navy-700/10 bg-cream-50 p-3 shadow-sm transition-shadow hover:shadow-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-600 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
      >
      <div
        className={cn(
          'relative flex h-[72%] items-center justify-center overflow-hidden rounded-lg bg-linear-to-br',
          tints[tintIdx],
        )}
      >
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-display text-5xl leading-none tracking-tight text-navy-700/80">
            {initials(person.name)}
          </span>
        )}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 transition-opacity duration-500',
            person.cardPlay ? 'bg-navy-700/0 group-hover:bg-navy-700/25' : 'opacity-0 group-hover:opacity-100',
          )}
          style={
            person.cardPlay
              ? undefined
              : { background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.5), transparent 55%)` }
          }
        />
        <AnimatePresence>
          {hovered && person.cardPlay ? (
            <>
              <motion.span
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full border border-white/55 bg-white/20 text-white shadow-sm backdrop-blur-md transition-transform duration-150 group-active:scale-90">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-6 w-6 fill-current">
                    <path d="M8 5.14v13.72c0 .79.87 1.27 1.54.84l10.68-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
                  </svg>
                </span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute bottom-2 left-2 rounded-full bg-cream-50/90 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.2em] text-navy-700 shadow-sm backdrop-blur"
              >
                See their trip
              </motion.span>
            </>
          ) : hovered ? (
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="absolute bottom-2 left-2 rounded-full bg-cream-50/90 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.2em] text-navy-700 shadow-sm backdrop-blur"
            >
              See their trip
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
      <div className="pt-2">
        <p className="font-display text-[0.95rem] leading-tight tracking-tight text-navy-700">
          {person.name}
        </p>
        <p className="mt-0.5 text-[9px] uppercase tracking-[0.22em] text-navy-700/50">
          UA MIS &middot; {String(index + 1).padStart(2, '0')}
        </p>
      </div>
      </Link>
    </motion.div>
  )
}

export function Cohort() {
  const [list, setList] = useState(roster)
  const [listKey, setListKey] = useState('initial')

  function reshuffle() {
    setList((prev) => shuffle(prev))
    setListKey(String(Date.now()))
  }
  function restore() {
    setList(roster)
    setListKey('initial')
  }

  return (
    <section
      id="cohort"
      className="relative overflow-hidden bg-cream-50 py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            number="04"
            kicker="The cohort"
            title="Twenty students, two professors."
            subtitle="Every one of us built our own page for this trip. Click a polaroid and it opens the version told from that person's side of the group. Faculty at the top, the rest of us shuffled below."
          />
          <FadeIn delay={0.1}>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={reshuffle}
                className="group inline-flex items-center gap-2 rounded-full border border-navy-700/15 bg-cream-100 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-navy-700 transition-all hover:border-crimson-600 hover:text-crimson-600"
              >
                <span className="transition-transform duration-500 group-hover:rotate-180">
                  &#10227;
                </span>
                Shuffle
              </button>
              <button
                type="button"
                onClick={restore}
                className="rounded-full border border-navy-700/15 bg-cream-50 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-navy-700/70 transition-colors hover:border-navy-700 hover:text-navy-700"
              >
                Reset
              </button>
            </div>
          </FadeIn>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2">
          {faculty.map((person, i) => (
            <FadeIn key={person.slug} delay={i * 0.08}>
              <motion.div
                id={`student-${person.slug}`}
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="scroll-mt-28"
              >
                <Link
                  to={`/students/${person.slug}`}
                  aria-label={`Open ${person.name}'s trip page`}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-50 p-4 transition-colors hover:border-crimson-600/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-600 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-700 font-display text-sm text-cream-50">
                    {initials(person.name)}
                  </div>
                  <p className="font-display text-lg leading-tight tracking-tight text-navy-700">
                    {person.name}
                  </p>
                  <span className="ml-auto text-[10px] font-medium uppercase tracking-[0.22em] text-navy-700/50">
                    Faculty
                  </span>
                </Link>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px flex-1 bg-navy-700/15" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-navy-700/55">
              The twenty of us
            </span>
            <span className="h-px flex-1 bg-navy-700/15" />
          </div>

          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <AnimatePresence>
              {list.map((student, i) => (
                <li
                  key={student.slug}
                  id={`student-${student.slug}`}
                  className="scroll-mt-28"
                >
                  <Polaroid person={student} index={i} listKey={listKey} />
                </li>
              ))}
            </AnimatePresence>
          </ul>

        </div>
      </div>
    </section>
  )
}
