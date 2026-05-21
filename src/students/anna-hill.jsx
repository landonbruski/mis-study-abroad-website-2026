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
  name: 'Anna Hill',
  year: 'Senior', // Freshman / Sophomore / Junior / Senior / MS
  major: 'Management Information Systems and Accounting',
  hometown: 'Huntsville, AL',
  tagline: 'Adventure seeker, coffee enthusiast, and photographer, capturing the world through my lens.',
  /** A photo in /public/students/your-slug.jpg works best. */
  photo: '/students/anna-hill.jpg',
}

/* -------- 2. Favorite day on the trip -------- */
const favoriteDay = {
  date: 'May 11',
  city: 'Lisbon',
  title: 'The night we went to the Benfica game vs. Braga',
  body: `After touring the Benfica stadium the day prior, we got to attend a Benfica game against Braga. The energy in the stadium was unmatched and the crowd was fully engaged the entire time. The game ended in a tie and I left feeling as though I had gotten the full soccer experience.`,
}

/* -------- 3. Three things -------- */
const threeThings = [
  {
    kicker: 'Best thing I ate',
    body: 'Grilled tenderloin steak with potato gratin, ratatouille, and truffled mushroom sauce at Flow Restaurant & Bar in Porto.',
  },
  {
    kicker: 'Something I did not expect',
    body: 'I did not expect the atmosphere of the soccer match in Portugal to rival that of a Saturday night in Bryant-Denny stadium.',
  },
  {
    kicker: 'What I am bringing home',
    body: 'An appreciation for intentional leisure over constant rushing and of course Portugal tiles!',
  },
]

/* -------- 4. Journal entries (optional, as many as you want) -------- */
const entries = [
  {
    date: 'May 6',
    title: 'First Impressions of Portugal',
    body: `Arriving in Portugal was exciting because I went into the trip with expectations shaped by my previous travels to European countries like Croatia, Italy, and France. Even though I had experienced Europe before, Portugal immediately felt unique. From the cuisine to the culture, everything felt like a completely new experience. One of the first things I noticed was how different the food was compared to other countries I had visited. Traditional foods like cod and pastel de nata quickly became staples throughout the trip and gave me a new appreciation for Portuguese cuisine.

One of the best parts of arriving in Portugal was meeting new people within the MIS program and getting to experience the culture together from the very beginning. During our welcome dinner, we were introduced to a variety of Portuguese dishes, including prawns, octopus, mango mousse, and more. Trying unfamiliar foods while getting to know my classmates made the experience even more memorable. From the moment the trip began, I could tell this study abroad experience would push me outside of my comfort zone in the best way possible, and I was excited to see what the rest of the trip had in store.`,
  },
  {
    date: 'May 15',
    title: 'Learning Through Experience: Surfing and Cooking in Portugal',
    body: `One of my favorite experiences while studying abroad in Portugal was participating in both a surfing lesson and a cooking class taught by locals with my classmates on the same day. These activities allowed me to experience Portuguese culture in a hands-on way while also stepping outside of my comfort zone. Trying new things alongside friends made the experiences even more memorable and helped bring our group closer together.

The cooking class was another highlight of the trip because my friends and I got to make traditional Portuguese pastel de nata together. Learning how to prepare the pastries from scratch gave me a greater appreciation for Portuguese food. It was fun to work together, bond through the process, and enjoy something we created ourselves. I also loved getting to try all the other dishes each group made!`,
  },

  {
    date: 'May 17',
    title: 'A Free Day in the National Park',
    body: `One of the most rewarding experiences from my study abroad trip to Portugal was spending a free day exploring a national park with two other students in my program. After spending most of our trip in busy cities like Lisbon and Porto, it was refreshing to experience the quieter, more natural side of Portugal. During our hike, we saw incredible views, visited a breathtaking waterfall, swam in the spring water, and enjoyed being fully immersed in nature. We also started our day in a small town outside the park, where we picked up fresh fruit and pastries from a local shop before beginning the trail. By the end of the day, we had walked around 14 miles, making the experience both challenging and rewarding.

The trip also became a great bonding experience and taught me important lessons about traveling abroad. We relied on one bus scheduled to arrive around 5:30 p.m., and if we missed it, the next bus would not come until 7:00 the next morning. After brainstorming, we walked to the most populated nearby town, pulled out euros from the ATM to ensure we could get on the bus, and asked the locals about the bus schedule. As it got later, I started to become nervous, but luckily my peers remained calm and positive throughout the situation. Everything worked out in the end, and the experience reminded me of the importance of flexibility, preparation, and staying positive when unexpected challenges arise while traveling.`,
  },
]

/* ======================================================================= */
/*  You usually do not need to edit anything below this line.              */
/*  Rename the component to your name in CamelCase before you export.      */
/* ======================================================================= */

export function StudentTemplate() {
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
                  <article>
                    <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-crimson-600">
                      {entry.date}
                    </p>
                    <h3 className="mt-2 font-display text-3xl leading-tight tracking-tight text-navy-700">
                      {entry.title}
                    </h3>
                    <div className="mt-4 flex flex-col gap-4">
                      {entry.body.split(/\n\n+/).map((paragraph, j) => (
                        <p
                          key={j}
                          className="text-[15px] leading-relaxed text-navy-700/85 text-pretty"
                        >
                          {paragraph.trim()}
                        </p>
                      ))}
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

export default StudentTemplate
