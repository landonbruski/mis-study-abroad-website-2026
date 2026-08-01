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

/**
 * Donovan Nguyen — Portugal 2026.
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FadeIn } from '../components/ui/FadeIn'
import { SectionHeader } from '../components/ui/SectionHeader'

const P = '/students/donovan-nguyen'

const me = {
  name: 'Donovan Nguyen',
  year: 'Senior',
  major: 'Management Information Systems & Minor in Chinese',
  hometown: 'Petal, MS & Tuscaloosa, AL',
  tagline:
    "I'm a Management Information Systems major with a minor in Chinese at the University of Alabama who enjoys traveling, meeting new people, and collecting experiences that help me better understand the world and myself.",
  photo: `${P}/me/hero-cable-car.jpg`,
  email: 'dhnguyen3@crimson.ua.edu',
  linkedin: 'https://linkedin.com/in/donovan-nguyen-346403256',
}

const jumpLinks = [
  { label: 'Favorite Day', href: '#favorite-day' },
  { label: 'Three Things', href: '#three-things' },
  { label: 'Korea to Portugal', href: '#korea-portugal' },
  { label: 'Scenery', href: '#scenery' },
  { label: 'Friends', href: '#friends' },
  { label: 'Food', href: '#food' },
  { label: 'MIS Abroad', href: '#mis-abroad' },
]

const favoriteDay = {
  date: 'May 15',
  city: 'Porto',
  title: 'If I Had to Pick One Day',
  body: `Choosing a favorite day from this trip is honestly difficult because every day offered something different. The whole trip was really fun for me, especially getting to experience it with classmates from my cohort and major field. If I had to choose one day, it would probably be the day we had our surfing lesson and cooking lesson in Porto. It was one of the few days where we could relax a little, try something new, laugh together, and simply enjoy being in the moment.`,
  images: [
    {
      src: `${P}/favorite-day/favorite-surfing.jpg`,
      alt: 'Surfing lesson group photo in Porto',
      caption:
        'Surfing in Porto was tiring, funny, and one of the most memorable parts of the trip.',
    },
    {
      src: `${P}/favorite-day/favorite-cooking.jpg`,
      alt: 'Cooking class group photo in Porto',
      caption:
        'The cooking class gave us time to slow down, work together, and enjoy a meal we helped create.',
    },
  ],
}

const threeThings = [
  {
    kicker: 'Best thing I ate',
    body: 'It is hard to choose just one thing because Portugal had so many good food moments. I loved the pastel de nata, gelato runs, francesinha, seafood dishes, and random meals with friends.',
    image: `${P}/food/francesinha.jpg`,
    imageAlt: 'Francesinha in Portugal',
  },
  {
    kicker: 'Something I did not expect',
    body: 'I knew Portugal had hills, but I was not prepared for how steep some of them were. Some days felt like I was doing the StairMaster at the gym. Even after spending time in Korea and climbing plenty of stairs there, Portugal somehow felt like even more cardio.',
    image: `${P}/scenery/lisbon-view.jpg`,
    imageAlt: 'Hilly view in Portugal',
  },
  {
    kicker: 'What I am bringing home',
    body: 'I am bringing home the memories and bonds I made with people on this trip. Getting to meet new people and get to know classmates better made the experience unforgettable. The places were beautiful, but the people made the trip mean so much more.',
    image: `${P}/friends/group-dinner.jpg`,
    imageAlt: 'Group dinner in Portugal',
  },
]

const koreaVsPortugal = [
  {
    src: `${P}/korea/korea-hanbok.jpg`,
    alt: 'Donovan wearing traditional Korean hanbok',
    caption:
      'Before Portugal, I spent two months in South Korea through an international internship. Korea helped me grow more independent while living and working abroad.',
  },
  {
    src: `${P}/me/lisboa-sign.jpg`,
    alt: 'Donovan in front of Lisboa sign',
    caption:
      'Portugal gave me a different kind of experience. Instead of traveling alone or working abroad, I got to explore a new country with classmates and build stronger friendships along the way.',
  },
]

const lensPhotos = [
  {
    src: `${P}/scenery/pena-palace.jpg`,
    alt: 'Pena Palace in Sintra',
    caption: 'Pena Palace felt unreal in person.',
  },
  {
    src: `${P}/scenery/braga-view.jpg`,
    alt: 'View from Braga',
    caption: 'One of the best views from the trip.',
  },
  {
    src: `${P}/scenery/monument-discoveries.jpg`,
    alt: 'Monument of the Discoveries',
    caption: 'A sunny day by the water in Lisbon.',
  },
  {
    src: `${P}/scenery/porto-waterfront-view.jpg`,
    alt: 'Porto waterfront',
    caption: 'Porto quickly became one of my favorite places.',
  },
  {
    src: `${P}/scenery/lisbon-tram.jpg`,
    alt: 'Lisbon tram',
    caption: 'The classic Lisbon tram moment.',
  },
  {
    src: `${P}/me/christ-king.jpg`,
    alt: 'Christ the King statue',
    caption: 'A big view and an even bigger statue.',
  },
]

const peoplePhotos = [
  {
    src: `${P}/friends/cohort-church.jpg`,
    alt: 'Cohort group photo in Portugal',
    caption: 'The cohort made the experience special.',
  },
  {
    src: `${P}/friends/cohort-eagle.jpg`,
    alt: 'Cohort group photo at Benfica',
    caption: 'A group memory from Benfica.',
  },
  {
    src: `${P}/friends/market-selfie.jpg`,
    alt: 'Group selfie at local market',
    caption: 'Some of the best memories happened around the table.',
  },
  {
    src: `${P}/friends/pineapple-group.jpg`,
    alt: 'Friends with pineapple drinks',
    caption: 'A random moment that became one of my favorite photos.',
  },
  {
    src: `${P}/friends/friendship-selfie.jpg`,
    alt: 'Friendship selfie',
    caption: 'Getting to know people better was one of the best parts of the trip.',
  },
  {
    src: `${P}/friends/titanic-boat.jpg`,
    alt: 'Funny boat photo',
    caption: 'The silly moments deserve their own place too.',
  },
]

const foodPhotos = [
  {
    src: `${P}/food/francesinha.jpg`,
    alt: 'Francesinha in Portugal',
    caption: 'Francesinha was one of the foods I was excited to try in Porto.',
  },
  {
    src: `${P}/food/food-bifana.jpg`,
    alt: 'Portuguese sandwich',
    caption: 'A quick bite while exploring.',
  },
  {
    src: `${P}/food/food-pineapple.jpg`,
    alt: 'Pineapple drink in Portugal',
    caption: 'A random pineapple drink that became part of the memory.',
  },
  {
    src: `${P}/food/food-ribs.jpg`,
    alt: 'Pork ribs in Portugal',
    caption: 'When the food is that good.',
  },
  {
    src: `${P}/food/food-fine-dining.jpg`,
    alt: 'Fine dining dish',
    caption: 'Portugal had everything from casual meals to beautiful plated dishes.',
  },
  {
    src: `${P}/food/food-seafood.jpg`,
    alt: 'Seafood dish',
    caption: 'Seafood was definitely one of the highlights.',
  },
]

const misPhotos = [
  {
    src: `${P}/academics/cgi-visit.jpg`,
    alt: 'CGI company visit',
    caption:
      'Visiting companies like CGI connected the trip back to MIS and global business.',
  },
  {
    src: `${P}/academics/benfica-press-room.jpg`,
    alt: 'Benfica press room',
    caption:
      'Benfica gave us a different look at sports, culture, and operations in Portugal.',
  },
  {
    src: `${P}/academics/benfica-game.jpg`,
    alt: 'Benfica soccer game',
    caption:
      'The energy at the Benfica match was something I had never experienced before.',
  },
]

const finalReflection = {
  title: 'More Than a Study Abroad Trip',
  body: `Portugal was more than just a place I visited. It became a collection of memories with classmates, new friends, and people I got to know better throughout the trip. The bonds and memories we shared are immeasurable, and they are something I will never forget. Looking back, the best part was not just the cities, the food, or the views. It was getting to experience all of it with the people around me.`,
}

function PhotoGrid({ photos }) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <figure
          key={photo.src}
          className="group overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-50 shadow-sm"
        >
          <div className="aspect-[4/3] overflow-hidden bg-cream-100">
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <figcaption className="p-4 text-[13px] leading-relaxed text-navy-700/75">
            {photo.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export function DonovanNguyen() {
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
              <span className="inline-flex items-center gap-2.5 rounded-full border border-navy-700/10 bg-cream-50/90 px-4 py-2.5 backdrop-blur">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-crimson-600">
                  Hometown
                </span>

                <span
                  className="h-3 w-px shrink-0 bg-navy-700/15"
                  aria-hidden="true"
                />

                <span className="text-sm font-medium tracking-tight text-navy-700">
                  {me.hometown}
                </span>
              </span>
            </div>

            <div className="mt-10">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-navy-700/60">
                Jump to section ↓
              </p>

              <div className="flex flex-wrap gap-3">
                {jumpLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-navy-700/20 bg-cream-50 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-navy-700 transition hover:border-crimson-600 hover:text-crimson-600"
                  >
                    ↓ {link.label}
                  </a>
                ))}
              </div>
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

      <section id="favorite-day" className="bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-10">
          <SectionHeader
            number="01"
            kicker={`${favoriteDay.city} · ${favoriteDay.date}`}
            title={favoriteDay.title}
          />

          <FadeIn delay={0.1}>
            <p className="mt-8 max-w-4xl text-lg leading-relaxed text-navy-700/85 md:text-xl">
              {favoriteDay.body}
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {favoriteDay.images.map((image) => (
                <figure
                  key={image.src}
                  className="overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-100 shadow-sm"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-80 w-full object-cover md:h-96"
                    loading="lazy"
                  />
                  <figcaption className="p-4 text-sm leading-relaxed text-navy-700/75">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="three-things" className="bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="02"
            kicker="Three things"
            title="A small list."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {threeThings.map((thing, i) => (
              <FadeIn key={thing.kicker} delay={i * 0.08}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-50">
                  <img
                    src={thing.image}
                    alt={thing.imageAlt}
                    className="h-72 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-crimson-600">
                      {thing.kicker}
                    </p>
                    <p className="text-[15px] leading-relaxed text-navy-700/85">
                      {thing.body}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="korea-portugal" className="bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="03"
            kicker="Comparison"
            title="From Korea to Portugal"
          />

          <p className="mt-8 max-w-3xl text-base leading-relaxed text-navy-700/80 md:text-lg">
            Before Portugal, I had already spent time abroad in South Korea. Korea
            helped me grow through independence and professional experience, while
            Portugal gave me the chance to grow through shared memories,
            friendships, and exploring a new culture with classmates.
          </p>

          <PhotoGrid photos={koreaVsPortugal} />
        </div>
      </section>

      <section id="scenery" className="bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="04"
            kicker="Photos"
            title="Portugal Through My Lens"
          />
          <PhotoGrid photos={lensPhotos} />
        </div>
      </section>

      <section id="friends" className="bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="05"
            kicker="Memories"
            title="The People Who Made the Trip"
          />

          <p className="mt-8 max-w-3xl text-base leading-relaxed text-navy-700/80 md:text-lg">
            The cities were beautiful, but the people made the trip. Getting to
            travel with classmates from my cohort and major field made every
            experience feel more meaningful.
          </p>

          <PhotoGrid photos={peoplePhotos} />
        </div>
      </section>

      <section id="food" className="bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="06"
            kicker="Food"
            title="Meals, Snacks, and Gelato Runs"
          />

          <p className="mt-8 max-w-3xl text-base leading-relaxed text-navy-700/80 md:text-lg">
            Food was one of the easiest ways to remember the trip. Some meals were
            planned, some were random, and some were quick stops with friends, but
            they all became part of the experience.
          </p>

          <PhotoGrid photos={foodPhotos} />
        </div>
      </section>

      <section id="mis-abroad" className="bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="07"
            kicker="MIS Abroad"
            title="Learning Outside the Classroom"
          />

          <p className="mt-8 max-w-3xl text-base leading-relaxed text-navy-700/80 md:text-lg">
            This trip was also connected to MIS, business, and technology. The
            company visits and cultural experiences helped me see how global
            business works outside of the classroom.
          </p>

          <PhotoGrid photos={misPhotos} />
        </div>
      </section>

      <section id="final-reflection" className="bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <SectionHeader
            number="08"
            kicker="Final reflection"
            title={finalReflection.title}
          />

          <FadeIn delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-navy-700/85 md:text-xl">
              {finalReflection.body}
            </p>
          </FadeIn>
        </div>
      </section>

      <footer className="bg-crimson-800 py-16 text-cream-50">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <p className="font-display text-3xl leading-tight tracking-tight text-cream-50 md:text-4xl">
            Thanks for reading.
          </p>

          <p className="mt-4 text-sm text-cream-50/75">
            &mdash; {me.name}, UA MIS Portugal 2026
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={`mailto:${me.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-cream-50/30 px-4 py-2 text-sm font-medium text-cream-50/85 transition-colors hover:border-gold-400 hover:text-cream-50"
            >
              ✉ {me.email}
            </a>

            <a
              href={me.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-gold-400/10 px-4 py-2 text-sm font-medium text-cream-50/85 transition-colors hover:border-gold-400 hover:text-cream-50"
            >
              LinkedIn
            </a>
          </div>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-cream-50/30 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-cream-50/85 transition-colors hover:border-gold-400 hover:text-cream-50"
          >
            &larr; Back to the cohort homepage
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default DonovanNguyen