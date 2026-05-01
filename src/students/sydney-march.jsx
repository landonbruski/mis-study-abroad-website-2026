/**
 * Sydney March — Portugal 2026.
 *
 * Personal page. Auto-routed at /students/sydney-march.
 *
 * Aesthetic: scrapbook. Butter-yellow page wash, hot-pink marker
 * script (Caveat Brush) for titles, navy body text, taped polaroids,
 * pink offset frames, washi tape, rubber stamps, flip cards, and a
 * pink cursor-dot trail. All page styles are scoped under .syd-page
 * via an inline <style> block so nothing leaks onto shared layouts.
 */

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FadeIn } from '../components/ui/FadeIn'

/* -------- 1. Profile -------- */
const me = {
  name: 'Sydney March',
  firstName: 'Sydney',
  lastName: 'March',
  monogram: 'SM',
  year: 'Junior · AMP',
  major: 'MIS · Computer Science minor',
  hometown: 'Colleyville, TX',
  tagline:
    'Placeholder one-liner about me, in my voice. Something specific, not a label.',
  /** Drop a portrait at /public/students/sydney-march/portrait.jpg to replace. */
  photo: '/students/sydney-march/portrait.jpg',
}

/* -------- 2. Quick about me (sticky-note rapid fire) -------- */
const aboutMe = [
  { label: 'Currently', value: 'Placeholder' },
  { label: 'Studying', value: 'MIS + CS minor at Bama' },
  { label: 'From', value: 'Colleyville, TX' },
  { label: 'Coffee order', value: 'Placeholder' },
  { label: 'Travel rule', value: 'Placeholder' },
  { label: 'Soundtrack', value: 'Placeholder' },
]

/* -------- 3. Animals seen (corkboard, flip cards) -------- */
const animals = [
  { emoji: '🐈', name: 'Lisbon street cat', where: 'Alfama, Lisbon', when: 'May __', note: 'Sat on a windowsill like she owned the block.' },
  { emoji: '🐦', name: 'Stork', where: 'Óbidos rooftops', when: 'May __', note: 'Massive nest on a chimney. Nobody seemed surprised.' },
  { emoji: '🐟', name: 'Sardine (RIP)', where: 'Cervejaria Ramiro', when: 'May __', note: 'Counts. Don\'t @ me.' },
  { emoji: '🐕', name: 'Café dog', where: 'Porto', when: 'May __', note: 'Slept under our table the whole lunch.' },
  { emoji: '🦅', name: 'Sintra hawk', where: 'Pena Palace woods', when: 'May __', note: 'Circled exactly once, then disappeared.' },
  { emoji: '🐢', name: 'Pond turtle', where: 'Jardim da Estrela', when: 'May __', note: 'On a log. Three of them. Stacked.' },
]

/* -------- 4. Books read on the trip -------- */
const books = [
  { title: 'Placeholder Title One', author: 'Author Name', note: 'Why I picked it.', finished: true },
  { title: 'Placeholder Title Two', author: 'Author Name', note: 'A line that stuck.', finished: true },
  { title: 'Placeholder Title Three', author: 'Author Name', note: 'Started on the plane.', finished: false },
  { title: 'Placeholder Title Four', author: 'Author Name', note: 'For the long train rides.', finished: false },
]

/* -------- 5. What I packed (custom additions to the PNG list) -------- */
const packingExtras = [
  'Disposable camera (one for each city)',
  'A tiny journal for bullet points',
  'Polaroid film (8 shots — pick wisely)',
  'A scarf that doubles as a blanket on planes',
  'Backup sunglasses (I will lose the first pair)',
  'A pen that won\'t leak at altitude',
]

/* -------- 6. Favorite day -------- */
const favoriteDay = {
  date: 'May __',
  city: 'TBD',
  title: 'Placeholder for the day that stuck with me.',
  body: `A few sentences will go here when I get back. The specific moment,
the thing I noticed, the part I keep replaying.`,
}

/* -------- 7. Journal -------- */
const entries = [
  { date: 'May __', title: 'Placeholder entry.', body: 'A paragraph will go here. Short, specific, like I am telling a friend at dinner.' },
  { date: 'May __', title: 'Another placeholder.', body: 'Another short paragraph for a different day.' },
]

/* ============== Page-scoped styles ============== */
const PAGE_CSS = `
.syd-page {
  --syd-cream: #FCF8F1;
  --syd-cream-warm: #FBF1E8;
  --syd-crimson: #9E1B32;
  --syd-crimson-deep: #7A1326;
  --syd-crimson-darker: #560B1A;
  --syd-rose: #F2C5CB;
  --syd-rose-soft: #FBE5E8;
  --syd-rose-pale: #FDF1F3;
  --syd-tape: rgba(242, 197, 203, 0.7);
  background: var(--syd-cream);
  color: var(--color-navy-700);
}
.syd-stripes {
  background-image: repeating-linear-gradient(
    90deg,
    var(--syd-rose) 0 22px,
    var(--syd-cream) 22px 44px
  );
}
.syd-script {
  font-family: 'Caveat Brush', 'Caveat', cursive;
  font-weight: 400;
  letter-spacing: 0.005em;
}
.syd-hand {
  font-family: 'Caveat', 'Caveat Brush', cursive;
  font-weight: 500;
}
.syd-pink-frame {
  position: relative;
  background: white;
  border: 2px solid var(--syd-crimson);
}
.syd-pink-frame::before {
  content: '';
  position: absolute;
  inset: 10px -10px -10px 10px;
  border: 3px solid var(--syd-crimson);
  z-index: -1;
  pointer-events: none;
}
.syd-tape {
  position: absolute;
  width: 88px;
  height: 22px;
  background: var(--syd-tape);
  border-left: 1px dashed rgba(255,255,255,0.5);
  border-right: 1px dashed rgba(255,255,255,0.5);
  box-shadow: 0 4px 10px -4px rgba(0,0,0,0.15);
}
.syd-tape-pink {
  background: rgba(242, 197, 203, 0.85);
}
.syd-tape-cream {
  background: rgba(252, 248, 241, 0.95);
  border-left: 1px dashed rgba(158, 27, 50, 0.25);
  border-right: 1px dashed rgba(158, 27, 50, 0.25);
}
.syd-tape-rose {
  background: rgba(251, 229, 232, 0.95);
}
.syd-paper-torn {
  background: var(--syd-cream);
  --tear: 8px;
  -webkit-mask:
    radial-gradient(var(--tear) at var(--tear) 50%,#0000 98%,#000) left/100% 100%,
    radial-gradient(var(--tear) at calc(100% - var(--tear)) 50%,#0000 98%,#000) right/100% 100%;
  -webkit-mask-composite: source-in;
          mask-composite: intersect;
}
.syd-cursor-dot {
  position: fixed;
  width: 10px;
  height: 10px;
  background: var(--syd-crimson);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  animation: syd-fade-up 0.85s ease-out forwards;
  box-shadow: 0 0 8px rgba(158, 27, 50, 0.4);
}
@keyframes syd-fade-up {
  0%   { opacity: 0.85; transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0;    transform: translate(-50%, -50%) scale(0.3); }
}
.syd-flip {
  perspective: 1000px;
}
.syd-flip-inner {
  transition: transform 0.6s cubic-bezier(0.2, 0.65, 0.3, 1);
  transform-style: preserve-3d;
  position: relative;
  width: 100%;
  height: 100%;
}
.syd-flip[data-flipped="true"] .syd-flip-inner {
  transform: rotateY(180deg);
}
.syd-flip-face {
  position: absolute;
  inset: 0;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
}
.syd-flip-back {
  transform: rotateY(180deg);
}
.syd-stamp {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--syd-crimson-deep);
  color: var(--syd-crimson-deep);
  font-family: 'Caveat Brush', cursive;
  letter-spacing: 0.05em;
  border-radius: 6px;
  padding: 4px 12px;
  transform: rotate(-6deg);
}
.syd-underline-draw {
  background-image: linear-gradient(transparent 60%, rgba(242,197,203,0.85) 60%, rgba(242,197,203,0.85) 92%, transparent 92%);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.syd-script-underline {
  position: relative;
  display: inline-block;
}
.syd-script-underline::after {
  content: '';
  position: absolute;
  left: 2%;
  right: 2%;
  bottom: 4px;
  height: 4px;
  background: var(--syd-crimson);
  border-radius: 999px;
  opacity: 0.85;
}
@media (prefers-reduced-motion: reduce) {
  .syd-cursor-dot { display: none; }
}
`

/* ============== Cursor trail ============== */
function CursorTrail() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return
    let cooling = false
    const place = (x, y) => {
      const dot = document.createElement('div')
      dot.className = 'syd-cursor-dot'
      dot.style.left = x + 'px'
      dot.style.top = y + 'px'
      document.body.appendChild(dot)
      window.setTimeout(() => dot.remove(), 850)
    }
    const onMove = (e) => {
      if (cooling) return
      cooling = true
      place(e.clientX, e.clientY)
      window.setTimeout(() => { cooling = false }, 55)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return null
}

/* ============== Tiny helpers ============== */
function dropIn(rotate = 0, delay = 0) {
  return {
    initial: { opacity: 0, y: -40, rotate: rotate - 12 },
    whileInView: { opacity: 1, y: 0, rotate },
    viewport: { once: true, margin: '-10% 0px' },
    transition: { type: 'spring', stiffness: 120, damping: 14, delay },
  }
}

function StampHeader({ number, kicker, title, subtitle, rotate = -3 }) {
  return (
    <div className="flex flex-col gap-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: rotate + 18 }}
        whileInView={{ opacity: 1, scale: 1, rotate }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        className="syd-stamp self-start text-lg uppercase"
      >
        {kicker}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="syd-script text-5xl leading-[0.9] tracking-tight md:text-7xl"
        style={{ color: 'var(--syd-crimson)' }}
      >
        <span className="syd-hand mr-3 align-middle text-2xl text-navy-700/60 md:text-3xl">{number}.</span>
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-base leading-relaxed text-navy-700/80 md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

/* ============== Page ============== */
export function SydneyMarch() {
  const [flippedAnimal, setFlippedAnimal] = useState(null)

  return (
    <div className="syd-page relative flex min-h-screen flex-col">
      <style>{PAGE_CSS}</style>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Caveat:wght@400;500;600;700&display=swap"
        precedence="default"
      />
      <CursorTrail />

      {/* ============== Cover ============== */}
      <header className="relative overflow-hidden pt-24 pb-20 md:pt-28 md:pb-28">
        <div aria-hidden="true" className="syd-stripes pointer-events-none absolute left-0 right-0 top-0 h-5" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(60% 50% at 12% 10%, rgba(242,197,203,0.55), transparent 60%), radial-gradient(50% 50% at 88% 90%, rgba(158,27,50,0.12), transparent 60%)',
          }}
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 md:px-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="relative">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="syd-hand text-2xl"
              style={{ color: 'var(--syd-crimson-deep)' }}
            >
              From the desk of {me.firstName} ✿
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="syd-script mt-2 leading-[0.85] tracking-tight"
              style={{ color: 'var(--syd-crimson)', fontSize: 'clamp(4rem, 12vw, 10rem)' }}
            >
              {me.firstName}'s
              <span className="block" style={{ color: 'var(--color-navy-700)' }}>
                Portugal
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-navy-700/85 text-pretty"
            >
              {me.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] transition-all hover:-translate-y-0.5"
                style={{
                  background: 'white',
                  borderColor: 'var(--syd-crimson)',
                  color: 'var(--syd-crimson-deep)',
                }}
              >
                ← cohort
              </Link>
              <span className="syd-hand inline-flex items-center rounded-full bg-white/70 px-4 py-2 text-lg" style={{ color: 'var(--color-navy-700)' }}>
                {me.year} · {me.major}
              </span>
              <span className="syd-hand inline-flex items-center rounded-full bg-white/70 px-4 py-2 text-lg" style={{ color: 'var(--color-navy-700)' }}>
                ✈ {me.hometown}
              </span>
            </motion.div>
          </div>

          {/* Photo, taped to the page */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 110, damping: 14, delay: 0.2 }}
            whileHover={{ rotate: -1, y: -4 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="syd-tape syd-tape-pink" style={{ left: '14%', top: '-12px', transform: 'rotate(-8deg)' }} />
            <div className="syd-tape syd-tape-cream" style={{ right: '12%', top: '-10px', transform: 'rotate(6deg)' }} />
            <div className="syd-pink-frame relative p-3 shadow-[0_30px_60px_-25px_rgba(158,27,50,0.4)]">
              <div className="aspect-4/5 overflow-hidden bg-[var(--syd-cream-warm)]">
                <img
                  src={me.photo}
                  alt={me.name}
                  className="h-full w-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </div>
              <div className="flex items-center justify-between px-2 pt-3 pb-1">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-700/70">
                  {me.name}
                </span>
                <span className="syd-script text-3xl" style={{ color: 'var(--syd-crimson)' }}>
                  {me.firstName}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ============== About strip (sticky notes) ============== */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <p className="syd-hand mb-6 text-2xl" style={{ color: 'var(--syd-crimson-deep)' }}>
            a few quick things →
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {aboutMe.map((item, i) => {
              const tilt = [-3, 2, -1, 3, -2, 1][i] ?? 0
              return (
                <motion.div
                  key={item.label}
                  {...dropIn(tilt, i * 0.06)}
                  whileHover={{ rotate: 0, y: -4 }}
                  className="relative rounded-sm bg-white p-4 shadow-[0_12px_24px_-14px_rgba(0,0,0,0.25)]"
                  style={{ background: i % 2 === 0 ? 'var(--syd-cream-warm)' : 'var(--syd-rose-soft)' }}
                >
                  <p className="syd-hand text-sm uppercase tracking-wide" style={{ color: 'var(--syd-crimson-deep)' }}>
                    {item.label}
                  </p>
                  <p className="mt-1 text-base font-semibold leading-snug text-navy-700">
                    {item.value}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============== Animals seen (corkboard, flip cards) ============== */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <StampHeader
            number="01"
            kicker="Animals spotted"
            title="The unofficial wildlife log."
            subtitle="Tap a card to flip it. I'm keeping count."
            rotate={-4}
          />

          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-7 lg:grid-cols-3">
            {animals.map((a, i) => {
              const tilt = [-4, 3, -2, 4, -3, 2][i] ?? 0
              const isFlipped = flippedAnimal === i
              return (
                <motion.div
                  key={a.name}
                  {...dropIn(tilt, i * 0.05)}
                  whileHover={{ y: -6, rotate: tilt + (tilt > 0 ? -1 : 1) }}
                  className="syd-flip relative aspect-4/5 cursor-pointer"
                  data-flipped={isFlipped}
                  onClick={() => setFlippedAnimal(isFlipped ? null : i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlippedAnimal(isFlipped ? null : i) } }}
                >
                  <div className="syd-tape syd-tape-pink" style={{ left: '38%', top: '-10px', transform: 'rotate(-4deg)' }} />
                  <div className="syd-flip-inner">
                    {/* Front */}
                    <div className="syd-flip-face syd-pink-frame flex flex-col items-center justify-center gap-3 p-6 text-center shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]">
                      <span className="text-7xl" aria-hidden="true">{a.emoji}</span>
                      <p className="syd-script text-3xl leading-tight" style={{ color: 'var(--syd-crimson)' }}>
                        {a.name}
                      </p>
                      <p className="syd-hand text-base text-navy-700/60">tap to flip</p>
                    </div>
                    {/* Back */}
                    <div
                      className="syd-flip-face syd-flip-back flex flex-col justify-between p-5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]"
                      style={{ background: 'var(--syd-rose-soft)', border: '2px solid var(--syd-crimson)' }}
                    >
                      <div>
                        <p className="syd-hand text-sm uppercase tracking-wide" style={{ color: 'var(--syd-crimson-deep)' }}>
                          {a.when}
                        </p>
                        <p className="mt-1 text-lg font-semibold text-navy-700">{a.where}</p>
                      </div>
                      <p className="text-base leading-relaxed text-navy-700/85 text-pretty">
                        {a.note}
                      </p>
                      <p className="syd-script self-end text-2xl" style={{ color: 'var(--syd-crimson-deep)' }}>
                        — S
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============== Books read ============== */}
      <section className="relative py-20 md:py-28" style={{ background: 'var(--syd-cream-warm)' }}>
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <StampHeader
            number="02"
            kicker="On the page"
            title="What I read on the trip."
            subtitle="Long flights, train rides, and one rainy afternoon in Porto."
            rotate={2}
          />

          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {books.map((b, i) => {
              const tilt = [-3, 4, -2, 3][i] ?? 0
              return (
                <motion.article
                  key={b.title}
                  {...dropIn(tilt, i * 0.06)}
                  whileHover={{ y: -6, rotate: 0 }}
                  className="relative"
                >
                  <div className="syd-tape syd-tape-cream" style={{ left: '30%', top: '-12px', transform: 'rotate(-3deg)' }} />
                  <div className="syd-pink-frame flex flex-col gap-3 p-4 shadow-[0_20px_40px_-22px_rgba(0,0,0,0.3)]">
                    <div className="flex aspect-2/3 items-center justify-center bg-[var(--syd-rose-soft)] p-4 text-center">
                      <p className="syd-script text-2xl leading-tight" style={{ color: 'var(--syd-crimson-deep)' }}>
                        {b.title}
                      </p>
                    </div>
                    <div>
                      <p className="syd-hand text-base" style={{ color: 'var(--syd-crimson-deep)' }}>
                        {b.author}
                      </p>
                      <p className="text-sm leading-relaxed text-navy-700/80">{b.note}</p>
                    </div>
                  </div>
                  {b.finished && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5, rotate: 30 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: -14 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.3 + i * 0.05 }}
                      className="syd-stamp absolute -right-2 top-4 text-sm"
                    >
                      finished
                    </motion.span>
                  )}
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============== What I packed ============== */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <StampHeader
            number="03"
            kicker="What I packed"
            title="Two weeks. One suitcase. One carry-on."
            subtitle="The official Portugal Girls list (stuck right onto the page) plus the extras only I would bring."
            rotate={-2}
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
            {/* Pinned PNG */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ type: 'spring', stiffness: 100, damping: 14 }}
              whileHover={{ rotate: 0, y: -6 }}
              className="relative mx-auto w-full max-w-xl"
            >
              <div className="syd-tape syd-tape-pink" style={{ left: '8%', top: '-14px', transform: 'rotate(-10deg)' }} />
              <div className="syd-tape syd-tape-cream" style={{ right: '8%', top: '-12px', transform: 'rotate(8deg)' }} />
              <div className="syd-tape syd-tape-pink" style={{ left: '40%', bottom: '-14px', transform: 'rotate(3deg)' }} />
              <div className="syd-pink-frame overflow-hidden p-2 shadow-[0_30px_60px_-22px_rgba(0,0,0,0.35)]">
                <img
                  src="/students/sydney-march/packing.png"
                  alt="Portugal Girls packing list, made by Sydney"
                  className="block w-full"
                />
              </div>
              <p className="syd-hand mt-4 text-center text-xl" style={{ color: 'var(--syd-crimson-deep)' }}>
                ↑ the original — made it for the group
              </p>
            </motion.div>

            {/* My extras */}
            <div className="relative">
              <p className="syd-script text-4xl md:text-5xl" style={{ color: 'var(--syd-crimson)' }}>
                + my extras
              </p>
              <p className="syd-hand mt-1 text-xl text-navy-700/70">
                things only I would bring
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {packingExtras.map((item, i) => (
                  <FadeIn key={item} delay={i * 0.05}>
                    <li className="flex items-start gap-3 rounded-md bg-white px-4 py-3 shadow-[0_10px_22px_-16px_rgba(0,0,0,0.25)]">
                      <span
                        className="syd-script mt-0.5 text-2xl leading-none"
                        style={{ color: 'var(--syd-crimson)' }}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span className="text-base leading-relaxed text-navy-700">{item}</span>
                    </li>
                  </FadeIn>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============== My Mallorca & Portugal Guide (PDF) ============== */}
      <section className="relative py-20 md:py-28" style={{ background: 'var(--syd-cream-warm)' }}>
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <StampHeader
            number="04"
            kicker="My guidebook"
            title="The Mallorca & Portugal book I made."
            subtitle="Pre-trip planning got out of hand. Twenty-three pages of itinerary, outfits, restaurants, and stops. Open it if you want the whole thing."
            rotate={3}
          />

          <motion.a
            href="/students/sydney-march/guide.pdf"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ type: 'spring', stiffness: 100, damping: 14 }}
            whileHover={{ y: -6, rotate: 0, scale: 1.01 }}
            className="mt-12 block"
          >
            <div className="relative mx-auto max-w-3xl">
              <div className="syd-tape syd-tape-pink" style={{ left: '10%', top: '-14px', transform: 'rotate(-7deg)' }} />
              <div className="syd-tape syd-tape-cream" style={{ right: '10%', top: '-12px', transform: 'rotate(5deg)' }} />
              <div
                className="syd-pink-frame relative grid grid-cols-1 gap-0 overflow-hidden md:grid-cols-[1.1fr_1fr]"
                style={{ background: 'var(--syd-cream-warm)' }}
              >
                {/* Faux cover, matches the actual PDF cover */}
                <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
                  <p className="syd-script leading-[0.9]" style={{ color: 'var(--syd-crimson)', fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}>
                    Mallorca
                    <span className="block text-3xl md:text-4xl">&amp;</span>
                    Portugal
                  </p>
                  <p className="syd-hand mt-4 text-xl text-navy-700/70">
                    a Sydney March production
                  </p>
                  <span
                    className="mt-6 inline-flex items-center gap-2 rounded-full border-2 bg-white px-5 py-2 text-sm font-semibold uppercase tracking-[0.18em]"
                    style={{ borderColor: 'var(--syd-crimson)', color: 'var(--syd-crimson-deep)' }}
                  >
                    Open the guide ↗
                  </span>
                  <p className="mt-3 text-xs text-navy-700/55">PDF · 23 pages</p>
                </div>
                <div
                  className="hidden md:block"
                  style={{
                    background:
                      'linear-gradient(135deg, #FBE5E8 0%, #FCF8F1 50%, #F2C5CB 100%)',
                  }}
                >
                  <div className="flex h-full items-center justify-center p-8">
                    <div className="grid grid-cols-2 gap-3">
                      {['🌊', '🏛', '🥐', '☀️', '✈️', '📷'].map((e, i) => (
                        <motion.span
                          key={i}
                          aria-hidden="true"
                          initial={{ opacity: 0, scale: 0, rotate: -20 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.1 + i * 0.07 }}
                          className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-3xl shadow-[0_10px_24px_-14px_rgba(158,27,50,0.35)]"
                        >
                          {e}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.a>
        </div>
      </section>

      {/* ============== Favorite day ============== */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5 md:px-10">
          <StampHeader
            number="05"
            kicker="The one day"
            title={favoriteDay.title}
            subtitle={`${favoriteDay.city} · ${favoriteDay.date}`}
            rotate={-2}
          />
          <motion.div
            {...dropIn(1, 0.1)}
            className="mt-12 rounded-md bg-white p-8 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.3)] md:p-12"
          >
            <p className="syd-hand text-2xl leading-relaxed text-navy-700/90 md:text-3xl">
              {favoriteDay.body}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============== Journal ============== */}
      {entries.length > 0 && (
        <section className="relative py-20 md:py-28" style={{ background: 'var(--syd-cream-warm)' }}>
          <div className="mx-auto max-w-3xl px-5 md:px-10">
            <StampHeader
              number="06"
              kicker="Journal"
              title="A few entries from the road."
              rotate={2}
            />
            <div className="mt-12 flex flex-col gap-8">
              {entries.map((entry, i) => {
                const tilt = i % 2 === 0 ? -1.5 : 1.5
                return (
                  <motion.article
                    key={`${entry.date}-${i}`}
                    {...dropIn(tilt, i * 0.06)}
                    whileHover={{ rotate: 0, y: -3 }}
                    className="relative bg-white p-7 shadow-[0_18px_36px_-20px_rgba(0,0,0,0.25)] md:p-9"
                  >
                    <div className="syd-tape syd-tape-pink" style={{ left: '10%', top: '-12px', transform: 'rotate(-6deg)' }} />
                    <p className="syd-hand text-xl" style={{ color: 'var(--syd-crimson-deep)' }}>
                      {entry.date}
                    </p>
                    <h3 className="syd-script mt-1 text-4xl leading-tight md:text-5xl" style={{ color: 'var(--color-navy-700)' }}>
                      {entry.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-navy-700/85 text-pretty md:text-lg">
                      {entry.body}
                    </p>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============== Footer ============== */}
      <footer className="relative overflow-hidden py-20 md:py-24" style={{ background: 'var(--syd-crimson-darker)' }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0"
          style={{
            background:
              'radial-gradient(60% 60% at 80% 20%, rgba(242,197,203,0.18), transparent 60%), radial-gradient(50% 50% at 10% 90%, rgba(158,27,50,0.55), transparent 60%)',
          }}
        />
        <div aria-hidden="true" className="syd-stripes pointer-events-none absolute left-0 right-0 top-0 h-3 opacity-80" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 md:flex-row md:items-end md:justify-between md:px-10">
          <div>
            <p className="syd-hand text-2xl text-white/85">thanks for reading 𓆩♡𓆪</p>
            <p
              className="syd-script mt-1 leading-[0.85]"
              style={{ color: 'white', fontSize: 'clamp(4rem, 12vw, 9rem)' }}
            >
              xoxo,<br />
              {me.firstName}
            </p>
            <p className="syd-hand mt-4 text-lg text-white/80">
              {me.monogram} · UA MIS Portugal 2026
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 bg-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[var(--syd-crimson-deep)]"
          >
            ← back to the cohort
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default SydneyMarch
