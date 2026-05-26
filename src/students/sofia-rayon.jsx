/**
 * Sofia Rayon — Portugal 2026.
 *
 * Personal page at /students/sofia-rayon. Keep `export default` at the bottom.
 *
 * Voice rules (see STUDENT_GUIDE.md for the full list):
 *   - First-person singular ("I", "me", "my") is fine here. The homepage
 *     is plural ("we"), your page is yours.
 *   - Keep it warm and specific. Avoid em dashes. Avoid marketing-speak.
 *   - Real details beat generic copy.
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FadeIn } from '../components/ui/FadeIn'
import { SectionHeader } from '../components/ui/SectionHeader'

/* -------- 1. Your profile -------- */
const me = {
  name: 'Sofia Rayon',
  graduation: 'Dec 2026',
  major: 'Management Information Systems',
  hometown: 'Rockford, IL',
  tagline: 'Trying to live a slower life in this fast-paced world.',
  photo: '/students/sofia-rayon.jpg',
}

/* -------- 2. About -------- */
const aboutMe = [
  { label: 'Hometown', value: me.hometown },
  { label: 'Favorite artist', value: 'Billy Joel' },
  { label: 'Favorite ice cream flavor', value: 'Coconut' },
  { label: 'Favorite thing about Europe', value: 'Public transportation' },
]

/* -------- 3. Favorite day on the trip -------- */
const favoriteDay = {
  date: 'May 10',
  city: 'Lisbon',
  title: 'Miradouro with the whole cohort',
  body: `Placeholder version for now: this was a really good day, great view, good vibes, everyone was hanging out, and I will come back later to write what actually happened in my own words.`,
}

/* -------- 4. Three things -------- */
const threeThings = [
  {
    kicker: 'Best thing I ate',
    body: 'Filler text for now: probably something pasta related, maybe risotto, definitely very good, details to be added later.',
  },
  {
    kicker: 'Something I did not expect',
    body: 'Filler note: there was a random moment that felt very Lisbon and I want to rewrite this with real details later.',
  },
  {
    kicker: 'What I am bringing home',
    body: 'Placeholder thought: I am bringing back a slower pace and better habits, but I still need to word this better.',
  },
]

/* -------- 5. Journal entries -------- */
const entries = [
  {
    date: 'May 7',
    title: 'First climb through Alfama',
    body: 'Journal filler draft: first day walking around, lots of hills, looked cool, more details coming when I sit down and write it properly.',
  },
  {
    date: 'May 9',
    title: 'View from the rooftop',
    body: 'Journal filler draft: rooftop view was amazing and this felt like a core memory, will replace this line with the real version soon.',
  },
]

/* ======================================================================= */

export function SofiaRayon() {
  return (
    <div className="relative flex min-h-screen flex-col bg-cream-50 text-navy-700">
      <header className="relative overflow-hidden bg-cream-100 pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 md:px-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-crimson-600">
              Portugal 2026 &middot; {me.graduation} &middot; {me.major}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] tracking-tight text-navy-700">
              {me.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-700/80 text-pretty">
              {me.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-navy-700/20 bg-cream-50 px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:border-crimson-600 hover:text-crimson-600"
              >
                &larr; Back to the cohort
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-navy-700/10 bg-cream-50 shadow-deep"
          >
            <div className="aspect-4/5 overflow-hidden bg-cream-100">
              <img
                src={me.photo}
                alt={me.name}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </header>

      <section className="border-y border-navy-700/10 bg-cream-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="01"
            kicker="About"
            title="A few facts about me."
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 md:gap-10">
            {aboutMe.map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.06}>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-crimson-600">
                    {item.label}
                  </p>
                  <p className="mt-2 font-display text-xl leading-snug text-navy-700 md:text-2xl">
                    {item.value}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <SectionHeader
            number="02"
            kicker={`${favoriteDay.city} &middot; ${favoriteDay.date}`}
            title={favoriteDay.title}
          />
          <FadeIn delay={0.1}>
            <p className="mt-8 font-display text-xl leading-relaxed text-navy-700/90 md:text-2xl">
              {favoriteDay.body}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="03"
            kicker="Three things"
            title="A small list."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {threeThings.map((thing, i) => (
              <FadeIn key={thing.kicker} delay={i * 0.08}>
                <article className="flex h-full flex-col gap-3 rounded-2xl border border-navy-700/10 bg-cream-50 p-6">
                  <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-crimson-600">
                    {thing.kicker}
                  </p>
                  <p className="text-[15px] leading-relaxed text-navy-700/85">
                    {thing.body}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {entries.length > 0 && (
        <section className="bg-cream-100 py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-5 md:px-10">
            <SectionHeader
              number="04"
              kicker="Journal"
              title="A few entries."
            />
            <div className="mt-10 flex flex-col gap-10">
              {entries.map((entry, i) => (
                <FadeIn key={`${entry.date}-${i}`} delay={i * 0.06}>
                  <article>
                    <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-crimson-600">
                      {entry.date}
                    </p>
                    <h3 className="mt-2 font-display text-3xl leading-tight tracking-tight text-navy-700">
                      {entry.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-navy-700/85 text-pretty">
                      {entry.body}
                    </p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="bg-crimson-800 py-16 text-cream-50">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <p className="font-display text-3xl leading-tight tracking-tight text-cream-50 md:text-4xl">
            Thanks for reading.
          </p>
          <p className="mt-4 text-sm text-cream-50/75">
            &mdash; {me.name}, UA MIS Portugal 2026
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-cream-50/30 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-cream-50/85 transition-colors hover:border-gold-400 hover:text-cream-50"
          >
            &larr; Back to the cohort homepage
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default SofiaRayon
