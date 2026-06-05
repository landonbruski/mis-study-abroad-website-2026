/**
 * James Nguyen, Portugal 2026.
 *
 * Personal page at /students/james-nguyen. Keep `export default` at the bottom.
 *
 * Two modes, toggled via a pill switcher just below the hero:
 *   Gallery Mode — existing categorised sections with horizontal carousels + lightbox
 *   Tour  Mode   — airport-map UI: two terminals (LIS / OPO), one gate per day,
 *                  clicking a gate opens a DayPopup with a photo slideshow and MiniPlayer
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FadeIn } from '../components/ui/FadeIn'
import { SectionHeader } from '../components/ui/SectionHeader'
import { supabase } from '../lib/supabase'

const P = '/students/james-nguyen'

/* ─────────────────────────────────────────────────────────────────────────── */
/*  STATIC DATA                                                                */
/* ─────────────────────────────────────────────────────────────────────────── */

const me = {
  name: 'James Nguyen',
  year: 'Junior',
  major: 'Management Information Systems',
  hometown: 'Iowa City, Iowa',
  tagline: 'A Portuguese six feet tall.',
  photo: `${P}/james-nguyen.JPG`,
}

const sectionNav = [
  { id: 'favorite-day',   label: 'Favorite Day' },
  { id: 'three-things',   label: 'Three Things' },
  { id: 'from-the-sky',   label: 'From the Sky' },
  { id: 'scenery',        label: 'Scenery' },
  { id: 'friends',        label: 'Friends' },
  { id: 'me',             label: 'Me' },
  { id: 'food',           label: 'Food' },
  { id: 'art',            label: 'Art' },
  { id: 'pups',           label: 'Pups' },
  { id: 'final-message',  label: 'Final Message' },
]

const favoriteDay = {
  date: 'May 15',
  city: 'Porto',
  title: 'Favorite Day: Waves and Wine',
  body: [
    `The surfing was so exhausting but also exhilirating (aside from my calf cramping in the water) and ` +
    `the cooking class had the same homey vibe as cooking with the family on Thanksgiving; it was so sweet.`,
    `While the food was, naturally, not the most life-changing, it was made with love (blegh) and plenty of sparkling water.`,
    `Post-class activities cemented this day as my favorite.`,
    `The vinho verde certainly helped, too.`,
  ],
  images: [
    { src: `${P}/favorite/surf.jfif`,        caption: "Crazy how it's the same height as me" },
    { src: `${P}/favorite/cookingclass.jpeg`, caption: 'Codfish cake station' },
  ],
}

const threeThings = [
  {
    kicker:  'Porto > Lisbon, no diff',
    body:    "For one, I didn't slip on the cobblestone in Porto. Vibes were also immaculate, and unfortunately for Lisbon, the food was that much better. Coimbra is a close second, but Lisbon was also lovely.",
    image:   `${P}/scenery/IMG_3060.JPG`,
    caption: 'THE bridge',
  },
  {
    kicker:  'Culture Shock',
    body:    "Something I didn't foresee: everything starts super late here, from dinner to night life. Wouldn't have been a problem if we didn't have to wake up so early... Nice for late night eats, though!",
    image:   `${P}/scenery/IMG_2900.JPG`,
    caption: 'A beautiful sunset',
  },
  {
    kicker:  "The thing I can't stop talking about",
    body:    "That last day was as good as it gets. A leisurely stroll across the bridge, the best sandwiches in Porto, taking in the views at the wine bar window, and ending the night with the most bittersweet goodbye.",
    image:   `${P}/friends/IMG_3307.JPG`,
    caption: "Must've been HILARIOUS",
  },
]

const sceneryImages = [
  { src: `${P}/scenery/welcome-to-lisbon-sign.JPG`, caption: 'Welcome to Lisbon' },
  { src: `${P}/scenery/street.JPG`,                 caption: '' },
  { src: `${P}/scenery/sangria-stand.JPG`,           caption: 'Sangria!!' },
  { src: `${P}/scenery/IMG_0137.JPG`,               caption: '' },
  { src: `${P}/scenery/IMG_0190.JPG`,               caption: '' },
  { src: `${P}/scenery/IMG_0200.JPG`,               caption: '' },
  { src: `${P}/scenery/IMG_0308.JPG`,               caption: '' },
  { src: `${P}/scenery/IMG_0376.JPG`,               caption: '' },
  { src: `${P}/scenery/IMG_0398.JPG`,               caption: 'Monastery' },
  { src: `${P}/scenery/IMG_0428.JPG`,               caption: '' },
  { src: `${P}/scenery/IMG_0685.JPG`,               caption: 'The palace' },
  { src: `${P}/scenery/IMG_0848.JPG`,               caption: 'View from the palace' },
  { src: `${P}/scenery/IMG_1092.JPG`,               caption: 'Vitoria!' },
  { src: `${P}/scenery/IMG_1412.JPG`,               caption: 'To be loved...' },
  { src: `${P}/scenery/IMG_1434.JPG`,               caption: '' },
  { src: `${P}/scenery/IMG_1596.JPG`,               caption: 'Big J' },
  { src: `${P}/scenery/IMG_1601.JPG`,               caption: 'Golden Gate Dupe' },
  { src: `${P}/scenery/IMG_1616.JPG`,               caption: '' },
  { src: `${P}/scenery/IMG_1658.JPG`,               caption: 'Coimbra!' },
  { src: `${P}/scenery/IMG_1724.JPG`,               caption: "Somehow can't escape school" },
  { src: `${P}/scenery/IMG_2215.JPG`,               caption: 'SNOOPY' },
  { src: `${P}/scenery/IMG_2353.JPG`,               caption: '' },
  { src: `${P}/scenery/IMG_2408.JPG`,               caption: 'Kevin watching us cook' },
  { src: `${P}/scenery/IMG_2634.JPG`,               caption: 'Much more fun going down these steps' },
  { src: `${P}/scenery/IMG_2657.JPG`,               caption: '' },
  { src: `${P}/scenery/IMG_2819.JPG`,               caption: '' },
  { src: `${P}/scenery/IMG_2900.JPG`,               caption: 'From the vineyard' },
  { src: `${P}/scenery/IMG_3060.JPG`,               caption: 'Dom Luis I bridge' },
]

const friendsImages = [
  { src: `${P}/friends/IMG_0568.JPG`,                    caption: '' },
  { src: `${P}/friends/IMG_0590.JPG`,                    caption: '' },
  { src: `${P}/friends/IMG_1044.JPG`,                    caption: 'The press conference' },
  { src: `${P}/friends/IMG_1714.JPG`,                    caption: '' },
  { src: `${P}/friends/IMG_2588.JPG`,                    caption: 'I was a great sous' },
  { src: `${P}/friends/IMG_3307.JPG`,                    caption: '' },
  { src: `${P}/friends/IMG_3341.JPG`,                    caption: '' },
  { src: `${P}/friends/IMG_3398.JPG`,                    caption: '' },
  { src: `${P}/friends/IMG_3491.JPG`,                    caption: '' },
  { src: `${P}/friends/IMG_3657.JPG`,                    caption: 'The 221 scavenger hunt crew' },
  { src: `${P}/friends/IMG_3670.JPG`,                    caption: '' },
  { src: `${P}/friends/IMG_3674.JPG`,                    caption: '' },
  { src: `${P}/friends/IMG_3686.JPG`,                    caption: '' },
  { src: `${P}/friends/IMG_3696.JPG`,                    caption: 'TINO!!! I miss you... (I cried after this photo)' },
  { src: `${P}/friends/IMG_3717.JPG`,                    caption: '' },
  { src: `${P}/friends/20260508_232201_080122.jpeg`,      caption: 'The roomie' },
  { src: `${P}/friends/20260510_235453_0EFB38.jpeg`,      caption: '' },
  { src: `${P}/friends/20260513_101623_055473.jpeg`,      caption: '' },
  { src: `${P}/friends/20260514_231606_00BA65.jpeg`,      caption: '' },
  { src: `${P}/friends/20260515_000926_0A5665.jpeg`,      caption: '' },
  { src: `${P}/friends/20260515_230515_0605F8.jpeg`,      caption: '' },
  { src: `${P}/friends/20260516_212958_0490B3.jpeg`,      caption: '"Wrist twistin\' like it\'s stir fry"' },
  { src: `${P}/friends/20260517_174120_0A0C79.jpeg`,      caption: '' },
  { src: `${P}/friends/keke.jfif`,                       caption: '' },
  { src: `${P}/friends/yay.jfif`,                        caption: '' },
]

const foodImages = [
  { src: `${P}/food/first-meal.JPG`,  name: 'The first meal',     note: 'This place had me thinking the language barrier was about to fry me.' },
  { src: `${P}/food/IMG_0270.JPG`,    name: 'Samosas (Chamuças)', note: "Olivia's favorite" },
  { src: `${P}/food/IMG_0272.JPG`,    name: '',                   note: '' },
  { src: `${P}/food/IMG_0274.JPG`,    name: '',                   note: '' },
  { src: `${P}/food/IMG_0281.JPG`,    name: 'Lamb',               note: "Some of the best I've ever had" },
  { src: `${P}/food/IMG_0508.JPG`,    name: 'Salmon Toast',       note: 'Gone in sixty seconds' },
  { src: `${P}/food/IMG_0513.JPG`,    name: '',                   note: '' },
  { src: `${P}/food/IMG_0644.JPG`,    name: 'Octopus Stew',       note: 'My life has been changed for the better.' },
  { src: `${P}/food/IMG_0912.JPG`,    name: '',                   note: '' },
  { src: `${P}/food/IMG_0932.JPG`,    name: 'Boba',               note: 'As mediocre as expected' },
  { src: `${P}/food/IMG_1344.JPG`,    name: 'Bifana',             note: "TBH, I had no clue what to expect but it wasn't bad." },
  { src: `${P}/food/IMG_1494.JPG`,    name: 'My solo venture',    note: 'I was having cravings' },
  { src: `${P}/food/IMG_2213.JPG`,    name: 'Francesinha',        note: 'Flavor fatigue central' },
  { src: `${P}/food/IMG_2326.JPG`,    name: '',                   note: '' },
  { src: `${P}/food/IMG_2327.JPG`,    name: '',                   note: '' },
  { src: `${P}/food/IMG_2667.JPG`,    name: 'Cappuccino',         note: '"...one step at a time"' },
  { src: `${P}/food/IMG_2670.JPG`,    name: '',                   note: '' },
  { src: `${P}/food/IMG_3028.JPG`,    name: '',                   note: '' },
]

const artImages = [
  { src: `${P}/art/IMG_0241.JPG`, caption: '' },
  { src: `${P}/art/IMG_0243.JPG`, caption: '' },
  { src: `${P}/art/IMG_1162.JPG`, caption: 'Subway art!' },
  { src: `${P}/art/IMG_1170.JPG`, caption: '' },
  { src: `${P}/art/IMG_1250.JPG`, caption: '"I want to love, to love hopelessly..."' },
  { src: `${P}/art/IMG_1268.JPG`, caption: '' },
  { src: `${P}/art/IMG_1298.JPG`, caption: '' },
  { src: `${P}/art/IMG_1312.JPG`, caption: '' },
  { src: `${P}/art/IMG_1429.JPG`, caption: '' },
  { src: `${P}/art/IMG_1657.JPG`, caption: '' },
  { src: `${P}/art/IMG_1663.JPG`, caption: 'Avicii you are missed' },
]

const pupImages = [
  { src: `${P}/pups/IMG_0306.JPG`, caption: ':(((' },
  { src: `${P}/pups/IMG_1261.JPG`, caption: 'Well-dressed' },
  { src: `${P}/pups/IMG_1313.JPG`, caption: ':D' },
  { src: `${P}/pups/IMG_1927.JPG`, caption: "Couldn't resist" },
  { src: `${P}/pups/IMG_2684.JPG`, caption: 'Snoozer' },
  { src: `${P}/pups/IMG_2828.JPG`, caption: ':)' },
  { src: `${P}/pups/IMG_2932.JPG`, caption: '^_^' },
  { src: `${P}/pups/IMG_2968.JPG`, caption: 'Also Molly' },
]

const skyImages = [
  { src: `${P}/from-the-sky/light-reading.JPG`, caption: 'Got up to some highly effective reading' },
  { src: `${P}/from-the-sky/movie.JPG`,          caption: "Usually it's Crazy Rich Asians, but Top Gun this time" },
  { src: `${P}/from-the-sky/airplane-food.JPG`,  caption: 'I actually like airplane food, sorry not sorry' },
  { src: `${P}/from-the-sky/coast.JPG`,          caption: 'First glimpse of the coast!' },
  { src: `${P}/from-the-sky/city1.JPG`,          caption: 'Coming in over the city' },
  { src: `${P}/from-the-sky/city2.JPG`,          caption: 'Almost there' },
]

const meImages = [
  { src: `${P}/me/IMG_0212.JPG`,                    caption: 'Instagram worthy' },
  { src: `${P}/me/IMG_0992.JPG`,                    caption: 'Addressing the people' },
  { src: `${P}/me/IMG_0998.JPG`,                    caption: '' },
  { src: `${P}/me/IMG_1570.JPG`,                    caption: '' },
  { src: `${P}/me/IMG_1697.JPG`,                    caption: '' },
  { src: `${P}/me/IMG_1973.JPG`,                    caption: '' },
  { src: `${P}/me/IMG_1999.JPG`,                    caption: '' },
  { src: `${P}/me/IMG_2444.JPG`,                    caption: 'The Jeremy Allen White' },
  { src: `${P}/me/20260507_150611_009285.jpeg`,      caption: '' },
  { src: `${P}/me/20260515_001235_004E40.jpeg`,      caption: '' },
  { src: `${P}/me/20260515_001235_0FB7F4.jpeg`,      caption: '' },
  { src: `${P}/me/20260516_101402_01F7CE.jpeg`,      caption: 'Needed this' },
]

/* ─────────────────────────────────────────────────────────────────────────── */
/*  TOUR MODE — TERMINAL / GATE DATA                                           */
/*                                                                             */
/*  Populate `photos` per gate once you've created the per-day folders:        */
/*    public/students/james-nguyen/days/may-06/photo.jpg                       */
/* ─────────────────────────────────────────────────────────────────────────── */

const terminals = [
  {
    code: 'LIS',
    city: 'Lisbon',
    dates: 'May 6 – 12',
    gates: [
      { date: 'May 6',  isoDate: '2026-05-06', label: 'Day 1',  layover: null,     photos: [], journal: ``},
      { date: 'May 7',  isoDate: '2026-05-07', label: 'Day 2',  layover: null,     photos: [], journal: `` },
      { date: 'May 8',  isoDate: '2026-05-08', label: 'Day 3',  layover: null,     photos: [], journal: `` },
      { date: 'May 9',  isoDate: '2026-05-09', label: 'Day 4',  layover: 'Sintra', photos: [], journal: `` },
      { date: 'May 10', isoDate: '2026-05-10', label: 'Day 5',  layover: null,     photos: [], journal: `` },
      { date: 'May 11', isoDate: '2026-05-11', label: 'Day 6',  layover: null,     photos: [], journal: `` },
      { date: 'May 12', isoDate: '2026-05-12', label: 'Day 7',  layover: null,     photos: [], journal: `` },
    ],
  },
  {
    code: 'OPO',
    city: 'Porto',
    dates: 'May 13 – 19',
    gates: [
      { date: 'May 13', isoDate: '2026-05-13', label: 'Day 8',  layover: 'Coimbra', photos: [], journal: `` },
      { date: 'May 14', isoDate: '2026-05-14', label: 'Day 9',  layover: null,       photos: [], journal: `` },
      { date: 'May 15', isoDate: '2026-05-15', label: 'Day 10', layover: null,       photos: [], journal: `` },
      { date: 'May 16', isoDate: '2026-05-16', label: 'Day 11', layover: null,       photos: [], journal: `` },
      { date: 'May 17', isoDate: '2026-05-17', label: 'Day 12', layover: null,       photos: [], journal: `` },
      { date: 'May 18', isoDate: '2026-05-18', label: 'Day 13', layover: null,       photos: [], journal: `` },
      { date: 'May 19', isoDate: '2026-05-19', label: 'Day 14', layover: null,       photos: [], journal: `` },
      { date: 'May 20', isoDate: '2026-05-20', label: 'Day 15', layover: null,       photos: [], journal: `` },
    ],
  },
]

/* ─────────────────────────────────────────────────────────────────────────── */
/*  UTILITY                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

function fmtTime(s) {
  if (!isFinite(s) || s < 0) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  LIGHTBOX                                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */

function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex)
  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, prev, next])

  const img = images[idx]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/92 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-cream-50/10 p-3 text-cream-50 transition hover:bg-cream-50/20"
      >
        ←
      </button>
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative mx-auto max-h-[90vh] max-w-5xl px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={img.src}
          alt={img.caption || img.name || ''}
          className="max-h-[82vh] w-auto rounded-2xl object-contain shadow-deep"
        />
        {(img.caption || img.name) && (
          <p className="mt-3 text-center text-sm text-cream-50/75">
            {img.caption || img.name}
          </p>
        )}
        <p className="mt-1 text-center text-xs text-cream-50/40">
          {idx + 1} / {images.length}
        </p>
      </motion.div>
      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-cream-50/10 p-3 text-cream-50 transition hover:bg-cream-50/20"
      >
        →
      </button>
      <button
        onClick={onClose}
        className="absolute right-5 top-5 rounded-full bg-cream-50/10 px-3 py-1.5 text-sm text-cream-50 transition hover:bg-cream-50/20"
      >
        ✕ close
      </button>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  CAROUSEL                                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */

function Carousel({ images, aspect = 'aspect-4/3', showMeta = false }) {
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  const arrowCls =
    'absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-navy-900/75 p-2.5 ' +
    'text-cream-50 shadow-lg opacity-0 transition-all duration-200 ' +
    'group-hover/car:opacity-100 hover:bg-navy-900 active:scale-95 focus-visible:opacity-100'

  return (
    <>
      <div className="relative mt-10 -mx-5 md:-mx-10 group/car">
        {/* left arrow — hover only */}
        {images.length > 1 && (
          <button onClick={() => scroll(-1)} aria-label="Scroll left" className={`${arrowCls} left-3`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto px-5 pb-4 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        >
          {images.map((img, i) => (
            <figure
              key={img.src}
              className="group/card relative shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-100"
              style={{ scrollSnapAlign: 'start', width: 'clamp(220px, 28vw, 360px)' }}
              onClick={() => setLightboxIdx(i)}
            >
              <div className={`${aspect} overflow-hidden`}>
                <img
                  src={img.src}
                  alt={img.caption || img.name || ''}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-[1.04]"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
              {showMeta ? (
                <figcaption className="p-4">
                  {img.name && (
                    <p className="font-display text-base leading-tight text-navy-700">{img.name}</p>
                  )}
                  {img.note && (
                    <p className="mt-1 text-[13px] text-navy-700/70">{img.note}</p>
                  )}
                </figcaption>
              ) : (img.caption) && (
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 p-3 text-[12px] font-medium text-cream-50 opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        {/* right arrow — hover only */}
        {images.length > 1 && (
          <button onClick={() => scroll(1)} aria-label="Scroll right" className={`${arrowCls} right-3`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            images={images}
            startIndex={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  COLLAPSIBLE SECTION                                                        */
/* ─────────────────────────────────────────────────────────────────────────── */

function CollapsibleSection({ id, bg, maxW = 'max-w-7xl', contentClassName = '', header, children }) {
  const [open, setOpen] = useState(true)

  return (
    <section id={id} className={`scroll-mt-24 ${bg} pt-20 md:pt-24`}>
      {/* Header row + toggle — always visible */}
      <div className={`mx-auto ${maxW} px-5 md:px-10 pb-2`}>
        <div className="relative">
          {header}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Collapse section' : 'Expand section'}
            className="absolute right-0 top-0 flex items-center gap-1.5 rounded-full border border-navy-700/20 bg-cream-50/80 px-3 py-1.5 text-[11px] font-medium text-navy-700/45 shadow-sm backdrop-blur-sm transition hover:border-navy-700/35 hover:text-navy-700"
          >
            {open ? (
              <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 15l-6-6-6 6" />
                </svg>
                Collapse
              </>
            ) : (
              <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
                Expand
              </>
            )}
          </button>
        </div>
      </div>

      {/* Collapsible content — motion.div is full-width so carousel negative-margin bleed stays inside */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 0, 0.25, 1] }}
            style={{ overflow: 'hidden' }}
            className="pb-20 md:pb-24"
          >
            <div className={`mx-auto ${maxW} px-5 md:px-10 ${contentClassName}`}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MINI PLAYER                                                                */
/* ─────────────────────────────────────────────────────────────────────────── */

function MiniPlayer({ isoDate }) {
  const audioRef  = useRef(null)
  const [song, setSong]       = useState(null)   // supabase row
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume]   = useState(() => {
    const saved = parseFloat(localStorage.getItem('jn_volume'))
    return isNaN(saved) ? 0.8 : saved
  })
  const [dragging, setDragging] = useState(false)

  /* fetch song row from supabase */
  useEffect(() => {
    setSong(null)
    setLoading(true)
    setPlaying(false)
    setCurrent(0)
    setDuration(0)

    supabase
      .from('james_nguyen_audios')
      .select('*')
      .eq('date', isoDate)
      .maybeSingle()
      .then(({ data }) => {
        setSong(data)
        setLoading(false)
      })
  }, [isoDate])

  /* wire up audio element events */
  useEffect(() => {
    const el = audioRef.current
    if (!el || !song) return

    el.volume = volume
    el.src    = song.audio_url

    const onMeta = () => {
      el.currentTime = song.start_time ?? 0
      setDuration(el.duration)
    }
    const onTime = () => { if (!dragging) setCurrent(el.currentTime) }
    const onEnd  = () => setPlaying(false)

    el.addEventListener('loadedmetadata', onMeta)
    el.addEventListener('timeupdate', onTime)
    el.addEventListener('ended', onEnd)
    return () => {
      el.removeEventListener('loadedmetadata', onMeta)
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('ended', onEnd)
      el.pause()
    }
  }, [song]) // eslint-disable-line react-hooks/exhaustive-deps

  const togglePlay = () => {
    const el = audioRef.current
    if (!el) return
    if (playing) { el.pause(); setPlaying(false) }
    else         { el.play();  setPlaying(true)  }
  }

  const handleSeekChange = (e) => {
    setCurrent(Number(e.target.value))
  }
  const handleSeekCommit = (e) => {
    const el = audioRef.current
    if (el) el.currentTime = Number(e.target.value)
    setDragging(false)
  }
  const handleVolume = (e) => {
    const v = Number(e.target.value)
    setVolume(v)
    localStorage.setItem('jn_volume', v)
    if (audioRef.current) audioRef.current.volume = v
  }

  /* ── render ── */
  if (loading) {
    return (
      <div className="flex h-full min-h-[260px] flex-col items-center justify-center gap-2 rounded-2xl border border-navy-700/10 bg-navy-800/80 p-6">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-cream-50/20 border-t-gold-400" />
        <p className="text-xs text-cream-50/40">Loading song…</p>
      </div>
    )
  }

  if (!song) {
    return (
      <div className="flex h-full min-h-[260px] flex-col items-center justify-center gap-2 rounded-2xl border border-navy-700/10 bg-navy-800/80 p-6 text-center">
        <span className="text-3xl opacity-30">♪</span>
        <p className="text-sm text-cream-50/50">No song for this day yet.</p>
      </div>
    )
  }

  const progress = duration > 0 ? (current / duration) * 100 : 0

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-navy-700/20 bg-navy-800">
      <audio ref={audioRef} preload="metadata" />

      {/* album art */}
      <div className="relative aspect-square w-full overflow-hidden bg-navy-900">
        {song.album_art_url ? (
          <img
            src={song.album_art_url}
            alt={`${song.title} cover`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-6xl opacity-20 select-none">♫</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-800/80 to-transparent" />
      </div>

      {/* song info + controls */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="truncate font-display text-lg leading-tight text-cream-50">{song.title}</p>
          {song.artist && (
            <p className="truncate text-xs text-cream-50/55">{song.artist}</p>
          )}
        </div>

        {/* seek bar */}
        <div className="flex flex-col gap-1">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.5}
            value={current}
            onChange={handleSeekChange}
            onMouseDown={() => setDragging(true)}
            onMouseUp={handleSeekCommit}
            onTouchStart={() => setDragging(true)}
            onTouchEnd={handleSeekCommit}
            className="jn-range w-full accent-gold-400"
          />
          <div className="flex justify-between text-[10px] text-cream-50/35">
            <span>{fmtTime(current)}</span>
            <span>{fmtTime(duration)}</span>
          </div>
        </div>

        {/* play / pause */}
        <button
          onClick={togglePlay}
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-400 text-navy-900 shadow-md transition hover:bg-gold-500 active:scale-95"
        >
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          )}
        </button>

        {/* volume */}
        <div className="flex items-center gap-2">
          <span className="text-cream-50/40 text-xs">
            {volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={volume}
            onChange={handleVolume}
            className="jn-range flex-1 accent-gold-400"
          />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  DAY POPUP                                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */

function DayPopup({ gate, onClose }) {
  const [slideIdx, setSlideIdx] = useState(0)
  const photos = gate.photos

  const prevSlide = useCallback(() =>
    setSlideIdx(i => (i - 1 + photos.length) % photos.length), [photos.length])
  const nextSlide = useCallback(() =>
    setSlideIdx(i => (i + 1) % photos.length), [photos.length])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, prevSlide, nextSlide])

  /* lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const title = gate.layover
    ? `${gate.date} · ${gate.layover} Layover`
    : `${gate.date} · ${gate.label}`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-navy-900/85 backdrop-blur-sm p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1,    opacity: 1 }}
        exit={{ scale: 0.94,    opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-navy-700/30 bg-navy-900 shadow-deep"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-navy-700/30 px-6 py-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-gold-400">
              {gate.layover ? `Layover · ${gate.city ?? ''}` : gate.label}
            </p>
            <h2 className="font-display text-2xl text-cream-50">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-cream-50/15 px-3 py-1.5 text-sm text-cream-50/60 transition hover:border-cream-50/30 hover:text-cream-50"
          >
            ✕ close
          </button>
        </div>

        {/* body */}
        <div className="grid grid-cols-1 gap-0 md:grid-cols-[1fr_280px]">
          {/* slideshow */}
          <div className="relative flex flex-col bg-navy-800/50">
            {photos.length === 0 ? (
              <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 text-cream-50/30">
                <span className="text-5xl">📷</span>
                <p className="text-sm">Photos coming soon</p>
              </div>
            ) : (
              <>
                <div className="relative aspect-video w-full overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={slideIdx}
                      src={photos[slideIdx].src}
                      alt={photos[slideIdx].caption || ''}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="h-full w-full object-cover"
                    />
                  </AnimatePresence>

                  {/* prev / next */}
                  {photos.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-navy-900/60 p-2 text-cream-50 transition hover:bg-navy-900/80"
                      >←</button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-navy-900/60 p-2 text-cream-50 transition hover:bg-navy-900/80"
                      >→</button>
                    </>
                  )}
                </div>

                {/* caption */}
                <div className="min-h-[2.5rem] px-5 py-3">
                  <p className="text-sm text-cream-50/60">{photos[slideIdx].caption || '\u00A0'}</p>
                </div>

                {/* dots */}
                {photos.length > 1 && (
                  <div className="flex justify-center gap-1.5 pb-4">
                    {photos.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSlideIdx(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          i === slideIdx
                            ? 'w-5 bg-gold-400'
                            : 'w-1.5 bg-cream-50/20 hover:bg-cream-50/40'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* miniplayer */}
          <div className="border-l border-navy-700/30 p-4">
            <MiniPlayer isoDate={gate.isoDate} />
          </div>
        </div>

        {/* journal entry — full-width strip below the grid, scrollable */}
        {gate.journal && (
          <div className="border-t border-navy-700/30 px-6 py-4">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-gold-400/70">
              Journal
            </p>
            <div className="max-h-32 overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:rgba(252,248,241,0.15)_transparent]">
              <p className="whitespace-pre-line text-sm leading-relaxed text-cream-50/70">
                {gate.journal}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  AIRPORT FLOORPLAN (SVG)  —  Two parallel concourses                       */
/*                                                                             */
/*  LIS concourse: top row, gates hang ABOVE it.                              */
/*  OPO concourse: bottom row, gates hang BELOW it.                           */
/*  Connected by a central transfer corridor.                                 */
/* ─────────────────────────────────────────────────────────────────────────── */

const GATE_W = 96
const GATE_H = 68

// LIS concourse: x=30-800, y=148-208 (h=60, w=770)
// 7 gates hang above: y = 148-68-4 = 76 (gate top edge)
// 7 gates in 770px: 7×96=672, rem=98, 8 gaps≈12px
const LIS_ARM_Y1  = 148
const LIS_ARM_Y2  = 208
const LIS_ARM_X1  = 30
const LIS_ARM_X2  = 800
const LIS_GATE_XS = [42, 150, 258, 366, 474, 582, 690]  // left edge of each gate
const LIS_GATE_Y  = LIS_ARM_Y1 - GATE_H - 4              // = 76

// OPO concourse: x=30-880, y=298-358 (h=60, w=850)
// 8 gates hang below: y = 358+4 = 362 (gate top edge)
// 8 gates in 850px: 8×96=768, rem=82, 9 gaps≈9px
const OPO_ARM_Y1  = 298
const OPO_ARM_Y2  = 358
const OPO_ARM_X1  = 30
const OPO_ARM_X2  = 880
const OPO_GATE_XS = [39, 144, 249, 354, 459, 564, 669, 774]  // left edge of each gate
const OPO_GATE_Y  = OPO_ARM_Y2 + 4                            // = 362

// Flat gate list — both terminals now use the same horizontal gate pattern
const allGates = terminals.flatMap((t, ti) =>
  t.gates.map((g, gi) => ({
    ...g,
    city:         t.city,
    terminalCode: t.code,
    gateNum:      ti * 7 + gi + 1,
    svgX:         ti === 0 ? LIS_GATE_XS[gi] : OPO_GATE_XS[gi],
    svgY:         ti === 0 ? LIS_GATE_Y       : OPO_GATE_Y,
  }))
)

// Renders the user-supplied plane PNG as an SVG <image> element.
// The image is centred on (x, y); rotate spins it around that same centre.
// baseSize controls the pixel footprint at scale=1.
const PLANE_IMG = '/students/james-nguyen/plane-svgs/Airplane_silhouette_white.svg.png'

function PlaneSVG({ x, y, rotate = 0, scale = 1, opacity = 0.12 }) {
  const sz = 90 * scale
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`} opacity={opacity}>
      <image
        href={PLANE_IMG}
        x={-sz / 2}
        y={-sz / 2}
        width={sz}
        height={sz}
      />
    </g>
  )
}

function AirportFloorplanSVG({ onGateClick }) {
  const [hovered, setHovered] = useState(null)

  function gc(gate) {
    const empty = gate.photos.length === 0
    const lay   = Boolean(gate.layover)
    const hot   = hovered === gate.isoDate
    // Empty gates are still clickable (popup shows "coming soon")
    if (empty && hot)  return { fill: '#0C1A2C', stroke: 'rgba(252,248,241,0.2)',  t1: 'rgba(252,248,241,0.4)', t2: 'rgba(252,248,241,0.22)', flt: 'none',         cur: 'pointer' }
    if (empty)         return { fill: '#070E1C', stroke: 'rgba(252,248,241,0.1)',  t1: 'rgba(252,248,241,0.28)', t2: 'rgba(252,248,241,0.13)', flt: 'none',         cur: 'pointer' }
    if (lay && hot)    return { fill: '#1F1400', stroke: 'rgba(217,164,65,0.95)', t1: '#F0B840',                t2: 'rgba(217,164,65,0.65)', flt: 'url(#gGold)',    cur: 'pointer' }
    if (lay)           return { fill: '#130D00', stroke: 'rgba(217,164,65,0.5)',  t1: 'rgba(217,164,65,0.85)', t2: 'rgba(217,164,65,0.42)', flt: 'url(#gGoldDim)', cur: 'pointer' }
    if (hot)           return { fill: '#0F2745', stroke: 'rgba(63,122,163,0.95)', t1: '#FCF8F1',                t2: 'rgba(139,181,209,0.8)', flt: 'url(#gBlue)',    cur: 'pointer' }
    /* normal */       return { fill: '#0A1B30', stroke: 'rgba(252,248,241,0.25)', t1: 'rgba(252,248,241,0.85)', t2: 'rgba(252,248,241,0.42)', flt: 'none',          cur: 'pointer' }
  }

  return (
    <svg
      viewBox="0 0 950 478"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full select-none"
      style={{ fontFamily: "'JetBrains Mono','Courier New',monospace" }}
    >
      <defs>
        <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="0.75" fill="rgba(252,248,241,0.05)" />
        </pattern>
        <filter id="gBlue" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b" />
          <feColorMatrix in="b" type="matrix" values="0 0 0 0 0.25 0 0 0 0 0.48 0 0 0 0 0.64 0 0 0 1.5 0" result="cb" />
          <feMerge><feMergeNode in="cb" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="gGold" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b" />
          <feColorMatrix in="b" type="matrix" values="0 0 0 0 0.85 0 0 0 0 0.64 0 0 0 0 0.25 0 0 0 1.5 0" result="cb" />
          <feMerge><feMergeNode in="cb" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="gGoldDim" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
          <feColorMatrix in="b" type="matrix" values="0 0 0 0 0.85 0 0 0 0 0.64 0 0 0 0 0.25 0 0 0 0.55 0" result="cb" />
          <feMerge><feMergeNode in="cb" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── Background ── */}
      <rect x="0" y="0" width="950" height="478" fill="#050D1B" />
      <rect x="0" y="0" width="950" height="478" fill="url(#dots)" />

      {/* ── Taxiway dashes between the two concourses ── */}
      {Array.from({ length: 17 }).map((_, i) => (
        <rect key={`tx${i}`} x={30 + i * 52} y={251} width={34} height={3} rx="1.5"
          fill="rgba(217,164,65,0.07)" />
      ))}

      {/* ── TWO-CONCOURSE BUILDING ── */}

      {/* LIS concourse: top row */}
      <rect x={LIS_ARM_X1} y={LIS_ARM_Y1} width={LIS_ARM_X2 - LIS_ARM_X1} height={LIS_ARM_Y2 - LIS_ARM_Y1}
        fill="#081629" stroke="rgba(252,248,241,0.22)" strokeWidth="1" />

      {/* OPO concourse: bottom row */}
      <rect x={OPO_ARM_X1} y={OPO_ARM_Y1} width={OPO_ARM_X2 - OPO_ARM_X1} height={OPO_ARM_Y2 - OPO_ARM_Y1}
        fill="#081629" stroke="rgba(252,248,241,0.22)" strokeWidth="1" />

      {/* Central transfer corridor connecting the two concourses */}
      <rect x="390" y={LIS_ARM_Y2} width="50" height={OPO_ARM_Y1 - LIS_ARM_Y2}
        fill="#060F1F" stroke="rgba(252,248,241,0.12)" strokeWidth="0.75" />

      {/* ── Moving walkways ── */}
      {/* LIS — top row of dashes */}
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={`mw1${i}`} x={40 + i * 54} y={LIS_ARM_Y1 + 10} width={36} height={5} rx="2.5"
          fill="rgba(252,248,241,0.06)" />
      ))}
      {/* LIS — bottom row of dashes (opposite direction) */}
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={`mw2${i}`} x={755 - i * 54} y={LIS_ARM_Y2 - 15} width={36} height={5} rx="2.5"
          fill="rgba(252,248,241,0.06)" />
      ))}
      {/* OPO — top row */}
      {Array.from({ length: 16 }).map((_, i) => (
        <rect key={`mw3${i}`} x={40 + i * 52} y={OPO_ARM_Y1 + 10} width={34} height={5} rx="2.5"
          fill="rgba(252,248,241,0.06)" />
      ))}
      {/* OPO — bottom row */}
      {Array.from({ length: 16 }).map((_, i) => (
        <rect key={`mw4${i}`} x={835 - i * 52} y={OPO_ARM_Y2 - 15} width={34} height={5} rx="2.5"
          fill="rgba(252,248,241,0.06)" />
      ))}

      {/* ── Labels ── */}

      {/* LIS label */}
      <text x="220" y={LIS_ARM_Y1 + 22} textAnchor="middle" fontSize="11" fontWeight="700"
        fill="rgba(252,248,241,0.45)" letterSpacing="6">LIS</text>
      <text x="220" y={LIS_ARM_Y1 + 37} textAnchor="middle" fontSize="7"
        fill="rgba(252,248,241,0.28)" letterSpacing="3">LISBON · MAY 6–12</text>

      {/* OPO label */}
      <text x="220" y={OPO_ARM_Y1 + 22} textAnchor="middle" fontSize="11" fontWeight="700"
        fill="rgba(252,248,241,0.40)" letterSpacing="6">OPO</text>
      <text x="220" y={OPO_ARM_Y1 + 37} textAnchor="middle" fontSize="7"
        fill="rgba(252,248,241,0.24)" letterSpacing="3">PORTO · MAY 13–20</text>

      {/* Transfer corridor label */}
      <text x="415" y="248" textAnchor="middle" fontSize="5.5"
        fill="rgba(252,248,241,0.18)" letterSpacing="1.5">TRANSFER</text>

      {/* Faint watermark */}
      <text x="620" y="253" textAnchor="middle" fontSize="10"
        fill="rgba(252,248,241,0.05)" letterSpacing="4">UA MIS PORTUGAL 2026</text>

      {/* ── Plane icons ── */}
      <PlaneSVG x={880} y={36} rotate={220} scale={1.6} opacity={0.09} />
      <PlaneSVG x={130} y={440} rotate={340} scale={1.4} opacity={0.07} />

      {/* ── Gates ── */}
      {allGates.map((gate) => {
        const c      = gc(gate)
        const isLIS  = gate.terminalCode === 'LIS'
        const cx     = gate.svgX + GATE_W / 2
        const gLabel = `G${String(gate.gateNum).padStart(2, '0')}`
        const dateStr = gate.date.toUpperCase()
        const cityStr = gate.layover
          ? gate.layover.toUpperCase()
          : (isLIS ? 'LISBON' : 'PORTO')

        return (
          <g
            key={gate.isoDate}
            filter={c.flt}
            style={{ cursor: c.cur }}
            onClick={() => onGateClick(gate)}
            onMouseEnter={() => setHovered(gate.isoDate)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* jetway nub */}
            {isLIS ? (
              // LIS gates hang above: nub from gate bottom up to concourse top
              <line
                x1={cx} y1={gate.svgY + GATE_H}
                x2={cx} y2={LIS_ARM_Y1}
                stroke={c.stroke} strokeWidth="0.5"
              />
            ) : (
              // OPO gates hang below: nub from gate top down to concourse bottom
              <line
                x1={cx} y1={gate.svgY}
                x2={cx} y2={OPO_ARM_Y2}
                stroke={c.stroke} strokeWidth="0.5"
              />
            )}

            {/* gate body */}
            <rect
              x={gate.svgX} y={gate.svgY}
              width={GATE_W} height={GATE_H}
              fill={c.fill} stroke={c.stroke}
              strokeWidth="1" rx="4"
            />

            {/* gate number — top-left corner */}
            <text
              x={gate.svgX + 7}
              y={gate.svgY + 14}
              textAnchor="start"
              fontSize="8.5" fontWeight="700"
              fill={c.t2} letterSpacing="0.5"
            >
              {gLabel}
            </text>

            {/* separator */}
            <line
              x1={gate.svgX + 6} y1={gate.svgY + 19}
              x2={gate.svgX + GATE_W - 6} y2={gate.svgY + 19}
              stroke={c.t2} strokeWidth="0.4" opacity="0.4"
            />

            {/* date — large and prominent */}
            <text
              x={cx} y={gate.svgY + 38}
              textAnchor="middle"
              fontSize="14" fontWeight="700"
              fill={c.t1} letterSpacing="0.5"
            >
              {dateStr}
            </text>

            {/* city / layover name */}
            <text
              x={cx} y={gate.svgY + 56}
              textAnchor="middle"
              fontSize="7.5" fill={c.t2}
              letterSpacing="1.5"
            >
              {cityStr}
            </text>

            {/* layover diamond marker */}
            {gate.layover && (
              <polygon
                points={`${cx},${gate.svgY + 2} ${cx + 5},${gate.svgY + 8} ${cx},${gate.svgY + 14} ${cx - 5},${gate.svgY + 8}`}
                fill="rgba(217,164,65,0.85)"
              />
            )}
          </g>
        )
      })}

      {/* ── Compass rose ── */}
      <g transform="translate(918,452)">
        <circle r="16" fill="none" stroke="rgba(252,248,241,0.1)" strokeWidth="0.75" />
        <text y="-6" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="rgba(252,248,241,0.3)">N</text>
        <line x1="0" y1="-2"  x2="0"   y2="-12" stroke="rgba(252,248,241,0.35)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="0" y1="2"   x2="0"   y2="12"  stroke="rgba(252,248,241,0.1)"  strokeWidth="1"   strokeLinecap="round" />
        <line x1="2" y1="0"   x2="12"  y2="0"   stroke="rgba(252,248,241,0.1)"  strokeWidth="1"   strokeLinecap="round" />
        <line x1="-2" y1="0"  x2="-12" y2="0"   stroke="rgba(252,248,241,0.1)"  strokeWidth="1"   strokeLinecap="round" />
      </g>

      {/* ── Footer ── */}
      <text x="28" y="472" fontSize="7" fill="rgba(252,248,241,0.08)" letterSpacing="2">NOT TO SCALE · UA MIS PORTUGAL 2026</text>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  TOUR MODE                                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */

function TourMode() {
  const [activeGate, setActiveGate] = useState(null)

  return (
    <div className="bg-navy-900">
      {/* Departures ticker bar */}
      <div className="border-b border-cream-50/5 px-5 py-3 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto">
          <span className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-widest text-gold-400">
            Departures
          </span>
          <span className="h-4 w-px shrink-0 bg-cream-50/10" />
          <span className="shrink-0 font-mono text-[11px] text-cream-50/40">LIS · Lisbon Humberto Delgado</span>
          <span className="shrink-0 font-mono text-[11px] text-cream-50/40">OPO · Porto Francisco Sá Carneiro</span>
          <span className="ml-auto shrink-0 font-mono text-[11px] text-cream-50/20">UA MIS · May 2026</span>
        </div>
      </div>

      {/* Intro */}
      <div className="mx-auto max-w-7xl px-5 pt-8 pb-4 md:px-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-crimson-600">
          Portugal 2026 · Interactive Tour
        </p>
        <h2 className="mt-2 font-display text-3xl leading-tight text-cream-50 md:text-4xl">
          Welcome to <span className="text-gold-400">Portugal</span>.
        </h2>
        <p className="mt-2 max-w-xl text-sm text-cream-50/45">
          Click any gate to relive that day with me — photos and the song that I was listening to that day (per my Spotify listening history)! I also made Donovan listen to these songs too while I was showering.
          <span className="ml-3 inline-flex items-center gap-1.5 text-gold-400/60">
            <span className="text-[10px]">◆</span>
            <span>= layover stop</span>
          </span>
        </p>
      </div>

      {/* SVG floorplan — horizontal scroll on very small screens */}
      <div className="mx-auto max-w-7xl overflow-x-auto px-2 pb-10 md:px-4">
        <div style={{ minWidth: '600px' }}>
          <AirportFloorplanSVG onGateClick={setActiveGate} />
        </div>
      </div>

      <AnimatePresence>
        {activeGate && (
          <DayPopup gate={activeGate} onClose={() => setActiveGate(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  GALLERY MODE                                                               */
/* ─────────────────────────────────────────────────────────────────────────── */

function GalleryMode() {
  let sectionNum = 0
  const next = () => String(++sectionNum).padStart(2, '0')

  return (
    <>
      {/* Favorite day */}
      <CollapsibleSection
        id="favorite-day"
        bg="bg-cream-50"
        maxW="max-w-5xl"
        header={
          <SectionHeader
            number={next()}
            kicker={`${favoriteDay.city} · ${favoriteDay.date}`}
            title={favoriteDay.title}
          />
        }
      >
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
                <p key={i} className="font-display text-xl leading-relaxed text-navy-700/90 text-pretty md:text-2xl">
                  {para}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </CollapsibleSection>

      {/* Three things */}
      <CollapsibleSection
        id="three-things"
        bg="bg-cream-100"
        header={<SectionHeader number={next()} kicker="Three things" title="Three things from this trip." />}
      >
        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          {threeThings.map((thing, i) => (
            <FadeIn key={thing.kicker} delay={i * 0.08}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-50 transition-colors hover:border-crimson-600/40">
                <div className="aspect-video overflow-hidden bg-cream-100">
                  <img
                    src={thing.image}
                    alt={thing.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <span className="absolute right-5 top-5 font-display text-3xl text-cream-50/40 transition-colors group-hover:text-cream-50/70">0{i + 1}</span>
                  <p className="text-[13px] italic text-navy-700/50">{thing.caption}</p>
                  <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-crimson-600">{thing.kicker}</p>
                  <p className="text-[15px] leading-relaxed text-navy-700/85">{thing.body}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </CollapsibleSection>

      {/* From the sky */}
      <CollapsibleSection
        id="from-the-sky"
        bg="bg-cream-50"
        header={<SectionHeader number={next()} kicker="From the sky" title="The trip started at 30,000+ feet." />}
      >
        <Carousel images={skyImages} aspect="aspect-4/3" />
      </CollapsibleSection>

      {/* Scenery */}
      <CollapsibleSection
        id="scenery"
        bg="bg-cream-100"
        header={<SectionHeader number={next()} kicker="The scenery" title="Finding beauty in everything." />}
      >
        <Carousel images={sceneryImages} aspect="aspect-4/3" />
      </CollapsibleSection>

      {/* Friends */}
      <CollapsibleSection
        id="friends"
        bg="bg-cream-50"
        header={<SectionHeader number={next()} kicker="Friends" title="Made my trip! &lt;3" />}
      >
        <Carousel images={friendsImages} aspect="aspect-4/3" />
      </CollapsibleSection>

      {/* Me */}
      <CollapsibleSection
        id="me"
        bg="bg-cream-100"
        header={<SectionHeader number={next()} kicker="Best of the Gallery (me)" title="The part you came for." />}
      >
        <Carousel images={meImages} aspect="aspect-3/4" />
      </CollapsibleSection>

      {/* Food */}
      <CollapsibleSection
        id="food"
        bg="bg-cream-50"
        header={<SectionHeader number={next()} kicker="What I ate" title="Stand-out grub." />}
      >
        <Carousel images={foodImages} aspect="aspect-square" showMeta />
      </CollapsibleSection>

      {/* Art */}
      <CollapsibleSection
        id="art"
        bg="bg-cream-100"
        header={<SectionHeader number={next()} kicker="Art!" title="Better than the Louvre." />}
      >
        <Carousel images={artImages} aspect="aspect-4/3" />
      </CollapsibleSection>

      {/* Pups */}
      <CollapsibleSection
        id="pups"
        bg="bg-cream-50"
        header={<SectionHeader number={next()} kicker="The pups" title="TOO CUTE" />}
      >
        <Carousel images={pupImages} aspect="aspect-square" />
      </CollapsibleSection>

      {/* Final message */}
      <CollapsibleSection
        id="final-message"
        bg="bg-cream-100"
        maxW="max-w-3xl"
        contentClassName="text-center"
        header={<SectionHeader number={next()} kicker="Final message" title="Até mais, Portugal." />}
      >
        <FadeIn delay={0.1}>
          <p className="mt-8 font-display text-xl leading-relaxed text-navy-700/90 text-pretty md:text-2xl">
            This trip really was once-in-a-lifetime. The people of the cohort made it something I will never forget,
            and I am so grateful to have had the opportunity to be in another country with this crew, exploring a new
            culture and making so many core memories together. I'll be living down the high for a while!
          </p>
        </FadeIn>
      </CollapsibleSection>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MODE TOGGLE                                                                */
/* ─────────────────────────────────────────────────────────────────────────── */

function ModeToggle({ mode, onChange }) {
  return (
    <div className="flex justify-center py-6">
      <div className="inline-flex items-center gap-1 rounded-full border border-navy-700/15 bg-cream-50 p-1 shadow-sm">
        {['gallery', 'tour'].map((m) => (
          <button
            key={m}
            onClick={() => onChange(m)}
            className={[
              'rounded-full px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] transition-all',
              mode === m
                ? 'bg-navy-700 text-cream-50 shadow-sm'
                : 'text-navy-700/50 hover:text-navy-700',
            ].join(' ')}
          >
            {m === 'gallery' ? '⊞ Gallery' : '✈ Tour'}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  PAGE ROOT                                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */

export function JamesNguyen() {
  const [mode, setMode] = useState('tour')

  return (
    <div className="relative flex min-h-screen flex-col bg-cream-50 text-navy-700">

      {/* ── Hero ── */}
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
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-crimson-600">Hometown</span>
                <span className="h-3 w-px shrink-0 bg-navy-700/15" aria-hidden="true" />
                <span className="text-sm font-medium tracking-tight text-navy-700">{me.hometown}</span>
              </span>
            </div>

            {/* section nav — only shown in gallery mode */}
            {mode === 'gallery' && (
              <div className="mt-6">
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.24em] text-navy-700/50">
                  Jump to section &darr;
                </p>
                <div className="flex flex-wrap justify-evenly gap-y-2 gap-x-2">
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
            )}
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

      {/* ── Mode toggle ── */}
      <ModeToggle mode={mode} onChange={setMode} />

      {/* ── Content ── */}
      <AnimatePresence mode="wait">
        {mode === 'gallery' ? (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <GalleryMode />
          </motion.div>
        ) : (
          <motion.div
            key="tour"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-cream-50"
          >
            <TourMode />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Footer ── */}
      <footer className="bg-crimson-800 py-16 text-cream-50">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <p className="font-display text-3xl leading-tight tracking-tight text-cream-50 md:text-4xl">
            Thanks for reading!
          </p>
          <p className="mt-4 text-sm text-cream-50/75">&mdash; {me.name}, UA MIS Portugal 2026</p>
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

export default JamesNguyen
