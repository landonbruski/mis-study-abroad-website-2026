/**
 * Tamilore Olaniyan, Portugal 2026.
 *
 * Personal page at /students/tamilore-olaniyan. Keep `export default` at the bottom.
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FadeIn } from '../components/ui/FadeIn'
import { SectionHeader } from '../components/ui/SectionHeader'

const P = '/students/tamilore-olaniyan'

const sectionNav = [
  { id: 'favorite-day', label: 'Favorite Day' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'three-things', label: 'Three Things' },
  { id: 'curriculum', label: 'Course Curriculum' },
  { id: 'scenery', label: 'Scenery' },
  { id: 'friends', label: 'Friends' },
  { id: 'food', label: 'Food' },
  { id: 'me', label: 'Me' },
  { id: 'learn-more', label: 'Learn More' },
]

/* -------- 1. Profile -------- */
const me = {
  name: 'Tamilore Olaniyan',
  year: 'Senior',
  major: 'Management Information Systems',
  hometown: 'Houston, Texas',
  tagline:
    'Management Information Systems senior with my sights set on strategy consulting. I love a good problem to untangle and a team to help lead through it.',
  photo: `${P}/tamilore-olaniyan.jpg`,
}

/* -------- 2. Favorite day on the trip -------- */
const favoriteDay = {
  date: 'May 9',
  city: 'Sintra',
  title: 'Driving up to Pena Palace in the rain',
  body: [
    `I loved the buildup: driving up the mountain, walking through the rain, and finally seeing the palace.`,
    `It was so beautiful. I felt like I was on top of the entire world.`,
  ],
  images: [
    { src: `${P}/favorite/sintra-fog.jpg`, caption: 'Fog rolling through Sintra' },
    { src: `${P}/favorite/pena-palace.jpg`, caption: 'Pena Palace' },
  ],
}

/* -------- 3. Itinerary -------- */
const itinerary = [
  { date: 'May 5', city: 'Lisbon', title: 'Pre-night in Lisbon', body: 'Faculty leaders arrive a day early and check into the Hotel Dom Carlos Park.' },
  { date: 'May 6', city: 'Lisbon', title: 'Welcome to Lisbon', body: 'Land in Lisbon, check in, and kick off the trip with a welcome dinner.' },
  { date: 'May 7', city: 'Lisbon', title: 'City tour of Lisbon', body: 'Edward VII Park, Liberdade Avenue, and Rossio, then Belém for Jerónimos Monastery and Belém Tower, plus Lisbon Cathedral and the Miradouro de Santa Luzia.' },
  { date: 'May 8', city: 'Lisbon', title: 'Jerónimos, Maritime Museum & Monument to the Discoveries', body: 'Guided visits along the Tagus riverfront, then a free afternoon.' },
  { date: 'May 9', city: 'Sintra', title: 'Pena Palace & the Sintra tram', body: 'Touring the colorful Pena Palace and riding the vintage Sintra tram. My favorite day.' },
  { date: 'May 10', city: 'Lisbon', title: 'Benfica, street art & a food crawl', body: 'A tour of Estádio da Luz, then street art through Lisbon\'s most colorful neighborhoods and a food crawl.' },
  { date: 'May 11', city: 'Lisbon', title: 'TAGUSPARK & food tour', body: 'A food tour and an afternoon at TAGUSPARK, including a talk from the CEO and a visit to the business incubator.' },
  { date: 'May 12', city: 'Lisbon', title: 'Academic engagement & free afternoon', body: 'Program engagement in the morning, then a free afternoon before heading north.' },
  { date: 'May 13', city: 'Porto', title: 'On to Porto, via Coimbra', body: 'A stop at the historic University of Coimbra, then check-in at Holiday Inn Express Porto City Centre.' },
  { date: 'May 14', city: 'Porto', title: 'Zeentech & a tuk tuk city tour', body: 'Morning engagement, then a guided tuk tuk tour stopping at Porto Cathedral and Igreja dos Carmelitas.' },
  { date: 'May 15', city: 'Porto', title: 'Surf lesson & cooking class', body: 'A surf lesson on the Atlantic coastline, followed by a hands-on Portuguese cooking class.' },
  { date: 'May 16', city: 'Braga', title: 'Day trip to Braga', body: 'Braga Cathedral, the oldest in Portugal, then the Bom Jesus do Monte sanctuary and its 583-step staircase.' },
  { date: 'May 17', city: 'Porto', title: 'Free day in Porto', body: 'Ribeira, the Dom Luís I Bridge, Livraria Lello, whatever we were in the mood for.' },
  { date: 'May 18', city: 'Porto', title: 'Class meeting & farewell dinner cruise', body: 'Final class meeting, then a farewell dinner cruise on the Douro River.' },
  { date: 'May 19', city: 'Porto', title: 'Departure', body: 'Check out and head to the airport.' },
]

/* -------- 4. Three things -------- */
const threeThings = [
  {
    kicker: 'Best thing I ate',
    body: 'Octopus soup at the Michelin star restaurant we went to. I did not expect a bowl of soup to be the dish I am still thinking about, but here we are.',
  },
  {
    kicker: 'Something I did not expect',
    body: 'How nice the weather was. The forecast had called for cold the whole trip and we mostly got sun. I also did not expect how much stair climbing was involved. I hit a lifetime record, and I will never complain about the StairMaster again.',
  },
  {
    kicker: 'What I am bringing home',
    body: 'A reminder to refill my own cup. I read 7 Habits of Highly Effective People and Hidden Potential on this trip, and both hit the same note: you cannot keep pouring into your community if you never pour into yourself first.',
  },
]

/* -------- 5. Course curriculum -------- */
const curriculum = [
  {
    kicker: 'Classes',
    body: 'I attended classes in the morning where our class would discuss our readings and what we\'d learned throughout our time in Portugal. These classes helped me reflect comprehensively, as I was able to add my classmates\' perspectives to my own.',
  },
  {
    kicker: 'Books',
    body: 'I read 7 Habits of Highly Effective People by Stephen Covey and Hidden Potential by Adam Grant. Both books were extremely valuable in their own ways and taught me so much about remembering to refill my own cup, especially while doing so much to pour externally toward my campus community and those around me.',
  },
  {
    kicker: 'Company visits',
    body: 'I learned about the tech industry outside of the United States, visiting firms like CGI and Zeentech. It was very interesting to learn about how leadership styles and team dynamics worked abroad.',
  },
  {
    kicker: 'Cultural immersion',
    body: 'I was able to interact with Portuguese culture on a local level. I heard from Portuguese students, ate at a Michelin star restaurant for the first time, and reached a lifetime record of stair climbing. I will never complain about the StairMaster again.',
  },
]

/* -------- 6. Scenery gallery -------- */
const sceneryImages = [
  { src: `${P}/scenery/coimbra-rooftops.jpg`, caption: 'Rooftops over Coimbra' },
  { src: `${P}/scenery/coimbra-river.jpg`, caption: 'Looking out over the Mondego' },
  { src: `${P}/scenery/lisbon-square.jpg`, caption: 'A square in Lisbon' },
  { src: `${P}/scenery/tram-28.jpg`, caption: 'Tram 28' },
  { src: `${P}/scenery/sintra-hillside.jpg`, caption: 'Driving up through Sintra' },
  { src: `${P}/scenery/church-door.jpg`, caption: '' },
  { src: `${P}/scenery/bridge-view.jpg`, caption: 'The 25 de Abril Bridge in the distance' },
]

/* -------- 7. Friends gallery -------- */
const friendsImages = [
  { src: `${P}/friends/bookstore.jpg`, caption: 'Browsing in a Lisbon bookstore' },
  { src: `${P}/friends/rooftop-duo.jpg`, caption: 'Rooftop views in Lisbon' },
  { src: `${P}/friends/wine-bar.jpg`, caption: '' },
  { src: `${P}/friends/group-selfie.jpg`, caption: '' },
  { src: `${P}/friends/boat-selfie.jpg`, caption: 'The farewell cruise' },
  { src: `${P}/friends/benfica-presser.jpg`, caption: 'In the Benfica press room' },
  { src: `${P}/friends/pineapple-drink.jpg`, caption: '' },
  { src: `${P}/friends/alley-selfie.jpg`, caption: '' },
  { src: `${P}/friends/benfica-match.jpg`, caption: 'Benfica match day' },
  { src: `${P}/friends/benfica-stands.jpg`, caption: '' },
]

/* -------- 8. Food gallery -------- */
const foodImages = [
  { src: `${P}/food/sangria.jpg`, name: 'Sangria at a market', note: '' },
  { src: `${P}/food/dinner-plate-1.jpg`, name: 'Dinner in Lisbon', note: '' },
  { src: `${P}/food/dinner-plate-2.jpg`, name: 'Dinner at Restaurante Duque', note: '' },
]

/* -------- 9. Me gallery -------- */
const meImages = [
  { src: `${P}/me/pineapple-necklace.jpg`, caption: '' },
  { src: `${P}/me/coimbra-portrait.jpg`, caption: 'Overlooking Coimbra' },
  { src: `${P}/me/boat-portrait.jpg`, caption: 'On the farewell cruise' },
  { src: `${P}/me/elevator-ootd.jpg`, caption: '' },
]

/* ======================================================================= */

function MasonryGallery({ images }) {
  return (
    <div className="mt-10 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
      {images.map((img) => (
        <figure
          key={img.src}
          className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-100"
        >
          <img
            src={img.src}
            alt={img.caption}
            loading="lazy"
            decoding="async"
            className="w-full transition-transform duration-700 group-hover:scale-[1.03]"
          />
          {img.caption && (
            <>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/0 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-[13px] font-medium leading-snug text-cream-50">
                {img.caption}
              </figcaption>
            </>
          )}
        </figure>
      ))}
    </div>
  )
}

export function TamiloreOlaniyan() {
  let sectionNum = 0
  const next = () => String(++sectionNum).padStart(2, '0')

  return (
    <div className="relative flex min-h-screen flex-col bg-cream-50 text-navy-700">
      {/* Hero */}
      <header className="relative overflow-hidden bg-cream-100 pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(60%_60%_at_15%_10%,#D9A44133_0%,transparent_60%),radial-gradient(50%_50%_at_85%_90%,#3F7AA322_0%,transparent_60%)]" />
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
              <span className="inline-flex items-center gap-2.5 rounded-full border border-navy-700/10 bg-cream-50/90 px-4 py-2.5 backdrop-blur">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-crimson-600">
                  Hometown
                </span>
                <span className="h-3 w-px shrink-0 bg-navy-700/15" aria-hidden="true" />
                <span className="text-sm font-medium tracking-tight text-navy-700">
                  {me.hometown}
                </span>
              </span>
            </div>
            <div className="mt-6">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.24em] text-navy-700/50">
                Jump to section &darr;
              </p>
              <div className="flex flex-wrap gap-2.5">
                {sectionNav.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-navy-700/20 bg-cream-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-700 shadow-sm transition-all hover:border-crimson-600 hover:bg-crimson-600 hover:text-cream-50 hover:shadow-md"
                  >
                    <span className="inline-block transition-transform group-hover:translate-y-px">&darr;</span>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gold-400/25 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-navy-700/10 bg-cream-50 shadow-deep">
              <div className="aspect-4/5 overflow-hidden bg-cream-100">
                <img src={me.photo} alt={me.name} className="h-full w-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Favorite day */}
      <section id="favorite-day" className="scroll-mt-24 bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-5 md:px-10">
          <SectionHeader
            number={next()}
            kicker={`${favoriteDay.city} · ${favoriteDay.date}`}
            title={favoriteDay.title}
          />

          <FadeIn delay={0.1}>
            <figure className="mt-10 overflow-hidden rounded-3xl border border-navy-700/10 shadow-deep">
              <img
                src={favoriteDay.images[0].src}
                alt={favoriteDay.images[0].caption}
                loading="lazy"
                className="aspect-video w-full object-cover bg-cream-100"
              />
              <figcaption className="bg-cream-100 px-5 py-3 text-[13px] text-navy-700/60">
                {favoriteDay.images[0].caption}
              </figcaption>
            </figure>
          </FadeIn>

          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-start">
            <FadeIn delay={0.15}>
              <figure className="overflow-hidden rounded-3xl border border-navy-700/10 bg-cream-100">
                <img
                  src={favoriteDay.images[1].src}
                  alt={favoriteDay.images[1].caption}
                  loading="lazy"
                  className="aspect-4/5 w-full object-cover"
                />
                <figcaption className="px-5 py-3 text-[13px] text-navy-700/60">
                  {favoriteDay.images[1].caption}
                </figcaption>
              </figure>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-col gap-5">
                {favoriteDay.body.map((para, i) => (
                  <p
                    key={i}
                    className="font-display text-xl leading-relaxed text-navy-700/90 text-pretty md:text-2xl"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section id="itinerary" className="scroll-mt-24 bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <SectionHeader
            number={next()}
            kicker="May 5 &ndash; 19"
            title="Where we were, day by day."
          />
          <div className="mt-10 flex flex-col gap-0">
            {itinerary.map((day, i) => (
              <FadeIn key={day.date} delay={(i % 5) * 0.05}>
                <div className="flex gap-6 border-t border-navy-700/10 py-5 first:border-t-0">
                  <div className="w-20 shrink-0 sm:w-28">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-crimson-600">
                      {day.date}
                    </p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-navy-700/45">
                      {day.city}
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-lg leading-snug text-navy-700">
                      {day.title}
                    </p>
                    <p className="mt-1 text-[14px] leading-relaxed text-navy-700/75">
                      {day.body}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Three things */}
      <section id="three-things" className="scroll-mt-24 bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader number={next()} kicker="Three things" title="A small list." />
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {threeThings.map((thing, i) => (
              <FadeIn key={thing.kicker} delay={i * 0.08}>
                <article className="flex h-full flex-col gap-3 rounded-2xl border border-navy-700/10 bg-cream-100 p-6">
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

      {/* Course curriculum */}
      <section id="curriculum" className="scroll-mt-24 bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader number={next()} kicker="Course curriculum" title="What the classroom side looked like." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-6">
            {curriculum.map((item, i) => (
              <FadeIn key={item.kicker} delay={i * 0.06}>
                <article className="flex h-full flex-col gap-3 rounded-2xl border border-navy-700/10 bg-cream-50 p-6">
                  <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-crimson-600">
                    {item.kicker}
                  </p>
                  <p className="text-[15px] leading-relaxed text-navy-700/85">
                    {item.body}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Scenery gallery */}
      <section id="scenery" className="scroll-mt-24 bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader number={next()} kicker="The scenery" title="Finding beauty in everything." />
          <MasonryGallery images={sceneryImages} />
        </div>
      </section>

      {/* Friends gallery */}
      <section id="friends" className="scroll-mt-24 bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader number={next()} kicker="Friends" title="Memory lane." />
          <MasonryGallery images={friendsImages} />
        </div>
      </section>

      {/* Food gallery */}
      <section id="food" className="scroll-mt-24 bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader number={next()} kicker="What I ate" title="Stand-out plates." />
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {foodImages.map((item, i) => (
              <FadeIn key={item.src} delay={(i % 3) * 0.06}>
                <figure className="flex h-full flex-col">
                  <div className="overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-100">
                    <img
                      src={item.src}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <p className="font-display text-lg leading-tight tracking-tight text-navy-700">
                      {item.name}
                    </p>
                    {item.note && (
                      <p className="mt-1.5 text-[14px] leading-relaxed text-navy-700/75">
                        {item.note}
                      </p>
                    )}
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Me gallery */}
      <section id="me" className="scroll-mt-24 bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader number={next()} kicker="Me" title="A few of my favorites." />
          <MasonryGallery images={meImages} />
        </div>
      </section>

      {/* Learn more / video */}
      <section id="learn-more" className="scroll-mt-24 bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <SectionHeader number={next()} kicker="Learn more" title="My vlog from Lisbon." />
          <FadeIn delay={0.1}>
            <div className="mt-10 overflow-hidden rounded-3xl border border-navy-700/10 shadow-deep">
              <div className="relative aspect-video bg-cream-100">
                <iframe
                  src="https://www.youtube.com/embed/zGS6h8DHkOU?start=3054"
                  title="Lisbon vlog"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-navy-700/75">
              Unfortunately my hard drive corrupted, so I wasn&apos;t able to put together the
              second vlog documenting my time in Porto.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Final message */}
      <section className="bg-cream-100 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-10">
          <SectionHeader number={next()} kicker="Final message" title="Obrigada, Portugal." />
          <FadeIn delay={0.1}>
            <p className="mt-8 font-display text-xl leading-relaxed text-navy-700/90 text-pretty md:text-2xl">
              Between Pena Palace in the rain, octopus soup, and way more stairs than I was
              prepared for, this trip gave me a lot to bring home. Grateful for the cohort and
              for a month in Portugal I will not forget.
            </p>
          </FadeIn>
        </div>
      </section>

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

export default TamiloreOlaniyan
