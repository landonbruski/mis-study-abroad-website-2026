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
  /** Profile photo: public/students/emily-garcia/profile.jpg */
  photo: '/students/emily-garcia/profile.jpg',
  linkedin: 'https://www.linkedin.com/in/emily-garcia1/',
  portfolio: 'https://emilyrgarcia.com/',
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
    image: '/students/emily-garcia/restaurant-pace.png',
    imageAlt: 'Cohort sharing tapas at a restaurant in Portugal',
    imageHint: 'restaurant-pace.png',
    imageAspect: 'video',
  },
  {
    kicker: 'Game Day Traditions',
    body: 'Coming from Alabama, I thought I knew everything about big game days. But experiencing the FC Porto celebration and the Benfica match showed me a completely different side of sports culture. I\'m definitely bringing home an appreciation for how music, community, and sports bring people together in Europe.',
    image: '/students/emily-garcia/game-day-traditions.png',
    imageAlt: 'Group at a nighttime sports celebration in Portugal',
    imageHint: 'game-day-traditions.png',
    imageAspect: 'video',
  },
  {
    kicker: 'Global Business',
    body: 'Visiting the corporate offices of CGI was incredibly eye-opening. Getting a firsthand look at their operations and international pipelines showed me exactly how distributed teams manage strategy in real time. It gave me a much clearer perspective on what it takes to scale enterprise tech solutions across different countries.',
    image: '/students/emily-garcia/global-business.png',
    imageAlt: 'Cohort at the CGI corporate offices',
    imageHint: 'global-business.png',
    imageAspect: 'video',
  },
]

/* -------- 4. Journal entries (optional, as many as you want) -------- */
const entries = [
  {
    date: 'May 6',
    title: 'First Looks at Lisbon',
    body: 'Landing in Lisbon and seeing the city for the first time was incredible. The old buildings and tilework are beautiful, and it\'s been a great backdrop for our first week of exploring and visiting companies.',
    image: '/students/emily-garcia/journal-lisbon.png',
    imageAlt: 'Panoramic view over Lisbon rooftops toward Rossio Square',
    imageHint: 'journal-lisbon.png',
  },
  {
    date: 'May 14',
    title: 'TukTuk Tour in Porto',
    body: 'We took a TukTuk tour through Porto and it was awesome. Our driver, Miguel, gave us great advice on the best local spots to check out and which tourist-trap areas to avoid so we could get a real feel for the city.',
    image: '/students/emily-garcia/journal-tuktuk.png',
    imageAlt: 'Cohort at a scenic overlook above Porto and the Douro',
    imageHint: 'journal-tuktuk.png',
  },
  {
    date: 'May 16',
    title: "Porto's Celebration",
    body: 'We stumbled right into the FC Porto celebration and the energy was electric. It was so much fun to see how the entire city shuts down to celebrate their team. It really made us feel like we were experiencing the authentic local culture.',
    image: '/students/emily-garcia/journal-porto-celebration.png',
    imageAlt: 'FC Porto championship celebration at night',
    imageHint: 'journal-porto-celebration.png',
  },
  {
    date: 'May 17',
    title: 'A Day in Aveiro',
    body: 'Spent the day visiting Aveiro, which everyone calls the Venice of Portugal because of the canals. Aside from being beautiful, we learned that the local university actually invented the technology behind electronic toll passes (like EZ-Pass), which was extremely interesting to hear more about.',
    image: '/students/emily-garcia/journal-aveiro.png',
    imageAlt: 'Colorful ribbons on the bridge in Aveiro',
    imageHint: 'journal-aveiro.png',
  },
]

/**
 * All photos live in public/students/emily-garcia/
 *
 *   profile.jpg
 *   benfica-stadium-view.png, benfica-match-seats.png, benfica-eagle-statue.png
 *   restaurant-pace.png, game-day-traditions.png, global-business.png
 *   journal-lisbon.png, journal-tuktuk.png, journal-porto-celebration.png, journal-aveiro.png
 */

/* ======================================================================= */
/*  You usually do not need to edit anything below this line.              */
/*  Rename the component to your name in CamelCase before you export.      */
/* ======================================================================= */

const bodyText = 'font-sans font-normal leading-relaxed text-navy-700/85'

function BenficaGallery() {
  const frame =
    'relative min-h-0 overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-100 shadow-sm'
  const img = 'absolute inset-0 size-full object-cover'

  return (
    <div className="grid w-full grid-cols-1 gap-3 md:aspect-[3/2] md:grid-cols-2 md:grid-rows-2">
      {/* Left — portrait stadium (full height) */}
      <div className={`${frame} aspect-[3/4] md:row-span-2 md:aspect-auto`}>
        <img
          src="/students/emily-garcia/benfica-stadium-view.png"
          alt="Estádio da Luz and the Benfica pitch from the stands"
          className={`${img} object-center`}
          loading="lazy"
        />
      </div>

      {/* Top right — match day selfie */}
      <div className={`${frame} aspect-[4/3] md:aspect-auto`}>
        <img
          src="/students/emily-garcia/benfica-match-seats.png"
          alt="In the stands on Benfica match day"
          className={`${img} object-center`}
          loading="lazy"
        />
      </div>

      {/* Bottom right — eagle statue */}
      <div className={`${frame} aspect-[4/3] md:aspect-auto`}>
        <img
          src="/students/emily-garcia/benfica-eagle-statue.png"
          alt="Cohort in front of the Benfica eagle statue during the stadium tour"
          className={`${img} object-center`}
          loading="lazy"
        />
      </div>
    </div>
  )
}

function ContentImage({ src, alt, aspect = 'video', hint, flush = false, className = '' }) {
  const aspectClass =
    aspect === '4/5'
      ? 'aspect-4/5'
      : aspect === '3/4'
        ? 'aspect-[3/4]'
        : aspect === 'square'
          ? 'aspect-square'
          : 'aspect-video'
  const radius = flush ? 'rounded-none border-x-0 border-t-0' : 'rounded-2xl border border-navy-700/10 shadow-sm'

  if (src) {
    return (
      <div className={`overflow-hidden bg-cream-100 ${radius} ${aspectClass} ${className}`}>
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 border border-dashed border-navy-700/15 bg-linear-to-br from-cream-100 to-cream-50 px-4 py-8 text-center ${radius} ${aspectClass} ${className}`}
      aria-hidden="true"
    >
      <span className="font-medium text-[10px] uppercase tracking-[0.22em] text-crimson-600/70">
        Photo
      </span>
      <span className="max-w-[14rem] text-xs leading-relaxed text-navy-700/45">{hint}</span>
    </div>
  )
}

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
        <div className="mx-auto max-w-6xl px-5 md:px-10">
          <SectionHeader
            number="01"
            kicker={`${favoriteDay.city} · ${favoriteDay.date}`}
            title={favoriteDay.title}
          />
          <FadeIn delay={0.1}>
            <div className="mt-8 flex flex-col gap-8">
              <p className={`max-w-3xl text-base md:text-lg ${bodyText}`}>
                {favoriteDay.body}
              </p>
              <BenficaGallery />
            </div>
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
                <article className="flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-50 p-0">
                  <ContentImage
                    src={thing.image}
                    alt={thing.imageAlt}
                    aspect={thing.imageAspect ?? '3/4'}
                    flush
                    className={
                      thing.imageAspect === 'video'
                        ? 'min-h-[12rem] sm:min-h-[14rem]'
                        : 'min-h-[16rem] sm:min-h-[18rem] md:min-h-[20rem]'
                    }
                    hint={`Add public/students/emily-garcia/${thing.imageHint}`}
                  />
                  <div className="flex flex-col gap-3 px-6 pb-6">
                    <h3 className="text-lg font-bold capitalize text-navy-700">
                      {thing.kicker}
                    </h3>
                    <p className={`text-[15px] ${bodyText}`}>{thing.body}</p>
                  </div>
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
                  <article className="grid gap-6 md:grid-cols-2 md:items-start">
                    <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                      <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-crimson-600 normal-case">
                        {entry.date}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold capitalize md:text-3xl">
                        {entry.title}
                      </h3>
                      <p className={`mt-4 text-[15px] text-pretty ${bodyText}`}>
                        {entry.body}
                      </p>
                    </div>
                    <ContentImage
                      src={entry.image}
                      alt={entry.imageAlt}
                      aspect="4/5"
                      hint={`Add public/students/emily-garcia/${entry.imageHint}`}
                    />
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
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <p className="text-sm font-normal text-cream-50/75">
              &mdash; {me.name}, UA MIS Portugal 2026
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={me.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cream-50/30 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-cream-50/85 transition-colors hover:border-gold-400 hover:text-cream-50"
              >
                LinkedIn
              </a>
              <a
                href={me.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cream-50/30 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-cream-50/85 transition-colors hover:border-gold-400 hover:text-cream-50"
              >
                Portfolio
              </a>
            </div>
          </div>
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
