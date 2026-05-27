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

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
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
  date: 'May 15',
  city: 'Lisbon',
  title: 'Favorite Day',
  body: `My favorite day was spent learning and trying new things with a Portugese cooking class and surfing lesson!`,
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
    body: 'I am bringing home a real appreciation for the art of the long meal. The slower service in Portugal annoyed me at first, but it turned into such a great way to actually relax and connect with everyone in my group. As I start my career, I want to make sure I’m protecting my downtime and still making it a priority to reset and be present with my friends and family throughout the day.',
  },
]

/* -------- 5. Scrapbook sections -------- */
const scrapbook = [
  {
    section: 'Activities',
    images: [
      { src: `${P}/activities/58298cbe-1dda-434e-a422-5f37fc5edfdb.jpg`, caption: 'Pena Palace tour' },
      { src: `${P}/activities/6a57fe94-e721-41e3-8316-ed698c29a3fb.jpg`, caption: 'Benfica Stadium tour' },
      { src: `${P}/activities/fa1a9351-acaa-460b-a925-03f9c1d468fc.jpg`, caption: 'Benfica Soccer Game' },
      { src: `${P}/activities/c22b7989-8851-41be-bb45-d9c53510e54b.jpg`, caption: 'Coimbra University tour' },
      { src: `${P}/activities/8a805501-4c88-4baf-a705-a7f63f219ddd.jpg`, caption: 'Tuk Tuk tour' },
      { src: `${P}/activities/49e3250f-e4cc-4b24-8b75-a6edfcfca9d1.jpg`, caption: 'Tuk Tuk' },
      { src: `${P}/activities/2ea0e4a6-1c88-4281-9799-3fe7f9ab4578.jpg`, caption: 'Surfing lesson warm-up' },
      { src: `${P}/activities/3120ee5a-3606-40ee-8c54-fec8da37beae.jpg`, caption: 'Surfing lesson' },
      { src: `${P}/activities/4dc03418-7eca-4e52-9bb6-dbb4d6174eed.jpg`, caption: 'Cooking class' },
      { src: `${P}/activities/78b8e95c-1266-48da-a545-124aac497dca.jpg`, caption: 'Making Pastel de Nata' },
      { src: `${P}/activities/a0db711e-2ef8-4bf2-8339-385981ede5e9.jpg`, caption: 'Boat tour in Aveiro' },
    ],
    entries: [],
  },
  {
    section: 'Making Connections',
    images: [
      { src: `${P}/friends/df2fd9f7-5089-479b-8ae4-1e7bcf7b1230.jpg`, caption: '' },
      { src: `${P}/friends/7f1d060f-a827-4ae1-991b-ff682bb4c5bd.jpg`, caption: 'Best cohort ever!' },
      { src: `${P}/friends/4aa7b4d6-aced-47bf-b409-62d17ce8cb95.jpg`, caption: 'Crowded train after Benfica game' },
      { src: `${P}/friends/9d80d1a4-ec43-4c64-99b1-227948049fdd.jpg`, caption: '' },
      { src: `${P}/friends/cf4cdad0-c8df-4107-840b-0b23eae431f2.jpg`, caption: '' },
      { src: `${P}/friends/8f70f7ee-9865-455b-a1d1-379ec0a0a4c4.jpg`, caption: '' },
      { src: `${P}/friends/50fa2018-fc54-4991-9bc7-4423780d33ce.jpg`, caption: '' },
      { src: `${P}/friends/2f5256d6-7e08-4469-9c2b-a4323bb3bb38.jpg`, caption: '' },
      { src: `${P}/friends/1639c649-0521-43a1-ab1f-310c21d7e70f.jpg`, caption: '' },
      { src: `${P}/friends/884e1f54-c715-492a-8876-61c53fe59847.jpg`, caption: '' },
      { src: `${P}/friends/6f2c7ac7-0a81-43e9-9263-3ca2059b2bb7.jpg`, caption: '' },
      { src: `${P}/friends/61f386fb-c1e0-416f-88aa-33261406e2f4.jpg`, caption: '' },
      { src: `${P}/friends/bc6a9f6c-e2d2-4a79-9a8f-bbf2b0898772.jpg`, caption: '' },
      { src: `${P}/friends/5201385c-f2c1-4d9a-a64a-4e9cce01a0ee.jpg`, caption: '' },
    ],
    entries: [],
  },
  {
    section: 'Food',
    images: [
      { src: `${P}/food/sofia-rayon-best-ate.png`, caption: 'Favorite meal' },
      { src: `${P}/food/first-day.jpg`, caption: 'First day meal' },
      { src: `${P}/food/risotto.jpg` },
      { src: `${P}/food/gelato.jpg`, caption: 'Coconut Gelato' },
      { src: `${P}/food/cafe.jpg`, caption: 'So many fantastic cafes!' },
      { src: `${P}/food/steak.jpg` },
      { src: `${P}/food/honest-greens.jpg`, caption: 'Honest Greens: A recommendation from a friend' },
      { src: `${P}/food/charcuterie.jpg`, caption: 'Fanciest charcuterie I\'ve ever seen' },
      { src: `${P}/food/fancy-steak.jpg`, caption: 'Fancy dinner at Flow' },
      { src: `${P}/food/pizza.jpg` },
      { src: `${P}/food/drinks.jpg` },
      { src: `${P}/food/pastel-de-nata.jpg`, caption: 'Pastel de nata from cooking class' },
      { src: `${P}/food/egg-pastry-aveiro.jpg`, caption: 'Ovos moles from Aveiro' },
      { src: `${P}/food/codcakes.jpg`, caption: 'Cod cakes from cooking class' },
    ],
    entries: [],
  },
  {
    section: 'Academic Engagement',
    images: [
      { src: `${P}/academic-engagement/2801add2-ac1c-4b33-8748-943e4f6db803.jpg`, caption: 'Conversation with Zeentech' },
      { src: `${P}/academic-engagement/ce733c47-10db-4e2d-96ad-88b9e2258cfd.jpg`, caption: 'CGI office visit in Lisbon' },
      { src: `${P}/academic-engagement/c0821e17-cbc2-4f6d-9091-c6c1111a0313.jpg`, caption: 'Our first class was outside in Lisbon City Center!' },
    ],
    entries: [],
  },
  {
    section: 'Sightseeing',
    images: [
      { src: `${P}/sightseeing/533a825d-9c4a-44b8-929b-032abb1cdcc8.jpg`, caption: '' },
      { src: `${P}/sightseeing/37fa47a6-cd2e-46ad-bcc2-e090cca83483.jpg`, caption: '' },
      { src: `${P}/sightseeing/effe829e-29e0-4d02-b750-538a3bcba81f.jpg`, caption: 'Diamond House' },
      { src: `${P}/sightseeing/33d170d6-2902-4eda-9a43-01cee380b41c.jpg`, caption: 'Jerónimos Monastery' },
      { src: `${P}/sightseeing/32f3592b-eac2-4a62-a778-ba2b119a02ff.jpg`, caption: 'Monument of Discoveries' },
      { src: `${P}/sightseeing/cdb5f430-edf2-42b0-baf9-aafd531d513a.jpg`, caption: 'Pena Palace' },
      { src: `${P}/sightseeing/c40b6728-6ee6-4f9a-98bb-c9b5e955cbf4.jpg`, caption: 'Pena Palace' },
      { src: `${P}/sightseeing/e714c3ff-7565-4e27-af0d-d73e003a9bca.jpg`, caption: 'Benfica Stadium' },
      { src: `${P}/sightseeing/b7530031-4084-42c4-a9e6-971c46252782.jpg`, caption: 'Friendship Ties Bridge' },
      { src: `${P}/sightseeing/82d24f59-6cb3-4fc9-aad2-aefe5d56a1de.jpg`, caption: 'Sanctuary of Bom Jesus do Monte' },
      { src: `${P}/sightseeing/61052e5d-9325-4c6e-a594-2dfccb098716.jpg`, caption: 'University of Coimbra' },
      { src: `${P}/sightseeing/b23959be-48e6-4051-a077-7a0a982884f1.jpg`, caption: 'Porto Sao Bento Train Station' },
      { src: `${P}/sightseeing/4f9f070b-60bc-405a-82cb-e7a69054842e.jpg`, caption: '' },
    ],
    entries: [],
  },
]

/* -------- 5. Contact (LinkedIn) -------- */
const contact = {
  linkedin: 'https://www.linkedin.com/in/sofiarayon/',
}

function ZoomableImage({ src, alt, className }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])
  return (
    <>
      <img src={src} alt={alt} className={`cursor-zoom-in ${className ?? ''}`} onClick={() => setOpen(true)} />
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog" aria-modal="true"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-700/90 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <button type="button" className="absolute right-4 top-4 rounded-full border border-cream-50/30 px-3 py-1.5 text-sm font-medium text-cream-50 hover:border-cream-50" onClick={() => setOpen(false)}>Close</button>
            <motion.img src={src} alt={alt} initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} transition={{ duration: 0.2 }} className="max-h-[90vh] max-w-[min(90vw,1200px)] object-contain" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function MasonryGallery({ images }) {
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  return (
    <>
      <div className="mt-8 gap-4 [column-fill:balance] sm:columns-2 lg:columns-4">
        {images.map((img) => (
          <figure
            key={img.src}
            className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-100 cursor-zoom-in"
            onClick={() => setLightbox(img)}
          >
            <img
              src={img.src}
              alt={img.caption ?? ''}
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
      <AnimatePresence>
        {lightbox && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-700/90 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full border border-cream-50/30 px-3 py-1.5 text-sm font-medium text-cream-50 transition-colors hover:border-cream-50"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              Close
            </button>
            <motion.img
              src={lightbox.src}
              alt={lightbox.caption ?? ''}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-h-[90vh] max-w-[min(90vw,1200px)] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ScrapbookSection() {
  const [open, setOpen] = useState(() => new Set())

  function toggle(section) {
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(section) ? next.delete(section) : next.add(section)
      return next
    })
  }

  return (
    <section className="bg-cream-100 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeader number="04" kicker="Scrapbook" title="My Study Abroad Scrapbook" />
        <p className="mt-3 text-[15px] text-navy-700/60">Checkout some highlights!</p>
        <div className="mt-10 flex flex-col divide-y divide-navy-700/10 border-y border-navy-700/10">
          {scrapbook.map((cat) => {
            const isOpen = open.has(cat.section)
            return (
              <div key={cat.section}>
                <button
                  onClick={() => toggle(cat.section)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <h3 className="font-display text-2xl tracking-tight text-navy-700">
                    {cat.section}
                  </h3>
                  <span className="ml-4 text-navy-700/50 transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    ▾
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10">
                        {cat.images.length > 0 && <MasonryGallery images={cat.images} />}
                        {cat.images.length === 0 && cat.entries.length === 0 && (
                          <p className="mt-4 text-sm text-navy-700/40 italic">Coming soon.</p>
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
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
            title="A few facts about me"
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
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="02"
            kicker={`${favoriteDay.city}, ${favoriteDay.date}`}
            title={favoriteDay.title}
          />
          <FadeIn delay={0.1}>
            <p className="mt-8 font-display text-xl leading-relaxed text-navy-700/90 md:text-2xl">
              {favoriteDay.body}
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <FadeIn delay={0.15}>
              <div className="flex flex-col gap-4">
                <ZoomableImage
                  src={`${P}/activities/3120ee5a-3606-40ee-8c54-fec8da37beae.jpg`}
                  alt="Surfing Lesson"
                  className="mx-auto block max-h-64 w-auto rounded-2xl"
                />
                <article className="rounded-2xl border border-navy-700/10 bg-cream-50 p-6">
                  <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-crimson-600">Surfing Lesson</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-navy-700/85">
                    On one of our first days in Porto, we did a surfing class, which was honestly pretty terrifying since I'd never tried it before. It was a cold and windy day, but I was determined to give it a shot anyway. Surfing definitely turned out to be a massive challenge, and I wasn't good at it at all, but it was such an incredible experience to try something so new. It was really unique to step away from MIS for a bit and just learn a random new skill alongside my classmates.
                  </p>
                </article>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-col gap-4">
                <ZoomableImage
                  src={`${P}/activities/78b8e95c-1266-48da-a545-124aac497dca.jpg`}
                  alt="Making Pastel de Nata"
                  className="mx-auto block max-h-64 w-auto rounded-2xl"
                />
                <article className="rounded-2xl border border-navy-700/10 bg-cream-50 p-6">
                  <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-crimson-600">Cooking Class</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-navy-700/85">
                    Later that day, we did a cooking class, which was definitely a little more in my comfort zone. My team was in charge of making the iconic Pastel de Nata, and I was pretty nervous at first since our teacher was a very serious looking pastry chef. He ended up being super patient and funny, which made it a lot easier. Even though I'd already tried the pastries at a few different spots, I was surprised to see ingredients like cinnamon and lemon going into the recipe. After making them myself, I could actually pick out those distinct flavors. It was such a cool bonding experience to sit down and enjoy a full meal where every dish was made by one of my classmates.
                  </p>
                </article>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="03"
            kicker="Three things"
            title="Quick Highlights"
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

      <ScrapbookSection />

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
