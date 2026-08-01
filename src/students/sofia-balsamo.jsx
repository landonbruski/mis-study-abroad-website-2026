/**
 * Student page template.
 *
 * How to use:
 *   1. Copy this file to `src/students/<your-slug>.jsx`
 *      e.g. `src/students/landon-bruski.jsx`
 *   2. Rename the exported component to your name in CamelCase
 *      e.g. `export function LandonBruski()`
 *   3. Fill in every block below. Keep the structure so the cohort site
 *      reads as one publication, not twenty different ones.
 *   4. The homepage automatically links to this page from your polaroid
 *      in the Cohort section once the route is wired up.
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
  name: 'Sofia Balsamo',
  year: 'Sophomore', // Freshman / Sophomore / Junior / Senior / MS
  major: 'Management Information Systems',
  hometown: 'Athens, Georgia',
  tagline: 'I am an Accelerated Masters MIS student fueled by coffee, curiosity, and a passion for exploring new perspectives around the world.',
  /** A photo in /public/students/your-slug.jpg works best. */
  photo: '/students/sofia-balsamo/sofia-profile.jpeg',
}

/* -------- 2. Favorite day on the trip -------- */
const favoriteDay = {
  date: 'May 11',
  city: 'Lisbon',
  title: 'Benfica vs. Braga',
  body: `The highlight of this trip was attending a Benfica vs. Braga match in Portugal's largest soccer stadium. SL Benfica is Lisbon’s primary soccer club, and watching one of their home games just a few rows up from the field was absolutely surreal. The energy in the stadium was incredible. It felt like experiencing Portugal’s version of Alabama football at their Bryant-Denny Stadium.`,
  image: '/students/sofia-balsamo/soccer.jpeg'
}

/* -------- 3. Three things -------- */
const threeThings = [
  {
    kicker: 'Best thing I ate',
    body: 'By far, one of the best meals I had during my time abroad was at a restaurant in Porto. I enjoyed a full-course dinner with an incredible steak and potato gratin as the main dish, and everything from the presentation to the flavors was amazing. Beyond the food itself, the atmosphere was relaxing and a slower pace compared to that of the US. My overall experience was a 10/10, and a meal I will forever remember.',
    image: '/students/sofia-balsamo/food.jpeg'
  },
  {
    kicker: 'Something I did not expect',
    body: 'A personal favorite from our trip was visiting Pena Palace in Sintra. I never expected Portugal to have castles, much less colorful ones - it truly felt like something straight out of a fairytale. The palace’s unique architecture and rich history made it even more fascinating, and the panoramic views overlooking the hills and coastline were absolutely breathtaking. Walking through the palace and its grounds felt surreal and was definitely something I never expected to experience while studying abroad.',
    image: '/students/sofia-balsamo/pena-palace.jpeg'
  },
  {
    kicker: 'Favorite cultural difference',
    body: 'Something I really appreciated about Portugal was the public transportation system. It was incredibly convenient, affordable, and easy to navigate between destinations. I loved how accessible everything felt without needing a car, and it made exploring so much less stressful.',
    image: '/students/sofia-balsamo/metro.jpeg'
  },
]

/* -------- 4. Journal entries (optional, as many as you want) -------- */
const entries = [
  {
    date: 'May 15',
    title: 'Surfing',
    body: 'I never thought I would say that I’ve been surfing, let alone in a whole other country, but now I can!  I might have only stood on the surfboard for 0.1 seconds, but at least I can say I tried. Even though I spent more time falling into the waves than actually surfing, it was such a fun and unforgettable experience.',
    image: '/students/sofia-balsamo/surfing.jpeg'
  },
  {
    date: 'May 15',
    title: 'Portos’s Parade',
    body: 'Watching FC Porto win a championship turned the entire city into one massive celebration. The streets of Porto were packed with fans waving flags, singing, and setting off fireworks well into the night. The energy was absolutely electric, and it felt like the whole city was moving as one. It reminded me a lot of Alabama game days, but with a European twist.',
    image: '/students/sofia-balsamo/porto-parade.jpeg'
  },
  {
    date: 'May 17',
    title: 'Day Trip to Aveiro',
    body: 'On our free day, I went with friends on a day trip to Aveiro, otherwise known as the Venice of Portugal. We spent the day wandering along the canals, exploring the colorful streets, and taking in the calm, relaxed pace of the town.',
    image: '/students/sofia-balsamo/aveiro.jpeg'
  },
]

/* ======================================================================= */
/*  You usually do not need to edit anything below this line.              */
/*  Rename the component to your name in CamelCase before you export.      */
/* ======================================================================= */

export function SofiaBalsamo() {
  return (
    <div className="relative flex min-h-screen flex-col bg-cream-50 text-navy-700">
      {/* Hero */}
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

      {/* Favorite day */}
      <section className="bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <SectionHeader
            number="01"
            kicker={`${favoriteDay.city}, ${favoriteDay.date}`}
            title={favoriteDay.title}
          />
          <FadeIn delay={0.1}>
             <img
                src={favoriteDay.image}
                alt={favoriteDay.title}
                className="mt-8 w-full h-100 rounded-xl object-cover"
              />
            <p className="mt-8 text-base leading-relaxed text-navy-700/90 md:text-xl">
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
            title="A small list."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {threeThings.map((thing, i) => (
              <FadeIn key={thing.kicker} delay={i * 0.08}>
                <article className="flex h-full flex-col items-center gap-3 rounded-2xl border border-navy-700/10 bg-cream-50 p-6">
                  <p className="text-[12px] font-medium uppercase tracking-[0.24em] text-crimson-600">
                    {thing.kicker}
                  </p>
                  <img
                    src={thing.image}
                    alt={thing.kicker}
                    className="w-full h-80 rounded-xl object-cover"
                  />

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
              title="A few entries."
            />
            <div className="mt-10 flex flex-col gap-10">
              {entries.map((entry, i) => (
                <FadeIn key={`${entry.date}-${i}`} delay={i * 0.06}>
                  <article className="flex flex-col md:flex-row gap-5 rounded-2xl border border-navy-700/10 bg-cream-50 p-6">

                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="h-52 w-40 flex-shrink-0 rounded-xl object-cover"
                  />

                  <div className="flex flex-col gap-2">
                    <p className="text-[15px] font-medium uppercase tracking-[0.24em] text-crimson-600">
                      {entry.title}
                    </p>

                    <p className="text-[12px] text-navy-700/60">
                      {entry.date}
                    </p>

                    <p className="text-[15px] leading-relaxed text-navy-700/85">
                      {entry.body}
                    </p>
                  </div>
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

export default SofiaBalsamo
