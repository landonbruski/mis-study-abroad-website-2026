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

/* -------- 1. Profile -------- */
const me = {
  name: 'Sydney March',
  firstName: 'Sydney',
  lastName: 'March',
  monogram: 'SM',
  year: 'Rising Senior · AMP',
  major: 'MIS · CS minor',
  hometown: 'Colleyville, TX',
  tagline: 'Willing to try anything except new foods.*',
  taglineNote:
    '*Did successfully try all ten courses at the Michelin Star Restaurant',
  /** Drop a portrait at /public/students/sydney-march/portrait.jpeg to replace. */
  photo: '/students/sydney-march/portrait.jpeg',
}

/* -------- 2. Quick about the trip (sticky-note rapid fire) -------- */
const aboutMe = [
  { label: 'Best souvenir', value: 'Handpainted tiles' },
  { label: 'Weirdest food', value: 'Pigeon' },
  { label: 'Most interesting coffee order', value: 'Chai with strawberry' },
  { label: 'What I read', value: 'Hunger Games: Sunrise on the Reaping + TheBibleRecap' },
]

/* -------- 3. Where I ate (polaroid grid + Michelin gallery) -------- */
const places = [
  { label: 'Bifana lunch', date: 'May 7', src: '/students/sydney-march/food/01-bifana.jpeg' },
  { label: "Dinner w/ Rose", date: 'May 7', src: '/students/sydney-march/food/02-rose-dinner.jpeg' },
  { label: 'La Fiorentina', date: 'May 8', src: '/students/sydney-march/food/03-la-fiorentina-pasta.jpeg' },
  { label: 'Cinnamon rolls', date: 'May 12', src: '/students/sydney-march/food/06-cinnamon-rolls.jpeg' },
  { label: 'Porta de Alfama', date: 'May 12', src: '/students/sydney-march/food/08-fado-2-group.jpeg' },
  { label: 'Cooking class', date: 'May 15', src: '/students/sydney-march/food/15-cooking-class.jpeg' },
]
const michelinPics = [
  '/students/sydney-march/food/09-michelin-1.jpeg',
  '/students/sydney-march/food/10-michelin-2.jpeg',
  '/students/sydney-march/food/11-michelin-3.jpeg',
  '/students/sydney-march/food/12-michelin-4.jpeg',
  '/students/sydney-march/food/13-michelin-5.jpeg',
  '/students/sydney-march/food/14-michelin-6.jpeg',
]

/* -------- 4. Travel troubles (luggage tag stories) -------- */
const troubles = [
  {
    num: 1,
    from: 'Mallorca',
    date: 'May 3–5',
    stamp: 'Scratch-free',
    body: [
      `I was in charge of picking the rental. Found one with enough seats and only three bag slots when we had four. Figured one extra seat plus one fewer bag would even out. It did not. The shuttle email was in Caroline's inbox (being 21, she was the designated driver so her contact was put on everything), so we Ubered to the lot and got reimbursed later. Oops. Then our bags didn't fit in the car I'd picked. Three swaps in, we ended up with the biggest car on the island, a brand none of us had ever heard of. Paid for the upgrade. Settled on the cheapest insurance, and they freaked us out about every possible scratch.`,
      `Next day, town parking. We pulled into what looked like an alley, decided we couldn't squeeze through, and parked. Cars piled up behind us, including a Spanish-speaking lady who explained it was actually a street and she needed past, urgently. Got back in and inched down on the curb. Later, stuck behind a van parked half on the curb with a woman waiting to leave her home. Couldn't even get out of the car to help, so we hung our heads out the windows on both sides: "not much room over here" / "not much room over here either." Caroline pulled the mirror in for two extra inches.`,
    ],
  },
  {
    num: 2,
    from: 'Mallorca → Lisbon',
    date: 'May 6',
    stamp: 'On time, technically',
    body: [
      `We assumed we were all on the same flight to Lisbon. We were not. Sarah Jane knew she had an earlier takeoff, so we planned to drop her off, return the rental, then check in. The rest of us were in line for bag drop when Caroline looked at her boarding pass and realized her flight had taken off fifteen minutes ago. Called the airline rep about compensation. No. Turned out her mom had booked her on the earlier flight without any of us knowing. Molly got moved up to Sarah Jane's flight. Caroline and I scrambled to get her on mine, a connection through Madrid. Stakes were high. We had a tight schedule waiting in Lisbon. There was a seat, maybe because Molly's had just opened up. Same gate as Molly and Sarah Jane. The agent freaked us out a little: they'd moved Molly to an earlier Madrid connection because they didn't think she'd make ours. The same one Caroline and I still had to make. Spoiler: we made it. With time for coffee and lunch.`,
    ],
  },
  {
    num: 3,
    from: 'Lisbon',
    date: 'May 10',
    stamp: 'Lucky timing',
    body: [
      `Small group trip to the Sanctuary of Christ the King after our itinerary events. Evan announced he was leaving the lobby in ten minutes. Me, Landon, and our faculty advisor Jeff went along. Jeff didn't want to walk, so he Ubered us. We thanked him and didn't think about it again. In the car we started doing the math on closing time. Pretty soon, it turned out. Decided we'd be fine even if we didn't make it up.`,
      `Got there. No line for tickets at all. Then we saw the sign: 1.5 hour wait. They closed in 1.5 hours. Hoped it was a typo. It was not. Waited the whole time, half-expecting they'd sell us tickets and then close the elevator on us. The line behind us never grew, only two groups. Jeff's sore feet saved us. The Uber bought us exactly the minutes we needed, and we ended up at the feet of the statue with some of the best views of the trip.`,
    ],
  },
  {
    num: 4,
    from: 'Peneda-Gerês National Park',
    date: 'May 17',
    stamp: 'Right on schedule',
    body: [
      `Free day. Anna, Landon, and I decided last-minute to spend it at Portugal's only national park. What a great idea. Booked the Uber out, skipped scheduling a return because it was expensive and we didn't know when we'd want it. Plan A: request one in the moment. Plan B: bus. Left before hotel breakfast, got dropped in a village where nothing was open either. Wandered until we found a fruit market that only took cash. Used the ATM outside. Sat down across the hall to eat. Looked to our right. Directly across from us was a cafe. Exactly the thing we'd been looking for ten minutes earlier. Well shoot. Bought pastries, saved the fruit for the hike.`,
      `Picked a trail with a waterfall, two and a half hours and a lot of elevation away. (The one research point I had right: you really do need a rental car to get around the park.) Caught a ride at the end with some friendly people. Saw the waterfall, ate the fruit, walked thirty minutes to the bus stop. Times posted turned out to be for the next day. Plan A also broke: no Uber driver close enough to accept. Found a 5:30 bus in another town, another thirty minutes away on foot. That village was even deader. We were hungry and didn't have enough cash if this fell through. Found yet another town with a stop 45 minutes away that we could walk to but not back from. Got gelato, more pastries, more cash. Said we'd wait five more minutes and then call Jeff. Four, three, two — the bus showed up. It went to Braga, still an hour from our hotel, so we Ubered the last leg. Requesting one in the park hadn't worked because no drivers were close enough. Scheduling one in advance would have, even if it cost more. Should've done that from the start. But we made it.`,
    ],
  },
  {
    num: 5,
    from: 'Porto → Atlanta',
    date: 'May 19',
    stamp: 'Track stars',
    body: [
      `Flying home. OPO to MAD to ORD to ATL. The first flight got delayed for unknown reasons. By the time we landed in Madrid, our Chicago flight was already boarding. Thirty minutes to make it. I was at the back of the plane, Caroline up front. Iberia was mostly Spanish-speaking, so when I tried to ask people to let me through, almost nobody flinched. One girl said she was also going to Chicago and helped me out. We got off into a group of about five of us all sprinting for the same connection. A man feeding us directions. A passport line that finally let us cut. A shuttle that was the first breath we got to take. Then more sprinting. Got to the gate. They'd waited for us.`,
      `In the air, I started thinking about the next connection. Land in Chicago, claim bags, clear customs, recheck bags, clear security, board. Two hours, minus whatever the late connection had eaten. We landed with 40 minutes. Ran again, this time shouting at everyone we passed because we were back in the US. Skipped lines, found our bags first off the belt. The recheck counter just told us to drop them and go. We made the gate before boarding even started. Got coffee. Texted everyone we made it.`,
      `Then they told me there was no seat for me. Apparently the airline hadn't realized we were track stars and rebooked us. To what flight? Nobody knew. Not the gate, not Iberia, not the airline I'd booked through. The longest I waited in Chicago was on someone to tell me what flight I was on. One Alliance help desk eventually figured it out, we triple-checked at the new gate, and we made it to Atlanta two hours behind schedule.`,
      `One more thing: this all started with the 4am shuttle to Porto, on two hours of sleep. My mom had booked me a flight from Birmingham to Dallas early the next morning, so it was a quick turnaround and jetlag to fight. No issues with that one, though. Finally finally home.`,
    ],
  },
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
.syd-tag {
  position: relative;
  background: #ffffff;
  border: 1.5px solid rgba(158, 27, 50, 0.4);
  padding: 44px 28px 28px;
  box-shadow: 0 14px 30px -18px rgba(0,0,0,0.3);
  border-radius: 3px;
}
.syd-tag::before {
  content: '';
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background: var(--syd-cream-warm);
  border: 2px solid var(--syd-crimson-deep);
  border-radius: 50%;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.15);
}
.syd-tag::after {
  content: '';
  position: absolute;
  top: -24px;
  left: 50%;
  width: 2px;
  height: 30px;
  background: var(--syd-crimson-deep);
  opacity: 0.5;
  border-radius: 1px;
  transform: translateX(-50%) rotate(-8deg);
  transform-origin: bottom center;
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
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="syd-hand mt-2 max-w-xl text-lg text-navy-700/70"
            >
              {me.taglineNote}
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
            a few quick things about the trip →
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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

      {/* ============== Where I ate (polaroid grid + Michelin gallery) ============== */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <StampHeader
            number="01"
            kicker="Where I ate"
            title="Places we sat down."
            rotate={-4}
          />

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-x-10 md:gap-y-16">
            {places.map((p, i) => {
              const tilt = [-3, 2, -1.5, 3, -2, 1.5, -2.5, 2.5, -1][i] ?? 0
              const tapeLeft = ['18%', '46%', '30%', '52%', '22%', '40%', '34%', '24%', '48%'][i] ?? '30%'
              const tapeRot = [-7, 5, -4, 6, -8, 4, -5, 7, -3][i] ?? 0
              return (
                <motion.figure
                  key={p.label}
                  {...dropIn(tilt, i * 0.05)}
                  whileHover={{ y: -6, rotate: 0 }}
                  className="relative mx-auto w-full max-w-xs"
                >
                  <div
                    className="syd-tape syd-tape-pink"
                    style={{ left: tapeLeft, top: '-12px', transform: `rotate(${tapeRot}deg)` }}
                  />
                  <div className="syd-pink-frame p-3 shadow-[0_22px_44px_-22px_rgba(0,0,0,0.35)]">
                    <div className="aspect-4/5 overflow-hidden bg-[var(--syd-cream-warm)]">
                      <img
                        src={p.src}
                        alt={p.label}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <figcaption className="flex items-baseline justify-between gap-3 px-2 pt-3 pb-1">
                      <span className="syd-script text-2xl leading-none" style={{ color: 'var(--syd-crimson)' }}>
                        {p.label}
                      </span>
                      <span className="syd-hand text-sm text-navy-700/70">{p.date}</span>
                    </figcaption>
                  </div>
                </motion.figure>
              )
            })}
          </div>

          {/* ---- Michelin gallery ---- */}
          <div className="mt-24">
            <div className="mb-8 flex flex-col items-start gap-2">
              <motion.span
                initial={{ opacity: 0, scale: 0.6, rotate: 10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                className="syd-stamp text-base uppercase"
              >
                The tasting menu
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="syd-script text-4xl leading-none md:text-5xl"
                style={{ color: 'var(--syd-crimson)' }}
              >
                Michelin · May 13
              </motion.h3>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-6">
              {michelinPics.map((src, i) => {
                const tilt = [-2, 1.5, -1, 2, -1.5, 1][i] ?? 0
                return (
                  <motion.div
                    key={src}
                    {...dropIn(tilt, i * 0.04)}
                    whileHover={{ y: -4, rotate: 0 }}
                    className="relative"
                  >
                    <div className="syd-pink-frame overflow-hidden p-2 shadow-[0_16px_30px_-20px_rgba(0,0,0,0.35)]">
                      <div className="aspect-square overflow-hidden bg-[var(--syd-cream-warm)]">
                        <img
                          src={src}
                          alt={`Michelin course ${i + 1}`}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============== Travel troubles (luggage tags) ============== */}
      <section className="relative py-20 md:py-28" style={{ background: 'var(--syd-cream-warm)' }}>
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <StampHeader
            number="02"
            kicker="Travel troubles"
            title="The official incident log."
            rotate={2}
          />

          <div className="mt-16 flex flex-col gap-14">
            {troubles.map((t, i) => {
              const tilt = i % 2 === 0 ? -1.2 : 1.5
              return (
                <motion.article
                  key={t.num}
                  {...dropIn(tilt, i * 0.05)}
                  whileHover={{ rotate: 0, y: -4 }}
                  className="syd-tag mx-auto w-full max-w-2xl"
                >
                  <header className="border-b border-[var(--syd-crimson)]/25 pb-3">
                    <p className="syd-hand text-sm uppercase tracking-wide" style={{ color: 'var(--syd-crimson-deep)' }}>
                      Incident #{t.num}
                    </p>
                    <p className="syd-script mt-1 text-3xl leading-none md:text-4xl" style={{ color: 'var(--syd-crimson)' }}>
                      {t.from}
                    </p>
                    <p className="syd-hand mt-1 text-base text-navy-700/80">
                      {t.date}
                    </p>
                  </header>
                  <div className="mt-4 space-y-3 text-base leading-relaxed text-navy-700/85 text-pretty">
                    {t.body.map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </div>
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
            title="Two weeks. One suitcase. One backpack."
            rotate={-2}
          />

          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ type: 'spring', stiffness: 100, damping: 14 }}
            whileHover={{ rotate: 0, y: -6 }}
            className="relative mx-auto mt-12 w-full max-w-xl"
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
            </p>
          </motion.div>
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
            <p className="syd-hand text-2xl text-white/85">thanks for reading</p>
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
