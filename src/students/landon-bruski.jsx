/**
 * Landon Bruski — Portugal 2026.
 *
 * Built off the cohort template (src/students/_template.jsx) and lightly
 * restyled. Follows the rules in STUDENT_GUIDE.md so it slots in alongside
 * the rest of the cohort without breaking the homepage links.
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FadeIn } from '../components/ui/FadeIn'
import { SectionHeader } from '../components/ui/SectionHeader'

/* -------- 1. Profile -------- */
const me = {
  name: 'Landon Bruski',
  year: 'Junior',
  major: 'Management Information Systems',
  hometown: 'Tuscaloosa, Alabama',
  tagline:
    'I build small businesses for a living and read maps for fun. Portugal was the first country I picked apart before I ever landed.',
  photo: '/students/landon-bruski.jpg',
}

/* -------- 2. Favorite day on the trip -------- */
const favoriteDay = {
  date: 'May 12',
  city: 'Porto',
  title: 'The afternoon the river was the whole point.',
  body: `We took the long way down to the Douro and ended up sitting on the
wall outside a wine cellar for an hour. Nobody had a phone out. Someone
across the river was practicing trumpet badly and it felt like the
city was politely listening. I could have stayed there until dark.`,
}

/* -------- 3. Three things -------- */
const threeThings = [
  {
    kicker: 'Best thing I ate',
    body: 'A bifana from a counter spot in Lisbon. Pork, mustard, soft roll, two euros, eaten standing up. I had three over two days.',
  },
  {
    kicker: 'Something I did not expect',
    body: 'How quiet the train was between Lisbon and Porto. Nobody on a phone call, no music leaking out of headphones. The countryside doing the talking.',
  },
  {
    kicker: 'What I am bringing home',
    body: 'The habit of ordering the thing the table next to me ordered. It was right every time.',
  },
]

/* -------- 4. Journal -------- */
const entries = [
  {
    date: 'May 7',
    title: 'Alfama at dusk',
    body: `First real walk through the city. The streets stop pretending to
be straight about ten minutes in and start doing whatever they want.
Got pleasantly lost twice and ended up back where I started both times,
which is its own kind of map.`,
  },
  {
    date: 'May 10',
    title: 'Sintra in the fog',
    body: `Pena Palace looked like a movie set someone forgot to take down.
The fog rolled in halfway up the hill and rolled back out before we
made it to the top, like the mountain wanted us to earn the view.`,
  },
  {
    date: 'May 16',
    title: 'A long lunch in the Douro',
    body: `Three hours, four courses, no rushing. The waiter kept refilling
my water without asking and I kept letting him. Best meal of the trip
and I cannot tell you a single thing the menu actually said.`,
  },
]

/* ======================================================================= */

export function LandonBruski() {
  return (
    <div className="relative flex min-h-screen flex-col bg-cream-50 text-navy-700">
      {/* Hero */}
      <header className="relative overflow-hidden bg-cream-100 pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(60%_60%_at_15%_10%,#D9A44133_0%,transparent_60%),radial-gradient(50%_50%_at_85%_90%,#3F7AA322_0%,transparent_60%)]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 md:px-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-crimson-600">
              Portugal 2026 &middot; {me.year} &middot; {me.major}
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
              <span className="inline-flex items-center gap-2 rounded-full bg-cream-50/80 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-navy-700/65 backdrop-blur">
                {me.hometown}
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gold-400/20 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-navy-700/10 bg-cream-50 shadow-deep">
              <div className="aspect-4/5 overflow-hidden bg-cream-100">
                <img
                  src={me.photo}
                  alt={me.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between border-t border-navy-700/10 bg-cream-50 px-5 py-3">
                <p className="font-display text-sm tracking-wide text-navy-700/80">
                  {me.name}
                </p>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-crimson-600">
                  No. 10 of 20
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Favorite day */}
      <section className="bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <SectionHeader
            number="01"
            kicker={`${favoriteDay.city} · ${favoriteDay.date}`}
            title={favoriteDay.title}
          />
          <FadeIn delay={0.1}>
            <p className="mt-8 font-display text-xl leading-relaxed text-navy-700/90 md:text-2xl">
              {favoriteDay.body}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Three things */}
      <section className="bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="02"
            kicker="Three things"
            title="A small list, in no particular order."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {threeThings.map((thing, i) => (
              <FadeIn key={thing.kicker} delay={i * 0.08}>
                <article className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-50 p-6 transition-colors hover:border-crimson-600/40">
                  <span className="absolute right-5 top-5 font-display text-3xl text-crimson-600/15 transition-colors group-hover:text-crimson-600/30">
                    0{i + 1}
                  </span>
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

      {/* Journal */}
      {entries.length > 0 && (
        <section className="bg-cream-50 py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-5 md:px-10">
            <SectionHeader
              number="03"
              kicker="Journal"
              title="A few entries from the road."
            />
            <div className="mt-10 flex flex-col gap-12">
              {entries.map((entry, i) => (
                <FadeIn key={`${entry.date}-${i}`} delay={i * 0.06}>
                  <article className="border-l-2 border-crimson-600/30 pl-6">
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

      {/* Footer */}
      <footer className="bg-crimson-800 py-16 text-cream-50">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <p className="font-display text-3xl leading-tight tracking-tight text-cream-50 md:text-4xl">
            Thanks for reading.
          </p>
          <p className="mt-4 text-sm text-cream-50/75">
            {me.name}, UA MIS Portugal 2026
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

export default LandonBruski
