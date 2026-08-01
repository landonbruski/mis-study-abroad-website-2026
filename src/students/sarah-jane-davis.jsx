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

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FadeIn } from '../components/ui/FadeIn'
import { SectionHeader } from '../components/ui/SectionHeader'

/* -------- 1. Your profile -------- */
const me = {
  name: 'Sarah Jane Davis',
  year: 'Senior', // Freshman / Sophomore / Junior / Senior / MS
  major: 'Management Information Systems',
  hometown: 'Baton Rouge, LA',
  tagline: 'Lover of amazing food (mainly pasta, croissants, and cheese!!)',
  headerBullets: [
    'Senior',
    'MIS Major',
    'Lover of amazing food (mainly pasta, croissants, and cheese!!)',
  ],
  /** A photo in /public/students/your-slug.jpg works best. */
  photo: '/students/sarah-jane-davis/pfp.jpg',
}

/* -------- 2. Favorite day on the trip -------- */
const favoriteDay = {
  date: 'May 9',
  city: 'Sintra',
  title: 'The day we went up to Pena Palace',
  body: `Loved getting to see the palace from the top of the mountain! But the wind I could have done without. 
    `,
}

/* -------- 3. Three things -------- */
const threeThings = [
  {
    kicker: 'Best thing I ate',
    body: 'My pasta that was made in a cheese wheel in front of me! I will never forget that. To top my already amazing eating experience, the waiter came out and made a tiramisu in front of me!',
    photo: '/students/sarah-jane-davis/bestfood.JPEG',
  },
  {
    kicker: 'Something I did not expect',
    body: 'I never expected to make as many new friends as I did on this trip. Going into this trip, I was so worried that I would be the only one who didn\'t have a group of friends to go out with. But I was so wrong! I made so many new friends and we had so many great memories together. I will never forget them, and I am so excited to work and have class with them this upcoming year!',
    photo: '/students/sarah-jane-davis/friends.JPEG',
  },
  {
    kicker: 'What I am bringing home',
    body: 'I am bringing home a newfound love for karaoke! I have always been a bit shy, but I found myself singing and dancing with my new friends at every opportunity. I am so glad I was able to let go and have fun with them.',
    photo: '/students/sarah-jane-davis/karaoke.JPEG',
  },
]

/* -------- 4. Photo galleries (A few entries) -------- */
/* Drop images in public/students/sarah-jane-davis/{food,sights,friends,random}/ */
const galleries = [
  {
    title: 'Food',
    subtitle: 'The meals I still think about.',
    photos: [
      { src: '/students/sarah-jane-davis/food/1.JPG', caption: 'My cheese wheel pasta!' },
      { src: '/students/sarah-jane-davis/food/2.jpeg', caption: 'I love asparagus!' },
      { src: '/students/sarah-jane-davis/food/3.jpeg', caption: 'Pasta dinner with friends! ' },
      { src: '/students/sarah-jane-davis/food/4.jpeg', caption: 'Tiramisu in a cup!' },
      { src: '/students/sarah-jane-davis/food/5.jpeg', caption: 'Almond croissant!' },
      { src: '/students/sarah-jane-davis/food/6.JPEG', caption: 'Last breakfast with Molly' },
      { src: '/students/sarah-jane-davis/food/7.JPEG', caption: 'Chocolate cake on a boat!' },
    ],
  },
  {
    title: 'Sights',
    subtitle: 'Favorite places and views from the trip.',
    photos: [
      { src: '/students/sarah-jane-davis/sights/1.jpeg', caption: 'Christ the Redeemer!' },
      { src: '/students/sarah-jane-davis/sights/2.JPG', caption: 'Porto sunset ' },
      { src: '/students/sarah-jane-davis/sights/3.jpg', caption: 'Pena Palace!' },
    ],
  },
  {
    title: 'Friends',
    subtitle: 'The people who made the trip.',
    photos: [
      { src: '/students/sarah-jane-davis/friends/1.JPEG', caption: ' ' },
      { src: '/students/sarah-jane-davis/friends/2.JPG', caption: ' ' },
      { src: '/students/sarah-jane-davis/friends/3.JPEG', caption: ' ' },
      { src: '/students/sarah-jane-davis/friends/4.JPEG', caption: ' ' },
      { src: '/students/sarah-jane-davis/friends/5.jpg', caption: ' ' }, 
      { src: '/students/sarah-jane-davis/friends/6.JPEG', caption: ' ' }, 
    ],
  },
]

const PAGE_CSS = `
.sjd-polaroid {
  position: relative;
  background: white;
  padding: 12px 12px 44px;
  border: 1px solid rgba(11, 31, 58, 0.1);
  box-shadow:
    8px 10px 0 rgba(158, 27, 50, 0.12),
    0 24px 48px -20px rgba(11, 31, 58, 0.28);
  transform: rotate(var(--sjd-tilt, -1deg));
}
.sjd-tape {
  position: absolute;
  width: 76px;
  height: 22px;
  background: rgba(158, 27, 50, 0.22);
  border-left: 1px dashed rgba(255, 255, 255, 0.65);
  border-right: 1px dashed rgba(255, 255, 255, 0.65);
  box-shadow: 0 3px 8px -3px rgba(11, 31, 58, 0.2);
  z-index: 2;
}
.sjd-carousel-stage {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  max-height: min(72vh, 640px);
  width: 100%;
  background: #f5efe6;
}
.sjd-carousel-stage img {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.sjd-carousel-btn {
  position: absolute;
  top: 50%;
  z-index: 3;
  display: flex;
  height: 2.75rem;
  width: 2.75rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1.5px solid rgba(11, 31, 58, 0.14);
  background: rgba(252, 248, 241, 0.94);
  color: #0b1f3a;
  font-size: 1.125rem;
  backdrop-filter: blur(6px);
  transition: border-color 0.2s, color 0.2s, transform 0.2s;
}
.sjd-carousel-btn:hover {
  border-color: #9e1b32;
  color: #9e1b32;
}
.sjd-carousel-btn-left { left: 0.75rem; transform: translateY(-50%); }
.sjd-carousel-btn-right { right: 0.75rem; transform: translateY(-50%); }
.sjd-carousel-btn-left:hover,
.sjd-carousel-btn-right:hover {
  transform: translateY(-50%) scale(1.06);
}
@media (min-width: 768px) {
  .sjd-carousel-btn-left { left: 1rem; }
  .sjd-carousel-btn-right { right: 1rem; }
}
.sjd-dot {
  height: 7px;
  width: 7px;
  border-radius: 9999px;
  background: rgba(11, 31, 58, 0.18);
  transition: background 0.2s, transform 0.2s;
}
.sjd-dot-active {
  background: #9e1b32;
  transform: scale(1.25);
}
.sjd-gallery-split {
  display: grid;
  gap: 2rem;
  align-items: center;
}
@media (min-width: 1024px) {
  .sjd-gallery-split {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
    gap: 3rem;
  }
  .sjd-gallery-split-flip > .sjd-gallery-copy { order: 2; }
  .sjd-gallery-split-flip > .sjd-gallery-panel { order: 1; }
}
.sjd-caption-box {
  margin-top: 1.25rem;
  max-width: 36rem;
  border-radius: 1rem;
  border: 1.5px dashed rgba(158, 27, 50, 0.35);
  background: rgba(255, 255, 255, 0.55);
  padding: 1.15rem 1.35rem;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: rgba(11, 31, 58, 0.7);
  font-style: italic;
}
`

function PhotoCarousel({ photos }) {
  const [index, setIndex] = useState(0)
  const total = photos.length
  const photo = photos[index]

  const goPrev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1))
  const goNext = () => setIndex((i) => (i === total - 1 ? 0 : i + 1))

  if (!photo) return null

  return (
    <figure className="mx-auto w-full max-w-lg md:max-w-xl">
      <div
        className="sjd-polaroid mx-auto max-w-full"
        style={{ '--sjd-tilt': `${index % 2 === 0 ? -1.2 : 0.8}deg` }}
      >
        <div
          className="sjd-tape"
          style={{ left: '18%', top: '-11px', transform: 'rotate(-7deg)' }}
        />
        <div
          className="sjd-tape"
          style={{ right: '14%', top: '-10px', transform: 'rotate(5deg)', opacity: 0.92 }}
        />

        <div className="sjd-carousel-stage">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={photo.src}
              src={photo.src}
              alt={photo.caption || 'Trip photo'}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous photo"
                className="sjd-carousel-btn sjd-carousel-btn-left"
              >
                &larr;
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next photo"
                className="sjd-carousel-btn sjd-carousel-btn-right"
              >
                &rarr;
              </button>
            </>
          )}
        </div>
      </div>

      <figcaption className="mt-6 text-center">
        {photo.caption?.trim() && (
          <p className="font-display text-lg leading-snug tracking-tight text-navy-700/90 md:text-xl">
            {photo.caption}
          </p>
        )}
        {total > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to photo ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`sjd-dot ${i === index ? 'sjd-dot-active' : ''}`}
              />
            ))}
          </div>
        )}
      </figcaption>
    </figure>
  )
}

function GalleryBlock({ title, subtitle, photos, flip = false }) {
  return (
    <div className={`sjd-gallery-split ${flip ? 'sjd-gallery-split-flip' : ''}`}>
      <div className="sjd-gallery-copy">
        <h3 className="font-display text-3xl leading-tight tracking-tight text-navy-700 md:text-4xl">
          {title}
        </h3>
        {subtitle && (
          <FadeIn delay={0.08}>
            <div className="sjd-caption-box">{subtitle}</div>
          </FadeIn>
        )}
      </div>
      <div className="sjd-gallery-panel mt-8 lg:mt-0">
        <PhotoCarousel photos={photos} />
      </div>
    </div>
  )
}

/* ======================================================================= */
/*  You usually do not need to edit anything below this line.              */
/*  Rename the component to your name in CamelCase before you export.      */
/* ======================================================================= */

export function StudentTemplate() {
  return (
    <div className="relative flex min-h-screen flex-col bg-cream-50 text-navy-700">
      <style>{PAGE_CSS}</style>

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
                  {thing.photo && (
                    <img
                      src={thing.photo}
                      alt={thing.kicker}
                      className="mt-1 w-full rounded-xl object-cover"
                    />
                  )}
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* A few entries — photo carousels */}
      <section className="bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="03"
            kicker="Journal"
            title="A few entries."
          />
          <div className="mt-14 flex flex-col gap-20 md:gap-28">
            {galleries.map((gallery, i) => (
              <FadeIn key={gallery.title} delay={i * 0.04}>
                <GalleryBlock
                  title={gallery.title}
                  subtitle={gallery.subtitle}
                  photos={gallery.photos}
                  flip={i % 2 === 1}
                />
              </FadeIn>
            ))}
          </div>
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

export default StudentTemplate
