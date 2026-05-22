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
import { BackgroundMusicToggle } from '../components/ui/BackgroundMusicToggle'
import { ClickableImage } from '../components/ui/ClickableImage'
import { FadeIn } from '../components/ui/FadeIn'
import { SectionHeader } from '../components/ui/SectionHeader'

/* -------- 1. Your profile -------- */
const me = {
  name: 'Malyk Hayden',
  year: 'Junior', // Freshman / Sophomore / Junior / Senior / MS
  major: 'Management Information Systems & AMP',
  hometown: 'Camden, Alabama',
  tagline: 'I am an Honors and Accelerated Masters MIS major at the University of Alabama and I am so excited to have traveled outside of the United States for the FIRST TIME! Check out my experience below!',
  /** A photo in /students/your-slug.jpg works best. */
  photo: '/students/malyk-hayden/malyk-boat-pic.jpg'
}

/* -------- Optional background music (extract audio from your video) -------- */
const backgroundMusic = {
  /** Audio: export from your video → public/students/malyk-hayden/portugal-violin.mp3 */
  audioSrc: '/students/malyk-hayden/portugal-violin.mp3',
  /** Video: compressed clip → public/students/malyk-hayden/portugal-violin.mp4 */
  videoSrc: '/students/malyk-hayden/portugal-violin.mp4',
  label: 'Open violin audio and video options',
  description:
    'Click the note to choose: play optional background violin audio while you browse, or watch the video of a woman playing violin during our visit to the Porto Cathedral Treasury Museum.',
  videoTitle: 'Violin at Porto Cathedral Treasury Museum',
}

/* -------- 2. Favorite day on the trip -------- */
const favoriteDay = {
  date: 'May 18, 2026',
  city: 'Porto, Portugal',
  title: 'Farewell Dinner Cruise',
  body: `It was tough to pick a favorite day of this trip, let alone a favorite moment. But if I had to narrow it down, I would have to highlight two specific moments from the farewell dinner cruise. The first moment was everyone congregating on the front of the boat where we took pictures and just laughed and enjoyed one another. The second moment was after the dinner cruise when alot of us went out to celebrate together for the last night. Within all of these moment, I was truly able to bond deeply with people in ways that I never expected to on this trip. This will be a memory that I'll never forget!`,
  image: '/students/malyk-hayden/boat-group-pic.jpg',
  imageAlt: 'MIS Class Group Pic on Farewell Cruise',
}

/* -------- 3. Three things -------- */
const threeThings = [
  {
    kicker: 'Best thing I ate',
    body: 'The best meal that I had was Iberian Pork À Alentajo from a restaurant called Ofrade. This spot had Michelin Star Quality food and it was soooo good. Best meal I had in Portugal by far.......Also a special nod to the duck rice that EJ had. It was also top tier!',
    image: '/students/malyk-hayden/bestmeal.jpg',
    imageAlt: 'Iberian pork at Ofrade',
  },
  {
    kicker: 'Something I did not expect',
    body: 'When we attended the Benfica vs. Braga soccer match, there was a group of Ultras, a highly organized and passionate supporter group with a reputation for intense fan culture. They displayed a banner that translated to something like "6 Years of the New Guard," which appeared to reference an ongoing rivalry with another supporter group whose flag they had reportedly captured and continued to display as a symbol of dominance. It was both surprising and somewhat intimidating to witness the atmosphere they created, especially with the use of flares and fireworks throughout the match. At one point, some individuals threw still-lit flares onto the ground before running out of the stadium, which I found concerning due to the potential safety risks. The experience highlighted a side of soccer culture that was much more intense than what I am accustomed to seeing in the United States.',
    image: '/students/malyk-hayden/ultras-at-benfica.jpg',
    imageAlt: 'Ultras at Benfica Game',
    imageClassName: 'aspect-[4/5]',
  },
  {
    kicker: 'What I am bringing home',
    body: 'One habit that I will bring home is to be intentional about taking pictures throughout my life and creating memories. This trip taught me that pictures are a gateway to so many wonderful memories, and if you do not capture those moments, you may very easily forget them. So shoutout to Tami for being the ultimate picture taker on this trip and inspiring me to do the same.',
    image: '/students/malyk-hayden/tami-pic-inspo2jpg.JPEG',
    imageAlt: 'Tami capturing the moment',
  },
]

/* -------- 4. Photo collage -------- */
const collagePhotos = [
  { src: '/students/malyk-hayden/collage1.JPEG', alt: 'Portugal trip moment 1' },
  { src: '/students/malyk-hayden/collage2.JPEG', alt: 'Portugal trip moment 2' },
  { src: '/students/malyk-hayden/collage3.JPEG', alt: 'Portugal trip moment 3' },
  { src: '/students/malyk-hayden/collage4.JPEG', alt: 'Portugal trip moment 4' },
  { src: '/students/malyk-hayden/collage5.JPEG', alt: 'Portugal trip moment 5' },
  { src: '/students/malyk-hayden/collage6.JPG', alt: 'Portugal trip moment 6' },
  { src: '/students/malyk-hayden/collage7.JPG', alt: 'Portugal trip moment 7' },
  { src: '/students/malyk-hayden/collage8.JPG', alt: 'Portugal trip moment 8' },
  { src: '/students/malyk-hayden/collage9.JPG', alt: 'Portugal trip moment 9' },
  { src: '/students/malyk-hayden/collage10.jpg', alt: 'Portugal trip moment 10' },
  { src: '/students/malyk-hayden/collage11.JPG', alt: 'Portugal trip moment 11' },
  { src: '/students/malyk-hayden/collage12.JPG', alt: 'Portugal trip moment 12' },
  { src: '/students/malyk-hayden/collage13.JPG', alt: 'Portugal trip moment 13' },
  { src: '/students/malyk-hayden/collage14.jpg', alt: 'Portugal trip moment 14' },
  { src: '/students/malyk-hayden/collage15.jpg', alt: 'Portugal trip moment 15' },
  { src: '/students/malyk-hayden/collage16.JPEG', alt: 'Portugal trip moment 16' },
  { src: '/students/malyk-hayden/collage17.JPEG', alt: 'Portugal trip moment 17' },
  { src: '/students/malyk-hayden/collage18.JPEG', alt: 'Portugal trip moment 18' },
  { src: '/students/malyk-hayden/collage19.JPEG', alt: 'Portugal trip moment 19' },
]

/* -------- 5. Contact (fill in when ready) -------- */
const contact = {
  email: 'malykh04@gmail.com',
  linkedin: 'https://www.linkedin.com/in/malyk-hayden/',
}

/* ======================================================================= */
/*  You usually do not need to edit anything below this line.              */
/*  Rename the component to your name in CamelCase before you export.      */
/* ======================================================================= */

export function MalykHayden() {
  return (
    <div className="relative flex min-h-screen scroll-smooth flex-col bg-cream-50 text-navy-700">
      {backgroundMusic?.audioSrc && (
        <BackgroundMusicToggle
          audioSrc={backgroundMusic.audioSrc}
          videoSrc={backgroundMusic.videoSrc}
          label={backgroundMusic.label}
          description={backgroundMusic.description}
          videoTitle={backgroundMusic.videoTitle}
        />
      )}
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
            <div className="mt-8 flex w-fit flex-col gap-3">
              <div className="flex flex-wrap gap-3">
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
              <a
                href="#contact"
                className="inline-flex items-center gap-2 self-center rounded-full border border-crimson-700 bg-crimson-600 px-5 py-2.5 text-sm font-semibold text-cream-50 shadow-sm transition-colors hover:border-crimson-800 hover:bg-crimson-800"
              >
                Connect With Me!
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-gold-400"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a.75.75 0 0 1 .75.75v8.614l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 1 1 1.06-1.06l2.47 2.47V3.75A.75.75 0 0 1 10 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md"
          >
            <ClickableImage
              src={me.photo}
              alt={me.name}
              frameClassName="aspect-4/5 rounded-3xl"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </header>

      {/* Favorite day */}
      <section className="bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="01"
            kicker={`${favoriteDay.city} · ${favoriteDay.date}`}
            title="Favorite Day"
          />
          <FadeIn delay={0.1} className="mt-10 block">
            <article className="mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-100">
              {favoriteDay.image && (
                <div className="[&>div]:py-0 [&_button]:rounded-none">
                  <ClickableImage
                    src={favoriteDay.image}
                    alt={favoriteDay.imageAlt ?? favoriteDay.title}
                    frameClassName="w-full rounded-none border-0 border-b border-navy-700/10"
                    className="block h-auto w-full"
                  />
                </div>
              )}
              <div className="flex flex-col gap-3 px-6 pb-6 pt-8">
                <h3 className="font-display text-lg font-bold leading-tight text-navy-700 md:text-xl">
                  {favoriteDay.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-navy-700/85">
                  {favoriteDay.body}
                </p>
              </div>
            </article>
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
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-50">
                  {thing.image && (
                    <div className="[&>div]:py-0">
                      <ClickableImage
                        src={thing.image}
                        alt={thing.imageAlt ?? thing.kicker}
                        frameClassName={`rounded-none border-0 border-b border-navy-700/10 ${thing.imageClassName ?? 'aspect-[3/4]'}`}
                        className="h-full w-full min-h-[16rem] object-cover object-center sm:min-h-[18rem] md:min-h-[20rem]"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-3 px-6 py-6">
                    <h3 className="font-display text-lg font-bold leading-tight text-navy-700 md:text-xl">
                      {thing.kicker}
                    </h3>
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
                  <div className="mb-3 break-inside-avoid md:mb-4">
                    <ClickableImage
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="block w-full"
                    />
                  </div>
                </FadeIn>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Footer */}
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
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-cream-50/25 bg-cream-50/10 px-4 py-2.5 text-sm font-medium text-cream-50 backdrop-blur transition-colors hover:border-gold-400 hover:bg-cream-50/15"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-gold-400"
                  aria-hidden="true"
                >
                  <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                  <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                </svg>
                {contact.email}
              </a>
            )}
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
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-cream-50/30 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-cream-50/85 transition-colors hover:border-gold-400 hover:text-cream-50"
          >
            &larr; Back to the cohort homepage
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default MalykHayden
