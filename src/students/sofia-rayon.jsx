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
  year: 'Junior',
  major: 'Management Information Systems (Honors BS/MS)',
  hometown: 'Alabama',
  tagline:
    'Honors AMP MIS student at Alabama. I like where data, systems, and how teams actually work meet in the real world.',
  photo: '/students/sofia-rayon.jpg',
}

/* -------- 2. Favorite day on the trip -------- */
const favoriteDay = {
  date: 'May 10',
  city: 'Lisbon',
  title: 'Miradouro with the whole cohort',
  body: `We found a lookout above the orange roofs and just sat there for a while. You could see the castle on the hill and the bridge in the distance, and everyone was talking over each other in the best way. It was one of those afternoons where you stop trying to take the perfect photo and just look.`,
}

/* -------- 3. Three things -------- */
const threeThings = [
  {
    kicker: 'Best thing I ate',
    body: 'Tomato risotto with burrata at a little restaurant with lemon-print tablecloths and bottles stacked up the wall. I still think about that plate.',
  },
  {
    kicker: 'Something I did not expect',
    body: 'Riding the tram with everyone after a long day. We were tired, laughing, and watching another yellow tram roll past the window like it was normal. It felt very Lisbon very fast.',
  },
  {
    kicker: 'What I am bringing home',
    body: 'Slower meals. In Portugal nobody rushes you out of a table, and I want to keep that pace when I am back on campus.',
  },
]

/* -------- 4. Journal entries -------- */
const entries = [
  {
    date: 'May 7',
    title: 'First climb through Alfama',
    body: 'Wandering up cobblestone hills with tinsel strung between the buildings was surreal. Every turn looked like a postcard, and I kept having to remind myself I was there for class, not just a vacation.',
  },
  {
    date: 'May 9',
    title: 'View from the rooftop',
    body: 'Standing above the red roofs with the river in the distance made the whole trip feel real. The city is loud and steep and beautiful in a way photos never quite capture.',
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

      <section className="bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <SectionHeader
            number="01"
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

      <section className="bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="02"
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
        <section className="bg-cream-50 py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-5 md:px-10">
            <SectionHeader
              number="03"
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
