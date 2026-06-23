import { motion } from 'framer-motion'
import { trip } from '../../data/trip'
import { TiltPostcard } from './TiltPostcard'
import { ScrambleText } from './ScrambleText'

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-cream-100 pt-28 md:pt-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(217,164,65,0.22),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(158,27,50,0.18),transparent_55%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-cream-100/0 via-cream-100/60 to-cream-100"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-32 -z-10 h-72 w-72 rounded-full bg-crimson-600/10 blur-3xl animate-drift"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 -z-10 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl animate-drift"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 pb-20 md:px-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-10 lg:pb-28">
        <div className="flex flex-col justify-center">
          <h1 className="font-display text-[clamp(2.5rem,8vw,7.5rem)] leading-[0.95] tracking-tight text-navy-700">
            <ScrambleText
              text="Fifteen"
              delay={150}
              duration={700}
              revealOnHover={false}
              className="block"
            />
            <span className="block">
              <ScrambleText
                text="days in "
                delay={350}
                duration={700}
                revealOnHover={false}
                as="span"
              />
              <em className="not-italic text-crimson-600">
                <ScrambleText
                  text="Portugal."
                  delay={600}
                  duration={900}
                  revealOnHover={false}
                  as="span"
                />
              </em>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-navy-700/80 text-pretty md:text-lg"
          >
            {trip.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.35 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#itinerary"
              className="group inline-flex items-center gap-2 rounded-full bg-navy-700 px-5 py-2.5 text-sm font-medium text-cream-50 shadow-deep transition-transform hover:-translate-y-0.5"
            >
              See what we did
              <span className="transition-transform group-hover:translate-x-0.5">
                &rarr;
              </span>
            </a>
            <a
              href="#cohort"
              className="text-sm font-medium text-navy-700 underline decoration-crimson-600/50 decoration-2 underline-offset-4 transition-colors hover:text-crimson-600"
            >
              Meet the cohort
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.2, 0.65, 0.3, 1] }}
          className="relative flex items-center justify-center pt-4 lg:pt-0"
        >
          <TiltPostcard />
        </motion.div>
      </div>
    </section>
  )
}

