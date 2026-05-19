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
  name: 'Malyk Hayden',
  year: 'Junior', // Freshman / Sophomore / Junior / Senior / MS
  major: 'Management Information Systems & AMP',
  hometown: 'Camden, Alabama',
  tagline: 'THE CHUCKLER OF THE GROUP',
  /** A photo in /students/your-slug.jpg works best. */
  photo: '/students/malyk-boat-pic.jpg'
}

/* -------- 2. Favorite day on the trip -------- */
const favoriteDay = {
  date: 'May 18, 2026',
  city: 'Porto, Portugal',
  title: 'Favorite Day - Farewell Dinner Cruise',
  body: `It was tough to pick a favorite day of this trip, let alone a favorite moment. But if I had to narrow it down, I would have to highlight two specific moments from the farewell dinner cruise. The first moment was everyone congregating on the front of the boat where we took pictures and just laughed and enjoyed one another. The second moment was after the dinner cruise when alot of us went out to celebrate together for the last night. Within all of these moment, I was truly able to bond deeply with people in ways that I never expected to on this trip. This will be a memory that I'll never forget!`,
  image: '/students/boat-group-pic.jpg',
  imageAlt: 'MIS Class Group Pic on Farewell Cruise',
}

/* -------- 3. Three things -------- */
const threeThings = [
  {
    kicker: 'Best thing I ate',
    body: 'The best meal that I had was Iberian Pork À Alentajo from a restaurant called Ofrade. This spot had Michelin Star Quality food and it was soooo good. Best meal I had in Portugal by far.......Also a special nod to the duck rice that EJ It was also top tier!',
    image: '/students/bestmeal.jpg',
    imageAlt: 'Iberian pork at Ofrade',
  },
  {
    kicker: 'Something I did not expect',
    body: 'When we attended the Benfica vs. Braga soccer match, there was a group of Ultras, a highly organized and passionate supporter group with a reputation for intense fan culture. They displayed a banner that translated to something like "6 Years of the New Guard," which appeared to reference an ongoing rivalry with another supporter group whose flag they had reportedly captured and continued to display as a symbol of dominance. It was both surprising and somewhat intimidating to witness the atmosphere they created, especially with the use of flares and fireworks throughout the match. At one point, some individuals threw still-lit flares onto the ground before running out of the stadium, which I found concerning due to the potential safety risks. The experience highlighted a side of soccer culture that was much more intense than what I am accustomed to seeing in the United States.',
    image: '/students/ultras-at-benfica.jpg',
    imageAlt: 'Ultras at Benfica Game',
  },
  {
    kicker: 'What I am bringing home',
    body: 'One habit that I will bring home is to be intentional about taking pictures throughout my life and creating memories. This trip taught me that pictures are a gateway to so many wonderful memories, and if you do not capture those moments, you may very easily forget them. So shoutout to Tami for being the ultimate picture taker on this trip and inspiring me to do the same.',
    images: [
      { src: '/students/tami-pic-inspo1.jpg', alt: 'Tami taking pictures' },
      { src: '/students/tami-pic-inspo2jpg.JPEG', alt: 'Tami capturing the moment' },
    ],
  },
]

/* -------- 4. Photo collage -------- */
const collagePhotos = [
  { src: '/students/collage1.JPEG', alt: 'Portugal trip moment 1' },
  { src: '/students/collage2.JPEG', alt: 'Portugal trip moment 2' },
  { src: '/students/collage3.JPEG', alt: 'Portugal trip moment 3' },
  { src: '/students/collage4.JPEG', alt: 'Portugal trip moment 4' },
  { src: '/students/collage5.JPEG', alt: 'Portugal trip moment 5' },
  { src: '/students/collage6.JPG', alt: 'Portugal trip moment 6' },
  { src: '/students/collage7.JPG', alt: 'Portugal trip moment 7' },
  { src: '/students/collage8.JPG', alt: 'Portugal trip moment 8' },
  { src: '/students/collage9.JPG', alt: 'Portugal trip moment 9' },
  { src: '/students/collage10.jpg', alt: 'Portugal trip moment 10' },
  { src: '/students/collage11.JPG', alt: 'Portugal trip moment 11' },
  { src: '/students/collage12.JPG', alt: 'Portugal trip moment 12' },
  { src: '/students/collage13.JPG', alt: 'Portugal trip moment 13' },
  { src: '/students/collage14.jpg', alt: 'Portugal trip moment 14' },
  { src: '/students/collage15.jpg', alt: 'Portugal trip moment 15' },
]

/* ======================================================================= */
/*  You usually do not need to edit anything below this line.              */
/*  Rename the component to your name in CamelCase before you export.      */
/* ======================================================================= */

export function MalykHayden() {
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
          {favoriteDay.image && (
            <FadeIn delay={0.2}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-10 overflow-hidden rounded-2xl border border-navy-700/10 shadow-deep"
              >
                <img
                  src={favoriteDay.image}
                  alt={favoriteDay.imageAlt ?? favoriteDay.title}
                  className="block h-auto w-full"
                />
              </motion.div>
            </FadeIn>
          )}
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
                  {thing.images?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="mt-auto grid grid-cols-2 gap-2"
                    >
                      {thing.images.map((img) => (
                        <motion.div
                          key={img.src}
                          className="relative aspect-4/5 overflow-hidden rounded-xl border border-navy-700/10 bg-cream-100"
                        >
                          <img
                            src={img.src}
                            alt={img.alt ?? thing.kicker}
                            className="absolute inset-0 h-full w-full object-cover object-center"
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                  {thing.image && !thing.images?.length && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="mt-auto overflow-hidden rounded-xl border border-navy-700/10"
                    >
                      <img
                        src={thing.image}
                        alt={thing.imageAlt ?? thing.kicker}
                        className="block h-auto w-full"
                      />
                    </motion.div>
                  )}
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Photo collage */}
      {collagePhotos.length > 0 && (
        <section className="bg-cream-50 py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <SectionHeader
              number="03"
              kicker="Collage"
              title="Snapshots from the trip."
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-10 columns-2 gap-3 sm:columns-3 md:gap-4 lg:columns-4"
            >
              {collagePhotos.map((photo, i) => (
                <FadeIn key={photo.src} delay={(i % 4) * 0.05}>
                  <motion.figure
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="mb-3 break-inside-avoid overflow-hidden rounded-xl border border-navy-700/10 bg-cream-100 shadow-sm md:mb-4"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="block w-full"
                    />
                  </motion.figure>
                </FadeIn>
              ))}
            </motion.div>
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

export default MalykHayden
