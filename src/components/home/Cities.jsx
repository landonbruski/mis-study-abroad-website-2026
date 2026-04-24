import { motion } from 'framer-motion'
import { useState } from 'react'
import { cities } from '../../data/cities'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeader } from '../ui/SectionHeader'
import { cn } from '../../lib/cn'

export function Cities() {
  const [active, setActive] = useState(null)

  return (
    <section
      id="cities"
      className="relative overflow-hidden bg-cream-100 py-20 md:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeader
          number="01"
          kicker="Two home bases"
          title="Lisbon first. Then Porto."
          subtitle="We split the trip almost evenly. Seven nights in Lisbon, six in Porto, with a coach ride through Coimbra in the middle that most of us slept through."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {cities.map((city, i) => (
            <FadeIn key={city.name} delay={i * 0.12}>
              <motion.article
                onMouseEnter={() => setActive(city.name)}
                onMouseLeave={() => setActive(null)}
                animate={{ y: active === city.name ? -6 : 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className={cn(
                  'group relative flex h-full flex-col overflow-hidden rounded-3xl bg-cream-50 text-navy-700 shadow-deep transition-all',
                  active && active !== city.name ? 'opacity-75' : 'opacity-100',
                )}
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <img
                    src={city.imageUrl}
                    alt={`${city.name}, Portugal`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy-900/55 via-navy-900/10 to-transparent" />
                  <div className="absolute left-5 top-5 flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        background: city.accent,
                        boxShadow: `0 0 0 4px ${city.accent}33`,
                      }}
                    />
                    <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-cream-50">
                      {city.kicker}
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-cream-50">
                    <h3 className="font-display text-4xl leading-none tracking-tight md:text-5xl">
                      {city.name}
                    </h3>
                    <span className="rounded-full bg-cream-50/25 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur">
                      {city.nights} nights
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-5 p-6 md:p-7">
                  <p className="font-display text-xl leading-snug tracking-tight text-navy-700">
                    {city.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed text-navy-700/75 text-pretty md:text-[15px]">
                    {city.description}
                  </p>

                  <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-navy-700/10 pt-4 text-sm">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-navy-700/55">
                      Hotel
                    </span>
                    <span className="font-medium text-navy-700">{city.hotel}</span>

                    <span className="text-[10px] uppercase tracking-[0.22em] text-navy-700/55">
                      Seeing
                    </span>
                    <ul className="flex flex-wrap gap-1.5">
                      {city.landmarks.map((landmark) => (
                        <li
                          key={landmark}
                          className="rounded-full border border-navy-700/10 bg-cream-100 px-2.5 py-0.5 text-[11px] font-medium text-navy-700 transition-colors hover:border-crimson-600 hover:bg-crimson-600 hover:text-cream-50"
                        >
                          {landmark}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
