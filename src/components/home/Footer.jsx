import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { students } from '../../data/cohort'

export function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <footer ref={ref} className="relative overflow-hidden bg-crimson-800 text-cream-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cream-50/30 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-crimson-500/30 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-gold-400/15 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.92] tracking-tight text-cream-50"
        >
          Thanks for following
          <br />
          along with us.
          <br />
          <em className="not-italic text-gold-400">Até já, Portugal.</em>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 border-t border-cream-50/15 pt-8"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-cream-50/55">
            The twenty of us
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-cream-50/85">
            {students.map((person) => (
              <li key={person.slug}>
                <Link
                  to={`/students/${person.slug}`}
                  className="transition-colors hover:text-cream-50"
                >
                  {person.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 flex flex-col gap-4 border-t border-cream-50/15 pt-8 text-xs text-cream-50/70 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-cream-50/85">
              UA MIS Portugal Cohort
            </span>
            <span className="text-cream-50/55">&middot;</span>
            <span>May 5 to 20, 2026</span>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 self-start rounded-full border border-cream-50/30 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-cream-50/85 transition-colors hover:border-gold-400 hover:text-cream-50 md:self-auto"
            aria-label="Back to top"
          >
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
              &uarr;
            </span>
            Top
          </button>
        </motion.div>

        <p className="mt-8 text-[11px] leading-relaxed text-cream-50/45">
          Independently built by the cohort. Not an official University of Alabama
          publication.
        </p>
      </div>
    </footer>
  )
}
