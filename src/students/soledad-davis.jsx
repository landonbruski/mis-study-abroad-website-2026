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
  name: 'Soli Davis',
  year: 'Senior', // Freshman / Sophomore / Junior / Senior / MS
  major: 'Management Information Systems',
  hometown: 'Katy, Texas',
  tagline: 'A person who typically hates traveling, but loved this trip!',
  /** A photo in /public/students/your-slug.jpg works best. */
  photo: '/students/soledad-davis/soledad-davis.jpg',
}

/* -------- 2. Favorite day on the trip -------- */
const favoriteDay = {
  date: 'May 16th',
  city: 'Braga & Porto',
  title: 'A quiet, serene morning in Braga and a rambunctious, chaotic evening in Porto ',
  body: `We started our day off by taking a bus to Braga. The cathederal there and surrounding gardens were absolutely beautiful, and all of us loved taking pictures there. After our visit to Braga, we were able to attend a parade celebrating Porto being crowned as Primeira Liga Champions. The energy was amazing and we had so much fun watching fireworks and hearing their chants.`,
  // This is where I left
  photo: '/students/soledad-davis/photo-one.jpg',
  /*
  images: [
    { src: '/students/landon-bruski/favorite/geres-valley.jpg', alt: 'A green river valley and reservoir in the Gerês hills' },
    { src: '/students/landon-bruski/favorite/geres-waterfall.jpg', alt: 'Landon in front of a waterfall in Peneda-Gerês' },
  ],
  */
}


/* -------- 3. Three things -------- */
const threeThings = [
  {
    kicker: 'Best thing I ate:',
    body: 'On our second day in Lisbon, we got lunch at this beautiful little italian place. They had this delicious carbonara, and I ate the entire dish. The pasta was so creamy and the salty flavor of the guanciale balanced the whole dish perfectly. If I ever go back to Lisbon, I will run straight to that place to have their carbonara again!',
  },
  {
    kicker: 'Something I did not expect:',
    body: 'The people, mainly in Lisbon, had nooo concept of personal space. It was especially bad while shopping. One time, I was trying on some sunglasses in front of this mirror and this woman walked in front of me to hold up a shirt in front of herself. At Zara, multiple people reached over me to grab shirts of the rack instead of just waiting for me to move.',
  },
  {
    kicker: 'What I am bringing home:',
    body: 'I ended up getting quite a few souvenirs. My favorite ones were all jewelry from Lisbon. Emily recommended this place that allowed you to make your own italian charm bracelet. I had so much fun picking out all the charms and placing them in the order that I wanted. Everytime I look at that bracelet, I will remember the fun times I had in Lisbon!',
  },
]

/* -------- 4. Journal entries (optional, as many as you want) -------- */
const entries = [
  {
    date: 'May 5th & 6th',
    title: 'Arrival in Lisbon',
    body: 'One of my biggest fears for my trip was getting bad jet lag. I had heard horror stories of people not being able to sleep well for days, and I did not want that to happen to me. I decided to follow the advice Jeff gave us and not nap once I reached the hotel. At first, I was doing okay. I felt a little sleepy, but nothing too bad. When we finished dinner, it was a totally different story. I was fighting to stay awake as we walked to the gelato place. I felt like my brain was melting. When we accidentally went the wrong way on the subway, I thought I was going to die from exhaustion. I ended up falling asleep within seconds once we finally got back and laid down. Maybe next time, I will allow myself a 30 minute nap >_<.',
  },
  {
    date: 'May 18th',
    title: 'Final full day in Porto',
    body: 'Before we began the trip, I was invited to go to Spain for a few days after the trip. In the moment, I said no. I told them that I figured I would most likely be super homesick and would not want to stay the extra days. Man was I wrong. On our final day, I was not ready to leave at all. I could have easily stayed another week in Europe. I was having so much fun doing all this exploring, eating, and shopping. I also was sad to leave all of my amazing friends, as I had loved getting to spend so much time with them on the trip.',
  },
]

/* ======================================================================= */
/*  You usually do not need to edit anything below this line.              */
/*  Rename the component to your name in CamelCase before you export.      */
/* ======================================================================= */

export function SoledadDavis() {
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
            kicker={`${favoriteDay.city}; ${favoriteDay.date}`}
            title={favoriteDay.title}
          />
          <FadeIn delay={0.1}>
            <p className="mt-8 font-display text-xl leading-relaxed text-navy-700/90 md:text-2xl">
              {favoriteDay.body}
            </p>
            {favoriteDay.photo && (
              <div className="mt-10 mx-auto max-w-md overflow-hidden rounded-2xl border border-navy-700/10 shadow-sm">
                <img 
                  src={favoriteDay.photo} 
                  alt="My favorite day in Portugal" 
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Three things */}
      <section className="bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="02"
            kicker="Three things"
            title="New Surprises!"
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

export default SoledadDavis
