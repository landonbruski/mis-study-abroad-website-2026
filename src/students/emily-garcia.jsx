/**
 * Emily Garcia — Portugal 2026.
 *
 * Personal page at /students/emily-garcia. Keep `export default` at the bottom.
 *
 * Voice rules (see STUDENT_GUIDE.md for the full list):
 *   - First-person singular ("I", "me", "my") is fine here. The homepage
 *     is plural ("we"), your page is yours.
 *   - Keep it warm and specific. Avoid em dashes. Avoid marketing-speak.
 *   - Real details beat generic copy. "I had three bifanas in two days"
 *     is better than "I tried the local cuisine."
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FadeIn } from '../components/ui/FadeIn'
import { SectionHeader } from '../components/ui/SectionHeader'

/* -------- 1. Your profile -------- */
const me = {
  name: 'Emily Garcia',
  year: 'Junior', // Freshman / Sophomore / Junior / Senior / MS
  major: 'Management Information Systems & Management',
  hometown: 'Longs, South Carolina',
  tagline:
    "I'm an Honors AMP MIS student at Alabama focused on bridging the gap between business strategy and technical execution.",
  /** Drop your photo at public/students/emily-garcia.jpg */
  photo: '/students/emily-garcia.jpg',
}

/* -------- 2. Favorite day on the trip -------- */
const favoriteDay = {
  date: 'May 10 & 11',
  city: 'Lisbon',
  title: 'Benfica Stadium Tour And Match',
  body: `Going to the Benfica game and touring the stadium were easily my favorite days of the trip. Since I have some experience working in guest services and event management back home, it was really cool to see how a massive international venue handles things differently. Beyond the logistics, getting to sit in the stands and feel the energy of the crowd was an amazing way to actually connect with the local culture.`,
}

/* -------- 3. Three things -------- */
const threeThings = [
  {
    kicker: 'Restaurant Pace',
    body: 'The dining culture was a huge surprise. In the US, servers constantly check on you and bring the bill right away. In Portugal, they greet you, get what you need, and then give you your space. They won\'t bring the check until you explicitly ask for it. It felt a little weird asking at first, but it was interesting to see how relaxed meals are there.',
  },
  {
    kicker: 'Game Day Traditions',
    body: 'Coming from Alabama, I thought I knew everything about big game days. But experiencing the FC Porto celebration and the Benfica match showed me a completely different side of sports culture. I\'m definitely bringing home an appreciation for how music, community, and sports bring people together in Europe.',
  },
  {
    kicker: 'Café Stops',
    body: 'I still can\'t pick one single best meal, but exploring all the local cafés between Lisbon and Porto was a highlight. I\'m pretty sure we tried to go to a new coffee shop almost every day, giving us the opportunity to try different types of coffee throughout Lisbon and Porto.',
  },
]

/* -------- 4. Journal entries (optional, as many as you want) -------- */
const entries = [
  {
    date: 'May 6',
    title: 'First Looks at Lisbon',
    body: 'Landing in Lisbon and seeing the city for the first time was incredible. The old buildings and tilework are beautiful, and it\'s been a great backdrop for our first week of exploring and visiting companies.',
  },
  {
    date: 'May 14',
    title: 'TukTuk Tour in Porto',
    body: 'We took a TukTuk tour through Porto and it was awesome. Our driver, Miguel, gave us great advice on the best local spots to check out and which tourist-trap areas to avoid so we could get a real feel for the city.',
  },
  {
    date: 'May 16',
    title: "Porto's Celebration",
    body: 'We stumbled right into the FC Porto celebration and the energy was electric. It was so much fun to see how the entire city shuts down to celebrate their team. It really made us feel like we were experiencing the authentic local culture.',
  },
  {
    date: 'May 17',
    title: 'A Day in Aveiro',
    body: 'Spent the day visiting Aveiro, which everyone calls the Venice of Portugal because of the canals. Aside from being beautiful, we learned that the local university actually invented the technology behind electronic toll passes (like EZ-Pass), which was extremely interesting to hear more about.',
  },
]

/* ======================================================================= */
/*  You usually do not need to edit anything below this line.              */
/*  Rename the component to your name in CamelCase before you export.      */
/* ======================================================================= */

const bodyText = 'font-sans font-normal leading-relaxed text-navy-700/85'

export function EmilyGarcia() {
  return (
    <div className="relative flex min-h-screen flex-col bg-cream-50 font-sans text-navy-700 [&_h2]:!font-sans [&_h2]:!font-bold [&_h2]:capitalize">
      {/* Hero */}
      <header className="relative overflow-hidden bg-cream-100 pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 md:px-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-crimson-600 normal-case">
              Portugal 2026 · {me.year} · {me.major}
            </p>
            <h1 className="mt-4 text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] font-bold">
              {me.name}
            </h1>
            <p className={`mt-6 max-w-xl text-lg text-pretty ${bodyText}`}>
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

      {/* Favorite day */}
      <section className="bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <SectionHeader
            number="01"
            kicker={`${favoriteDay.city} · ${favoriteDay.date}`}
            title={favoriteDay.title}
          />
          <FadeIn delay={0.1}>
            <p className={`mt-8 text-base md:text-lg ${bodyText}`}>
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
            kicker="Three Things"
            title="A Small List"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {threeThings.map((thing, i) => (
              <FadeIn key={thing.kicker} delay={i * 0.08}>
                <article className="flex h-full flex-col gap-3 rounded-2xl border border-navy-700/10 bg-cream-50 p-6">
                  <h3 className="text-lg font-bold capitalize text-navy-700">
                    {thing.kicker}
                  </h3>
                  <p className={`text-[15px] ${bodyText}`}>{thing.body}</p>
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
              title="A Few Entries"
            />
            <div className="mt-10 flex flex-col gap-10">
              {entries.map((entry, i) => (
                <FadeIn key={`${entry.date}-${i}`} delay={i * 0.06}>
                  <article>
                    <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-crimson-600 normal-case">
                      {entry.date}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold capitalize md:text-3xl">
                      {entry.title}
                    </h3>
                    <p className={`mt-4 text-[15px] text-pretty ${bodyText}`}>
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
          <p className="text-3xl font-bold capitalize text-cream-50 md:text-4xl">
            Thanks For Reading
          </p>
          <p className="mt-4 text-sm font-normal text-cream-50/75">
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

export default EmilyGarcia
