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

/* -------- 1. Your profile -------- */
const me = {
  name: 'Molly Waldron ❤︎⁠',
  year: 'Senior (sadly)', // Freshman / Sophomore / Junior / Senior / MS
  major: 'Management Information Systems',
  hometown: 'Dallas, TX',
  headerBullets: [
    'Senior (sadly)',
    'MIS Major',
    'Enjoyer of everything besides the rain in Lisbon',
  ],
  /** A photo in /public/students/your-slug.jpg works best. */
  photo: '/students/molly-waldron/pfp.jpeg',
}

/* -------- 2. Bio -------- */
const bio = {
  date: ' ',
  city: ' ',
  title: 'Page Overview',
  body: `Because I nearly the doubled the amount of pictures in my already aggregiously packed camera roll this trip, I decided to curate a few image galleries to highlight my favorite moments, meals, and views in Lisbon & Porto! Scroll through to see the memories I made :)`,
}
// /* -------- 3. Three things -------- */
// const threeThings = [
//   {
//     kicker: 'Best thing I ate',
//     body: 'Bifana, gelato, pastel denata, codcakes, the list goes on and on bc I just love food!',
//   },
//   {
//     kicker: 'Something I did not expect',
//     body: 'I actually enjoyed learning from the language and cultural barriers becuase it forced me to be more mindful and creative while communicating.',
//   },
//   {
//     kicker: 'What I am bringing home',
//     body: 'A newfound love for tea! I have drank some almost every day since I have been home! So european of me :)',
//   },
// ]

/* -------- 4. A free day in Douro Valley -------- */
const douroValleySection = {
  title: 'A day spent in the Duoro Valley',
  caption: 'On our free day, a group of us traveled through the mountains of Portugal to visit a few wineries in the valleys of Vinho Verde and Douro. The views were unbelievable and the wine was exquisite (who would have guessed)!',
}

const douroValleyPhotos = [
  { src: '/students/molly-waldron/views/winery.jpeg', caption: ' ' },
  { src: '/students/molly-waldron/views/wineryvinhoverde.jpeg', caption: 'So beautiful ;)' },
  { src: '/students/molly-waldron/views/winerysjinvalley.jpeg', caption: ' ' },
  { src: '/students/molly-waldron/friends/wineryboatride.jpeg', caption: 'Us, casually on the most beautiful boat ride to ever occur.' },
]

/* -------- 5. Farewell dinner cruise -------- */
const farewellSection = {
  title: 'The best way to say goodbye',
  caption: 'Such a special evening with the whole group on a sunset cruise in Porto (cannot believe that setence is true). It was such a special way to close out the trip. Jeff even requested a picture which proves how amazing this evening was.',
}

const farewellPhotos = [
  { src: '/students/molly-waldron/city/farewellcruiseview.jpeg', caption: ' ' },
  { src: '/students/molly-waldron/friends/farewelljames.jpeg', caption: ' ' },
  { src: '/students/molly-waldron/friends/farewelljeff.JPEG', caption: 'Im sobbing!!' },
  { src: '/students/molly-waldron/friends/farewellolivia.jpeg', caption: ' ' },
  { src: '/students/molly-waldron/friends/farewellsydney.jpeg', caption: ' ' },
  { src: '/students/molly-waldron/friends/farewellevam.jpeg', caption: ' ' },
]

/* -------- 6. Photo galleries -------- */
const cityPhotos = [
  { src: '/students/molly-waldron/city/bluetile.jpeg', caption: ' ' },
  { src: '/students/molly-waldron/city/tiles.jpeg', caption: 'handmade tiles, so precious' },
  { src: '/students/molly-waldron/city/lisbonbuidlings.jpeg', caption: 'I want to live in a pink tile building' },
  { src: '/students/molly-waldron/city/tangledpalace.jpeg', caption: 'Its giving Rapunzel' },
  { src: '/students/molly-waldron/city/tigusbridge.jpeg', caption: '' },
  { src: '/students/molly-waldron/city/meonbridge.jpeg', caption: 'Me on bridge slay' },
  { src: '/students/molly-waldron/city/viewfromcablecar.jpeg', caption: ' ' },
  { src: '/students/molly-waldron/city/insidefoodtourstop.jpeg', caption: '' },
]

const foodPhotos = [
  { src: '/students/molly-waldron/food/bifana.jpeg', caption: 'Big sandwich girl so I ate this up, figuratively and literally' },
  { src: '/students/molly-waldron/food/bifaname.jpeg', caption: 'The biggest smile I had all trip and that is saying something' },
  { src: '/students/molly-waldron/food/pasteldenata.jpeg', caption: 'UGH MISS THIS' },
  { src: '/students/molly-waldron/food/jaxonpasteldenata.jpeg', caption: 'One pastel de nata feature is not enough and Jaxon looks great too!' },
  { src: '/students/molly-waldron/food/sangria.jpeg', caption: 'This & yap.' },
  { src: '/students/molly-waldron/food/sammich.jpeg', caption: 'Classic sammy moment' },
  { src: '/students/molly-waldron/food/banana.jpeg', caption: 'This washed up on the shore? I think a mermaid goddess sent it to me' },
  { src: '/students/molly-waldron/food/michelindessert.jpeg', caption: 'Michelin starred dessert, I peaked here.' },
]

const viewPhotos = [
  { src: '/students/molly-waldron/views/cathedral.jpeg', caption: 'Breathtaking.' },
  { src: '/students/molly-waldron/views/montessary.jpeg', caption: 'Feel like I am in Hogwarts. So stunning!' },
  { src: '/students/molly-waldron/views/sintra.jpeg', caption: 'The palace of Sintra' },
  { src: '/students/molly-waldron/views/prettything.jpeg', caption: 'Hidden gem <3' },
  { src: '/students/molly-waldron/views/winebar.jpeg', caption: 'ITCHING to go back to this wine bar. Seriously a fairytale.' },
]

const friendPhotos = [
  { src: '/students/molly-waldron/friends/4girls.jpeg', caption: 'SQUADDDD' },
  { src: '/students/molly-waldron/friends/selfie.jpeg', caption: 'Miss them so bad!!!' },
  { src: '/students/molly-waldron/friends/lookout.jpeg', caption: '' },
  { src: '/students/molly-waldron/friends/cablecars.jpeg', caption: ' ' },
  { src: '/students/molly-waldron/friends/cookingclass.jpeg', caption: 'We slayed this cooking class truly' },
  { src: '/students/molly-waldron/friends/karaoke.jpeg', caption: 'KARAOKE NIGHT IN MY ELEMENT FOR REAL' },
  { src: '/students/molly-waldron/friends/jamesstatue.jpeg', caption: ' ' },
  { src: '/students/molly-waldron/friends/tami.jpeg', caption: ' ' },
]

const sarahJaneSection = {
  title: 'Roomie Feature!!',
  intro: 'Sarah Jane was the best roomie ever and she made my trip sooo special!! I will never forget all the giggles we shared, songs we sang, and of course the sweet treats we located on the daily. Thank you for being so awesome queen <3!!!!',
}

const sarahJanePhotos = [
  { src: '/students/molly-waldron/friends/sarahjane.jpeg', caption: 'Dad selfie' },
  { src: '/students/molly-waldron/friends/sarahjane1.jpeg', caption: '' },
  { src: '/students/molly-waldron/friends/sarahjane2.jpeg', caption: 'Just having a little song and a giggle' },
  { src: '/students/molly-waldron/friends/sarahjane3.jpeg', caption: 'Candid joy honestly' },
]

/* -------- 7. Journal entries (optional, as many as you want) -------- */
// const entries = [
//   {
//     date: '[Date]',
//     title: '[Journal entry title]',
//     body: '[Paragraphs go here. Write like you are telling a friend at dinner.]',
//   },
//   {
//     date: '[Date]',
//     title: '[Another entry title]',
//     body: '[More stories, reflections, or random moments you want to save.]',
//   },
// ]

const PAGE_CSS = `
.molly-page {
  --molly-cream: #FCF8F1;
  --molly-cream-warm: #FBF1E8;
  --molly-pink: #F5D0D8;
  --molly-pink-soft: #FAE8ED;
  --molly-pink-pale: #FDF4F6;
  --molly-rose: #E8A4B4;
  --molly-crimson: #9E1B32;
  --molly-navy: #0B1F3A;
  --molly-tile-blue: #1B4F72;
  --molly-tile-blue-light: #3A7CA5;
  --molly-tile-cream: #F5F0E6;
  --molly-tile-border: #B8C9D9;
}
.molly-page {
  background: var(--molly-cream);
  color: var(--molly-navy);
}
.molly-section-pink {
  background:
    radial-gradient(ellipse 70% 55% at 12% 18%, rgba(245, 208, 216, 0.55), transparent 60%),
    radial-gradient(ellipse 50% 45% at 88% 82%, rgba(158, 27, 50, 0.07), transparent 55%),
    var(--molly-pink-pale);
}
.molly-section-cream {
  background:
    radial-gradient(ellipse 60% 50% at 90% 12%, rgba(245, 208, 216, 0.35), transparent 55%),
    var(--molly-cream);
}
.molly-azulejo-strip {
  display: flex;
  height: 48px;
  overflow: hidden;
  border-bottom: 1px solid rgba(27, 79, 114, 0.12);
  background: var(--molly-tile-cream);
}
.molly-azulejo-tile {
  display: block;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
}
.molly-stamp {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  border: 3px double var(--molly-crimson);
  border-radius: 4px;
  padding: 9px 18px 8px;
  color: var(--molly-crimson);
  transform: rotate(var(--molly-stamp-rotate, -7deg));
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 2px 3px 0 rgba(158, 27, 50, 0.14);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  line-height: 1.1;
  text-transform: uppercase;
}
.molly-stamp-heading {
  padding: 12px 22px 10px;
  font-size: 13px;
  letter-spacing: 0.22em;
  margin-bottom: 0.65rem;
}
.molly-stamp-heading .molly-stamp-line {
  font-size: 10px;
  letter-spacing: 0.32em;
}
.molly-stamp-title {
  padding: 1.15rem 1.85rem 1.05rem;
  max-width: 38rem;
  margin-bottom: 0;
  border-width: 3px;
  font-family: var(--font-display, Georgia, serif);
  font-size: clamp(1.5rem, 4.2vw, 2.75rem);
  font-weight: 500;
  letter-spacing: 0.04em;
  line-height: 1.12;
  text-transform: none;
  transform: none;
  box-shadow: 3px 4px 0 rgba(158, 27, 50, 0.16);
}
.molly-stamp-title .molly-stamp-line {
  font-size: clamp(1.1rem, 3vw, 2.1rem);
  letter-spacing: 0.06em;
  margin-top: 0.4rem;
  opacity: 0.9;
  text-transform: none;
}
.molly-stamp-title-center {
  text-align: center;
}
.molly-stamp-line {
  font-size: 9px;
  letter-spacing: 0.3em;
  opacity: 0.78;
}
.molly-stamp-footer {
  padding: 1.75rem 2.75rem 1.5rem;
  font-size: clamp(1.35rem, 3.2vw, 2.25rem);
  letter-spacing: 0.22em;
  border-width: 4px;
  margin-bottom: 0;
  box-shadow: 3px 5px 0 rgba(0, 0, 0, 0.18);
}
.molly-stamp-footer .molly-stamp-line {
  font-size: clamp(0.8rem, 1.6vw, 1.15rem);
  letter-spacing: 0.34em;
  margin-top: 0.25rem;
}
.molly-footer-grid {
  display: grid;
  gap: 2.5rem;
  align-items: center;
  padding-top: 2rem;
}
.molly-footer-stamp-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (min-width: 768px) {
  .molly-footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
  .molly-footer-stamp-wrap {
    justify-content: center;
  }
}
.molly-section-subtitle {
  margin-top: 1.25rem;
  max-width: 34rem;
  font-size: 1rem;
  line-height: 1.65;
  color: rgba(11, 31, 58, 0.72);
}
.molly-hero-name {
  white-space: nowrap;
  font-size: clamp(1.65rem, 5.8vw, 7rem);
}
.molly-hero-bullets {
  margin-top: 1.5rem;
  max-width: 36rem;
  padding-left: 0;
  list-style: none;
}
.molly-hero-bullets li {
  position: relative;
  padding-left: 1.25rem;
  font-size: 1.125rem;
  line-height: 1.65;
  color: rgba(11, 31, 58, 0.8);
}
.molly-hero-bullets li + li {
  margin-top: 0.35rem;
}
.molly-hero-bullets li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #C9768A;
  font-weight: 700;
}
.molly-bio-center {
  margin-inline: auto;
  display: flex;
  max-width: 42rem;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.molly-bio-center .molly-caption-box,
.molly-bio-center .molly-bio-card {
  margin-inline: auto;
  width: 100%;
}
.molly-polaroid {
  position: relative;
  background: white;
  padding: 12px 12px 44px;
  border: 1px solid rgba(11, 31, 58, 0.1);
  box-shadow:
    8px 10px 0 rgba(245, 208, 216, 0.85),
    0 24px 48px -20px rgba(11, 31, 58, 0.28);
  transform: rotate(var(--molly-tilt, -1deg));
}
.molly-tape {
  position: absolute;
  width: 76px;
  height: 22px;
  background: rgba(245, 208, 216, 0.88);
  border-left: 1px dashed rgba(255, 255, 255, 0.65);
  border-right: 1px dashed rgba(255, 255, 255, 0.65);
  box-shadow: 0 3px 8px -3px rgba(158, 27, 50, 0.2);
  z-index: 2;
}
.molly-carousel-stage {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  max-height: min(72vh, 640px);
  width: 100%;
  background: var(--molly-cream-warm);
}
.molly-carousel-stage img {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.molly-carousel-btn {
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
  color: var(--molly-navy);
  font-size: 1.125rem;
  backdrop-filter: blur(6px);
  transition: border-color 0.2s, color 0.2s, transform 0.2s;
}
.molly-carousel-btn:hover {
  border-color: var(--molly-crimson);
  color: var(--molly-crimson);
}
.molly-carousel-btn-left { left: 0.75rem; transform: translateY(-50%); }
.molly-carousel-btn-right { right: 0.75rem; transform: translateY(-50%); }
.molly-carousel-btn-left:hover,
.molly-carousel-btn-right:hover {
  transform: translateY(-50%) scale(1.06);
}
@media (min-width: 768px) {
  .molly-carousel-btn-left { left: 1rem; }
  .molly-carousel-btn-right { right: 1rem; }
}
.molly-dot {
  height: 7px;
  width: 7px;
  border-radius: 9999px;
  background: rgba(11, 31, 58, 0.18);
  transition: background 0.2s, transform 0.2s;
}
.molly-dot-active {
  background: var(--molly-crimson);
  transform: scale(1.25);
}
.molly-caption-box {
  margin-top: 1.75rem;
  min-height: 5rem;
  max-width: 36rem;
  border-radius: 1rem;
  border: 1.5px dashed rgba(232, 164, 180, 0.65);
  background: rgba(255, 255, 255, 0.55);
  padding: 1.15rem 1.35rem;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: rgba(11, 31, 58, 0.62);
  font-style: italic;
}
.molly-bio-card {
  position: relative;
  margin-top: 2rem;
  border-radius: 1.25rem;
  border: 1px solid rgba(232, 164, 180, 0.45);
  background: linear-gradient(135deg, rgba(255,255,255,0.82), rgba(253, 244, 246, 0.92));
  padding: 2rem 1.75rem;
  box-shadow: 0 20px 40px -28px rgba(158, 27, 50, 0.35);
}
.molly-bio-card::before {
  content: '';
  position: absolute;
  inset: 8px;
  border: 1px solid rgba(158, 27, 50, 0.08);
  border-radius: 0.9rem;
  pointer-events: none;
}
.molly-hero-glow {
  background:
    radial-gradient(60% 55% at 18% 15%, rgba(245, 208, 216, 0.65), transparent 60%),
    radial-gradient(45% 40% at 82% 78%, rgba(158, 27, 50, 0.1), transparent 55%);
}
.molly-gallery-panel {
  position: relative;
  padding: 0 0.25rem;
}
@media (min-width: 1024px) {
  .molly-gallery-split {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
    gap: 3rem;
    align-items: center;
  }
  .molly-gallery-split-flip > .molly-gallery-copy {
    order: 2;
  }
  .molly-gallery-split-flip > .molly-gallery-panel {
    order: 1;
  }
}
.molly-butterfly-bg {
  pointer-events: none;
  user-select: none;
  filter: drop-shadow(0 2px 6px rgba(158, 27, 50, 0.12));
}
.molly-section-content {
  position: relative;
  z-index: 1;
}
`

function AzulejoTile({ variant = 0, className = '' }) {
  const patterns = [
    <>
      <circle cx="24" cy="24" r="5" fill="#1B4F72" />
      <path d="M24 9 C29 16 29 22 24 24 C19 22 19 16 24 9" fill="#1B4F72" />
      <path d="M24 39 C29 32 29 26 24 24 C19 26 19 32 24 39" fill="#1B4F72" />
      <path d="M9 24 C16 29 22 29 24 24 C22 19 16 19 9 24" fill="#1B4F72" />
      <path d="M39 24 C32 29 26 29 24 24 C26 19 32 19 39 24" fill="#1B4F72" />
      <circle cx="9" cy="9" r="2.5" fill="#3A7CA5" opacity="0.7" />
      <circle cx="39" cy="9" r="2.5" fill="#3A7CA5" opacity="0.7" />
      <circle cx="9" cy="39" r="2.5" fill="#3A7CA5" opacity="0.7" />
      <circle cx="39" cy="39" r="2.5" fill="#3A7CA5" opacity="0.7" />
    </>,
    <>
      <rect x="14" y="14" width="20" height="20" rx="2" fill="none" stroke="#1B4F72" strokeWidth="1.5" />
      <path d="M24 12 V36 M12 24 H36" stroke="#3A7CA5" strokeWidth="1" opacity="0.8" />
      <circle cx="24" cy="24" r="3" fill="#1B4F72" />
      <path d="M18 18 L30 30 M30 18 L18 30" stroke="#1B4F72" strokeWidth="0.8" opacity="0.45" />
    </>,
    <>
      <path d="M24 10 C30 14 34 20 24 24 C14 20 18 14 24 10" fill="#1B4F72" />
      <path d="M24 38 C30 34 34 28 24 24 C14 28 18 34 24 38" fill="#3A7CA5" opacity="0.85" />
      <path d="M10 24 C14 18 20 14 24 24 C20 34 14 30 10 24" fill="#3A7CA5" opacity="0.85" />
      <path d="M38 24 C34 30 28 34 24 24 C28 14 34 18 38 24" fill="#1B4F72" />
      <circle cx="24" cy="24" r="2.5" fill="#F5F0E6" stroke="#1B4F72" strokeWidth="0.8" />
    </>,
  ]

  return (
    <svg
      aria-hidden="true"
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <rect width="48" height="48" fill="#F5F0E6" />
      <rect x="0.5" y="0.5" width="47" height="47" fill="none" stroke="#B8C9D9" strokeWidth="0.75" />
      <g opacity="0.92">{patterns[variant % patterns.length]}</g>
    </svg>
  )
}

function AzulejoStrip({ className = '' }) {
  return (
    <div aria-hidden="true" className={`molly-azulejo-strip absolute inset-x-0 top-0 ${className}`}>
      {Array.from({ length: 48 }, (_, i) => (
        <AzulejoTile key={i} variant={i % 3} className="molly-azulejo-tile" />
      ))}
    </div>
  )
}

const BUTTERFLY_LAYOUTS = [
  [
    { top: '16%', right: '4%', size: 56, rotate: 10, opacity: 0.48 },
    { bottom: '20%', left: '3%', size: 42, rotate: -16, flip: true, opacity: 0.42 },
  ],
  [
    { top: '24%', left: '5%', size: 50, rotate: -8, opacity: 0.45 },
    { bottom: '14%', right: '6%', size: 38, rotate: 14, flip: true, opacity: 0.4 },
    { top: '52%', right: '2%', size: 32, rotate: 6, opacity: 0.36 },
  ],
  [
    { top: '12%', right: '8%', size: 48, rotate: -12, flip: true, opacity: 0.44 },
    { bottom: '24%', left: '6%', size: 52, rotate: 8, opacity: 0.5 },
  ],
  [
    { top: '20%', left: '3%', size: 46, rotate: 18, opacity: 0.43 },
    { bottom: '16%', right: '4%', size: 58, rotate: -6, flip: true, opacity: 0.48 },
  ],
  [
    { top: '18%', right: '3%', size: 40, rotate: 5, opacity: 0.4 },
    { bottom: '22%', left: '4%', size: 54, rotate: -10, opacity: 0.46 },
    { top: '58%', right: '7%', size: 34, rotate: 20, flip: true, opacity: 0.38 },
  ],
  [
    { top: '14%', left: '7%', size: 38, rotate: -14, flip: true, opacity: 0.41 },
    { bottom: '18%', right: '5%', size: 50, rotate: 12, opacity: 0.45 },
  ],
  [
    { top: '26%', right: '6%', size: 46, rotate: -8, opacity: 0.42 },
    { bottom: '12%', left: '2%', size: 36, rotate: 16, flip: true, opacity: 0.39 },
  ],
  [
    { top: '15%', left: '4%', size: 54, rotate: 6, opacity: 0.47 },
    { bottom: '20%', right: '3%', size: 40, rotate: -18, flip: true, opacity: 0.41 },
  ],
]

function RusticButterfly({ size = 40, rotate = 0, flip = false, light = false, opacity = 0.44, style = {} }) {
  const wing = light ? '#F5D0D8' : '#E8A4B4'
  const wingDeep = light ? '#FADCE3' : '#C9768A'
  const body = light ? '#FCF8F1' : '#9E1B32'
  const stroke = light ? '#FAE8ED' : '#9E1B32'
  const wingStroke = { stroke, strokeWidth: 1.2, strokeLinejoin: 'round' }

  return (
    <svg
      aria-hidden="true"
      className="molly-butterfly-bg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      style={{
        position: 'absolute',
        opacity,
        transform: `rotate(${rotate}deg) ${flip ? 'scaleX(-1)' : ''}`,
        ...style,
      }}
    >
      {/* upper left */}
      <path
        d="M32 24 C32 16 24 10 17 12 C11 14 9 19 13 23 C17 26 24 25 32 24 Z"
        fill={wing}
        {...wingStroke}
      />
      {/* upper right */}
      <path
        d="M32 24 C32 16 40 10 47 12 C53 14 55 19 51 23 C47 26 40 25 32 24 Z"
        fill={wing}
        {...wingStroke}
      />
      {/* lower left */}
      <path
        d="M32 26 C32 32 24 40 16 39 C10 37 9 32 14 28 C19 25 26 26 32 26 Z"
        fill={wingDeep}
        fillOpacity="0.9"
        {...wingStroke}
      />
      {/* lower right */}
      <path
        d="M32 26 C32 32 40 40 48 39 C54 37 55 32 50 28 C45 25 38 26 32 26 Z"
        fill={wingDeep}
        fillOpacity="0.9"
        {...wingStroke}
      />
      <ellipse cx="32" cy="27" rx="1.5" ry="9" fill={body} opacity="0.85" />
      <path
        d="M30 17c-1-2 0-3.5 2-4.5M34 17c1-2 0-3.5-2-4.5"
        fill="none"
        stroke={body}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  )
}

function SectionButterflies({ variant = 0, light = false }) {
  const items = BUTTERFLY_LAYOUTS[variant % BUTTERFLY_LAYOUTS.length]

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {items.map((b, i) => (
        <RusticButterfly
          key={i}
          size={b.size}
          rotate={b.rotate}
          flip={b.flip}
          opacity={b.opacity}
          light={light}
          style={{ top: b.top, right: b.right, bottom: b.bottom, left: b.left }}
        />
      ))}
    </div>
  )
}

function titleToStamp(title) {
  const words = title.trim().split(/\s+/)
  if (words.length <= 3) {
    return { line1: title }
  }
  const mid = Math.ceil(words.length / 2)
  return {
    line1: words.slice(0, mid).join(' '),
    line2: words.slice(mid).join(' '),
  }
}

function PassportStamp({ line1, line2, rotate = -7, className = '', heading = false, title = false, footer = false, centered = false }) {
  const sizeClass = footer
    ? 'molly-stamp-footer'
    : title
      ? `molly-stamp-title${centered ? ' molly-stamp-title-center' : ''}`
      : heading
        ? 'molly-stamp-heading'
        : 'mb-5'

  return (
    <div
      className={`molly-stamp ${sizeClass} ${className}`}
      style={{ '--molly-stamp-rotate': `${title ? 0 : rotate}deg` }}
    >
      <span>{line1}</span>
      {line2 && <span className="molly-stamp-line">{line2}</span>}
    </div>
  )
}

function MollySectionHeading({ stamp, subtitle, centered = false }) {
  return (
    <div className={centered ? 'flex flex-col items-center text-center' : 'flex flex-col items-start'}>
      {stamp && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.65, delay: 0.05 }}
        >
          <PassportStamp {...stamp} title centered={centered} />
        </motion.div>
      )}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className={`molly-section-subtitle ${centered ? 'text-center' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

function MollySection({ tone = 'cream', children, className = '', decorVariant = 0, decorLight = false }) {
  const toneClass = tone === 'pink' ? 'molly-section-pink' : 'molly-section-cream'
  return (
    <section className={`relative overflow-hidden py-20 md:py-28 ${toneClass} ${className}`}>
      <AzulejoStrip />
      <SectionButterflies variant={decorVariant} light={decorLight} />
      <div className="molly-section-content mx-auto max-w-7xl px-5 md:px-10">{children}</div>
    </section>
  )
}

function GalleryBlock({
  tone,
  title,
  subtitle,
  caption,
  photos,
  flip = false,
  decorVariant = 0,
}) {
  return (
    <MollySection tone={tone} decorVariant={decorVariant}>
      <div className={`molly-gallery-split ${flip ? 'molly-gallery-split-flip' : ''}`}>
        <div className="molly-gallery-copy">
          <MollySectionHeading stamp={titleToStamp(title)} />
          {subtitle && (
            <FadeIn delay={0.08}>
              <div className="molly-caption-box">{subtitle}</div>
            </FadeIn>
          )}
          {caption && (
            <FadeIn delay={0.08}>
              <div className="molly-caption-box">{caption}</div>
            </FadeIn>
          )}
        </div>
        <div className="molly-gallery-panel mt-10 lg:mt-0">
          <PhotoCarousel photos={photos} />
        </div>
      </div>
    </MollySection>
  )
}

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
        className="molly-polaroid mx-auto max-w-full"
        style={{ '--molly-tilt': `${index % 2 === 0 ? -1.2 : 0.8}deg` }}
      >
        <div
          className="molly-tape"
          style={{ left: '18%', top: '-11px', transform: 'rotate(-7deg)' }}
        />
        <div
          className="molly-tape"
          style={{ right: '14%', top: '-10px', transform: 'rotate(5deg)', opacity: 0.92 }}
        />

        <div className="molly-carousel-stage">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={photo.src}
              src={photo.src}
              alt={photo.caption}
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
                className="molly-carousel-btn molly-carousel-btn-left"
              >
                &larr;
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next photo"
                className="molly-carousel-btn molly-carousel-btn-right"
              >
                &rarr;
              </button>
            </>
          )}
        </div>
      </div>

      <figcaption className="mt-6 text-center">
        <p className="font-display text-lg leading-snug tracking-tight text-navy-700/90 md:text-xl">
          {photo.caption}
        </p>
        {total > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to photo ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`molly-dot ${i === index ? 'molly-dot-active' : ''}`}
              />
            ))}
          </div>
        )}
      </figcaption>
    </figure>
  )
}

/* ======================================================================= */
/*  You usually do not need to edit anything below this line.              */
/*  Rename the component to your name in CamelCase before you export.      */
/* ======================================================================= */

export function WaldronMolly() {
  return (
    <div className="molly-page relative flex min-h-screen flex-col text-navy-700">
      <style>{PAGE_CSS}</style>

      {/* Hero */}
      <header className="relative overflow-hidden bg-cream-100 pt-28 pb-16 md:pt-32 md:pb-24 molly-hero-glow">
        <AzulejoStrip />
        <SectionButterflies variant={0} />

        <div className="relative z-[1] mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pt-6 md:px-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <PassportStamp line1="Portugal" line2="May 2026" rotate={-5} heading />
            <h1 className="molly-hero-name mt-4 font-display leading-[0.95] tracking-tight text-navy-700">
              {me.name}
            </h1>
            <ul className="molly-hero-bullets text-pretty">
              {me.headerBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-navy-700/20 bg-white/70 px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:border-crimson-600 hover:text-crimson-600"
              >
                &larr; Back to the cohort
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(232,164,180,0.55)] bg-[rgba(253,244,246,0.85)] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-navy-700/70 backdrop-blur">
                {me.hometown}
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: 1.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div
              className="molly-tape"
              style={{ left: '12%', top: '-12px', transform: 'rotate(-8deg)' }}
            />
            <div
              className="molly-tape"
              style={{ right: '10%', top: '-10px', transform: 'rotate(6deg)' }}
            />
            <div
              className="molly-polaroid overflow-hidden"
              style={{ '--molly-tilt': '2deg', padding: '12px 12px 16px' }}
            >
              <div className="aspect-4/5 overflow-hidden bg-cream-100">
                <img
                  src={me.photo}
                  alt={me.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Bio */}
      <MollySection tone="pink" decorVariant={1}>
        <div className="molly-bio-center">
          <MollySectionHeading
            stamp={titleToStamp(bio.title)}
            centered
          />
          <FadeIn delay={0.1}>
            <div className="molly-bio-card">
              <p className="relative font-display text-xl leading-relaxed text-navy-700/90 md:text-2xl">
                {bio.body}
              </p>
            </div>
          </FadeIn>
        </div>
      </MollySection>

      {/* Three things */}
      {/* <section className="bg-cream-100 py-20 md:py-24">
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
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section> */}

      <GalleryBlock
        tone="cream"
        title={douroValleySection.title}
        caption={douroValleySection.caption}
        photos={douroValleyPhotos}
        decorVariant={2}
      />

      <GalleryBlock
        tone="pink"
        title="Around the cities"
        subtitle="Some of my favorite things I saw while acquiring 30,000 steps a day. (My apple watch is so mad at how sedentary I have been upon my return)"
        photos={cityPhotos}
        decorVariant={3}
        flip
      />

      <GalleryBlock
        tone="cream"
        title="Favorite Foods"
        subtitle="Truly surprised I could hold off on eating long enough to snap a picture."
        photos={foodPhotos}
        decorVariant={4}
      />

      <GalleryBlock
        tone="pink"
        title="10/10 views"
        subtitle="AKA my favorite things I looked at. I dream about these photos each night."
        photos={viewPhotos}
        decorVariant={5}
        flip
      />

      <GalleryBlock
        tone="cream"
        title="The world's best group"
        subtitle="I think I would have had fun anywhere with these people! They made exploring Portugal a million times more special!"
        photos={friendPhotos}
        decorVariant={6}
      />

      <GalleryBlock
        tone="pink"
        title={farewellSection.title}
        caption={farewellSection.caption}
        photos={farewellPhotos}
        decorVariant={7}
        flip
      />

      <MollySection tone="cream" decorVariant={0}>
        <div className="molly-gallery-split">
          <div className="molly-gallery-copy">
            <MollySectionHeading
              stamp={titleToStamp(sarahJaneSection.title)}
              subtitle={sarahJaneSection.kicker}
            />
            <FadeIn delay={0.08}>
              <div className="molly-caption-box">{sarahJaneSection.intro}</div>
            </FadeIn>
          </div>
          <div className="molly-gallery-panel mt-10 lg:mt-0">
            <PhotoCarousel photos={sarahJanePhotos} />
          </div>
        </div>
      </MollySection>

      {/* Journal
      {entries.length > 0 && (
        <section className="bg-cream-50 py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-5 md:px-10">
            <SectionHeader
              number="08"
              kicker="Journal"
              title="A few entries."
            />
            <div className="mt-10 flex flex-col gap-10">
              {entries.map((entry, i) => (
                <FadeIn key={`${entry.date}-${i}`} delay={i * 0.06}>
                  <article>
                    <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-crimson-600">
                      {entry.date}
                    </p>
                    <h3 className="mt-2 font-display text-3xl leading-tight tracking-tight text-navy-700">
                      {entry.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-navy-700/85 text-pretty">
                      {entry.body}
                    </p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )} */}

      {/* Footer */}
      <footer className="relative overflow-hidden bg-crimson-800 py-16 text-cream-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(50% 50% at 85% 15%, rgba(245, 208, 216, 0.45), transparent 60%), radial-gradient(40% 40% at 10% 90%, rgba(158, 27, 50, 0.5), transparent 55%)',
          }}
        />
        <AzulejoStrip className="opacity-80" />
        <SectionButterflies variant={4} light />
        <div className="relative z-[1] mx-auto max-w-7xl px-5 md:px-10 molly-footer-grid">
          <div>
            <p className="font-display text-3xl leading-tight tracking-tight text-cream-50 md:text-4xl">
              Thanks for reading.
            </p>
            <p className="mt-4 text-sm text-cream-50/75">
              &mdash; {me.name}, UA MIS Portugal 2026
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-cream-50/30 bg-cream-50/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-cream-50/85 backdrop-blur transition-colors hover:border-[rgba(245,208,216,0.7)] hover:bg-cream-50/20 hover:text-cream-50"
            >
              &larr; Back to the cohort homepage
            </Link>
          </div>
          <div className="molly-footer-stamp-wrap">
            <PassportStamp
              line1="Obrigada"
              line2="Portugal"
              rotate={-3}
              footer
              className="!border-cream-50/55 !text-cream-50 !bg-crimson-700/35"
            />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default WaldronMolly
