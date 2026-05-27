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
import { ClickableImage } from '../components/ui/ClickableImage'
import { FadeIn } from '../components/ui/FadeIn'
import { SectionHeader } from '../components/ui/SectionHeader'

const P = '/students/sofia-rayon'

/* -------- 1. Your profile -------- */
const me = {
  name: 'Sofia Rayon',
  graduation: 'Dec 2026',
  major: 'Management Information Systems',
  hometown: 'Rockford, IL',
  tagline:
    'I had the best time in Portugal making memories with my classmates in a new country. Read more about my very first trip to Europe!',
  photo: `${P}/sofia-rayon.jpg`,
}

/* -------- 2. About -------- */
const aboutMe = [
  { label: 'Hometown', value: me.hometown },
  { label: 'Favorite gelato flavor', value: 'Coconut' },
  {
    label: 'Favorite habit from "The 7 Habits of Highly Effective People"',
    value: '#7: Sharpen the Saw',
    wide: true,
  },
]

/* -------- 3. Favorite day on the trip -------- */
const favoriteDay = {
  date: 'May 10',
  city: 'Lisbon',
  title: 'Favorite Day',
  body: `Placeholder version for now: this was a really good day, great view, good vibes, everyone was hanging out, and I will come back later to write what actually happened in my own words.`,
}

/* -------- 4. Three things -------- */
const threeThings = [
  {
    kicker: 'Best thing I ate',
    body: 'Grilled salmon (my favorite food) with baked potatoes and vegetables at Ferro Restaurante in Aveiro, Portugal ("the Venice of Portugal").',
    image: `${P}/food/sofia-rayon-best-ate.png`,
    imageAlt: 'Best thing I ate: grilled salmon in Portugal',
    imageButtonLabel: 'Take a look',
  },
  {
    kicker: 'Something I did not expect',
    body: 'The sheer amount of hills and stairs! I wasn\'t prepared for how vertical Lisbon and Porto are compared to home. Navigating the winding cobblestone streets was a bit tiring, but the incredible character and views at the top made every step worth it.',
  },
  {
    kicker: 'What I am bringing home',
    body: 'I am bringing home a real appreciation for the art of the long meal. Honestly, the slow service in Portugal annoyed me at first, but it turned into such a great way to actually relax and connect with everyone in my group. Especially as I start my career, I want to make sure I’m protecting my downtime and still making it a priority to reset and be present with my friends and family throughout the day.',
  },
]

/* -------- 5. Scrapbook sections -------- */
const scrapbook = [
  {
    section: 'Food',
    images: [
      { src: `${P}/food/sofia-rayon-best-ate.png`, caption: 'Grilled salmon (my favorite meal!)' },

    ],
    entries: [
    ],
  },
  {
    section: 'Sightseeing',
    images: [],
    entries: [],
  },
  {
    section: 'Activities',
    images: [],
    entries: [],
  },
  {
    section: 'Academic Engagement',
    images: [],
    entries: [],
  },
  {
    section: 'Friends',
    images: [],
    entries: [],
  },
]

/* -------- 5. Contact (LinkedIn) -------- */
const contact = {
  linkedin: 'https://www.linkedin.com/in/sofiarayon/',
}

function MasonryGallery({ images }) {
  return (
    <div className="mt-8 gap-4 [column-fill:balance] sm:columns-2 lg:columns-3">
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
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-900/70 via-navy-900/0 to-transparent" />
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

/* Matches footer scroll-mt-28 — keeps contact section clear of the top edge */
const CONTACT_SCROLL_OFFSET = 112

function _scrollToContact() {
  const el = document.getElementById('contact')
  if (!el) return

  const top = el.getBoundingClientRect().top + window.scrollY - CONTACT_SCROLL_OFFSET
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}

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
              <FadeIn
                key={item.label}
                delay={i * 0.06}
                className={item.wide ? 'sm:col-span-2 lg:col-span-2' : undefined}
              >
                <div>
                  <p className="min-h-11 text-[10px] font-medium uppercase tracking-[0.24em] text-crimson-600 lg:min-h-9">
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
                  {thing.image && (
                    <ClickableImage
                      src={thing.image}
                      alt={thing.imageAlt ?? thing.kicker}
                      triggerLabel={thing.imageButtonLabel ?? 'Take a look'}
                    />
                  )}
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-100 py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <SectionHeader
              number="04"
              kicker="Scrapbook"
              title="My Study Abroad Scrapbook"
            />
            <div className="mt-10 flex flex-col gap-14">
              {scrapbook.map((cat) => (
                <div key={cat.section}>
                  <h3 className="border-b border-navy-700/10 pb-3 font-display text-2xl tracking-tight text-navy-700">
                    {cat.section}
                  </h3>
                  {cat.images.length > 0 && (
                    <MasonryGallery images={cat.images} />
                  )}
                  {cat.entries.length > 0 && (
                    <div className="mt-8 flex flex-col gap-10">
                      {cat.entries.map((entry, i) => (
                        <FadeIn key={`${entry.date}-${i}`} delay={i * 0.06}>
                          <article>
                            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-crimson-600">
                              {entry.date}
                            </p>
                            <h4 className="mt-2 font-display text-3xl leading-tight tracking-tight text-navy-700">
                              {entry.title}
                            </h4>
                            <p className="mt-4 text-[15px] leading-relaxed text-navy-700/85 text-pretty">
                              {entry.body}
                            </p>
                          </article>
                        </FadeIn>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      <footer
        id="contact"
        className="scroll-mt-28 bg-crimson-800 py-16 text-cream-50"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <p className="font-display text-3xl leading-tight tracking-tight text-cream-50 md:text-4xl">
            Thanks for reading.
          </p>
          <p className="mt-4 text-sm text-cream-50/75">
            &mdash; {me.name}, UA MIS Portugal 2026
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-gold-400/15 px-4 py-2.5 text-sm font-semibold text-cream-50 transition-colors hover:border-gold-400 hover:bg-gold-400/25"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            )}
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

export default SofiaRayon
