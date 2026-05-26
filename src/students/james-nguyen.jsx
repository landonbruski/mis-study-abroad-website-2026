/**
 * James Nguyen, Portugal 2026.
 *
 * Personal page at /students/james-nguyen. Keep `export default` at the bottom.
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FadeIn } from '../components/ui/FadeIn'
import { SectionHeader } from '../components/ui/SectionHeader'

const P = '/students/james-nguyen'

const sectionNav = [
  { id: 'favorite-day', label: 'Favorite Day' },
  { id: 'three-things', label: 'Three Things' },
  { id: 'from-the-sky', label: 'From the Sky' },
  { id: 'scenery', label: 'Scenery' },
  { id: 'friends', label: 'Friends' },
  { id: 'me', label: 'Me' },
  { id: 'food', label: 'Food' },
  { id: 'art', label: 'Art' },
  { id: 'pups', label: 'Pups' },
  { id: 'final-message', label: 'Final Message' },
]

/* -------- 1. Profile -------- */
const me = {
  name: 'James Nguyen',
  year: 'Junior',
  major: 'Management Information Systems',
  hometown: 'Iowa City, Iowa',
  tagline: 'A Portuguese six feet tall.',
  photo: `${P}/james-nguyen.JPG`,
}

// /* -------- 2. Fun stats -------- */
// const funStats = [
//   { label: 'Bifanas eaten', value: 'Lost count' },
//   { label: 'Photos taken', value: '4,000+' },
//   { label: 'Times slipped', value: 'More than I\'ll admit' },
//   { label: 'Hours slept', value: 'Didn\'t' },
// ]

/* -------- 3. Favorite day on the trip -------- */
const favoriteDay = {
  date: 'May 15',
  city: 'Porto',
  title: 'Favorite Day: Waves and Wine',
  body: [
    `The surfing was so exhausting but also exhilirating (aside from my calf cramping in the water) and ` +
    `the cooking class had the same homey vibe as cooking with the family on Thanksgiving; it was so sweet.`,

    `While the food was, naturally, not the most life-changing, it was made with love (blegh) and plenty of sparkling water.`,
    
    `Post-class activities cemented this day as my favorite.`,

    `The vinho verde certainly helped, too.`
  ],
  images: [
    { src: `${P}/favorite/surf.jfif`, caption: 'Crazy how it\'s the same height as me' },
    { src: `${P}/favorite/cookingclass.jpeg`, caption: 'Codfish cake station' },
  ],
}

/* -------- 4. Three things -------- */
const threeThings = [
  {
    kicker: 'Porto > Lisbon, no diff',
    body: 'For one, I didn\'t slip on the cobblestone in Porto. Vibes were also immaculate, and unfortunately for Lisbon, the food was that much better. Coimbra is a close second, but Lisbon was also lovely.',
    image: `${P}/scenery/IMG_3060.JPG`,
    caption: 'THE bridge',
  },
  {
    kicker: 'Culture Shock',
    body: 'Something I didn\'t foresee: everything starts super late here, from dinner to night life. Wouldn\'t have been a problem if we didn\'t have to wake up so early... Nice for late night eats, though!',
    image: `${P}/scenery/IMG_2900.JPG`,
    caption: 'A beautiful sunset',
  },
  {
    kicker: 'The thing I can\'t stop talking about',
    body: 'That last day was as good as it gets. A leisurely stroll across the bridge, the best sandwiches in Porto, taking in the views at the wine bar window, and ending the night with the most bittersweet goodbye.',
    image: `${P}/friends/IMG_3307.JPG`,
    caption: 'Must\'ve been HILARIOUS',
  },
]

/* -------- 5. Scenery gallery -------- */
const sceneryImages = [
  { src: `${P}/scenery/welcome-to-lisbon-sign.JPG`, caption: 'Welcome to Lisbon' },
  { src: `${P}/scenery/street.JPG`, caption: '' },
  { src: `${P}/scenery/sangria-stand.JPG`, caption: 'Sangria!!' },
  { src: `${P}/scenery/IMG_0137.JPG`, caption: '' },
  { src: `${P}/scenery/IMG_0190.JPG`, caption: '' },
  { src: `${P}/scenery/IMG_0200.JPG`, caption: '' },
  { src: `${P}/scenery/IMG_0308.JPG`, caption: '' },
  { src: `${P}/scenery/IMG_0376.JPG`, caption: '' },
  { src: `${P}/scenery/IMG_0398.JPG`, caption: 'Monastery' },
  { src: `${P}/scenery/IMG_0428.JPG`, caption: '' },
  { src: `${P}/scenery/IMG_0685.JPG`, caption: 'The palace' },
  { src: `${P}/scenery/IMG_0848.JPG`, caption: 'View from the palace' },
  { src: `${P}/scenery/IMG_1092.JPG`, caption: 'Vitoria!' },
  { src: `${P}/scenery/IMG_1412.JPG`, caption: 'To be loved...' },
  { src: `${P}/scenery/IMG_1434.JPG`, caption: '' },
  { src: `${P}/scenery/IMG_1596.JPG`, caption: 'Big J' },
  { src: `${P}/scenery/IMG_1601.JPG`, caption: 'Golden Gate Dupe' },
  { src: `${P}/scenery/IMG_1616.JPG`, caption: '' },
  { src: `${P}/scenery/IMG_1658.JPG`, caption: 'Coimbra!' },
  { src: `${P}/scenery/IMG_1724.JPG`, caption: 'Somehow can\'t escape school' },
  { src: `${P}/scenery/IMG_2215.JPG`, caption: 'SNOOPY' },
  { src: `${P}/scenery/IMG_2353.JPG`, caption: '' },
  { src: `${P}/scenery/IMG_2408.JPG`, caption: 'Kevin watching us cook' },
  { src: `${P}/scenery/IMG_2634.JPG`, caption: 'Much more fun going down these steps' },
  { src: `${P}/scenery/IMG_2657.JPG`, caption: '' },
  { src: `${P}/scenery/IMG_2819.JPG`, caption: '' },
  { src: `${P}/scenery/IMG_2900.JPG`, caption: 'From the vineyard' },
  { src: `${P}/scenery/IMG_3060.JPG`, caption: 'Dom Luis I bridge' },
]

/* -------- 6. Friends gallery -------- */
const friendsImages = [
  { src: `${P}/friends/IMG_0568.JPG`, caption: '' },
  { src: `${P}/friends/IMG_0590.JPG`, caption: '' },
  { src: `${P}/friends/IMG_1044.JPG`, caption: 'The press conference' },
  { src: `${P}/friends/IMG_1714.JPG`, caption: '' },
  { src: `${P}/friends/IMG_2588.JPG`, caption: 'I was a great sous' },
  { src: `${P}/friends/IMG_3307.JPG`, caption: '' },
  { src: `${P}/friends/IMG_3341.JPG`, caption: '' },
  { src: `${P}/friends/IMG_3398.JPG`, caption: '' },
  { src: `${P}/friends/IMG_3491.JPG`, caption: '' },
  { src: `${P}/friends/IMG_3657.JPG`, caption: 'The 221 scavenger hunt crew' },
  { src: `${P}/friends/IMG_3670.JPG`, caption: '' },
  { src: `${P}/friends/IMG_3674.JPG`, caption: '' },
  { src: `${P}/friends/IMG_3686.JPG`, caption: '' },
  { src: `${P}/friends/IMG_3696.JPG`, caption: 'TINO!!! I miss you... (I cried after this photo)' },
  { src: `${P}/friends/IMG_3717.JPG`, caption: '' },
  { src: `${P}/friends/20260508_232201_080122.jpeg`, caption: 'The roomie' },
  { src: `${P}/friends/20260510_235453_0EFB38.jpeg`, caption: '' },
  { src: `${P}/friends/20260513_101623_055473.jpeg`, caption: '' },
  { src: `${P}/friends/20260514_231606_00BA65.jpeg`, caption: '' },
  { src: `${P}/friends/20260515_000926_0A5665.jpeg`, caption: '' },
  { src: `${P}/friends/20260515_230515_0605F8.jpeg`, caption: '' },
  { src: `${P}/friends/20260516_212958_0490B3.jpeg`, caption: '"Wrist twistin\' like it\'s stir fry"' },
  { src: `${P}/friends/20260517_174120_0A0C79.jpeg`, caption: '' },
  { src: `${P}/friends/keke.jfif`, caption: '' },
  { src: `${P}/friends/yay.jfif`, caption: '' },
]

/* -------- 7. Food gallery -------- */
const foodImages = [
  { src: `${P}/food/first-meal.JPG`, name: 'The first meal', note: 'This place had me thinking the language barrier was about to fry me.' },
  { src: `${P}/food/IMG_0270.JPG`, name: 'Samosas (Chamuças)', note: 'Olivia\'s favorite' },
  { src: `${P}/food/IMG_0272.JPG`, name: '', note: '' },
  { src: `${P}/food/IMG_0274.JPG`, name: '', note: '' },
  { src: `${P}/food/IMG_0281.JPG`, name: 'Lamb', note: 'Some of the best I\'ve ever had' },
  { src: `${P}/food/IMG_0508.JPG`, name: 'Salmon Toast', note: 'Gone in sixty seconds' },
  { src: `${P}/food/IMG_0513.JPG`, name: '', note: '' },
  { src: `${P}/food/IMG_0644.JPG`, name: 'Octopus Stew', note: 'My life has been changed for the better.' },
  { src: `${P}/food/IMG_0912.JPG`, name: '', note: '' },
  { src: `${P}/food/IMG_0932.JPG`, name: 'Boba', note: 'As mediocre as expected' },
  { src: `${P}/food/IMG_1344.JPG`, name: 'Bifana', note: 'TBH, I had no clue what to expect but it wasn\'t bad.' },
  { src: `${P}/food/IMG_1494.JPG`, name: 'My solo venture', note: 'I was having cravings' },
  { src: `${P}/food/IMG_2213.JPG`, name: 'Francesinha', note: 'Flavor fatigue central' },
  { src: `${P}/food/IMG_2326.JPG`, name: '', note: '' },
  { src: `${P}/food/IMG_2327.JPG`, name: '', note: '' },
  { src: `${P}/food/IMG_2667.JPG`, name: 'Cappuccino', note: '"...one step at a time"' },
  { src: `${P}/food/IMG_2670.JPG`, name: '', note: '' },
  { src: `${P}/food/IMG_3028.JPG`, name: '', note: '' },
]

/* -------- 8. Art gallery -------- */
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

/* -------- 9. Pups -------- */
const pupImages = [
  { src: `${P}/pups/IMG_0306.JPG`, caption: ':(((' },
  { src: `${P}/pups/IMG_1261.JPG`, caption: 'Well-dressed' },
  { src: `${P}/pups/IMG_1313.JPG`, caption: ':D' },
  { src: `${P}/pups/IMG_1927.JPG`, caption: 'Couldn\'t resist' },
  { src: `${P}/pups/IMG_2684.JPG`, caption: 'Snoozer' },
  { src: `${P}/pups/IMG_2828.JPG`, caption: ':)' },
  { src: `${P}/pups/IMG_2932.JPG`, caption: '^_^' },
  { src: `${P}/pups/IMG_2968.JPG`, caption: 'Also Molly' },
]

/* -------- 10. From the sky -------- */
const skyImages = [
  { src: `${P}/from-the-sky/light-reading.JPG`, caption: 'Got up to some highly effective reading' },
  { src: `${P}/from-the-sky/movie.JPG`, caption: 'Usually it\'s Crazy Rich Asians, but Top Gun this time' },
  { src: `${P}/from-the-sky/airplane-food.JPG`, caption: 'I actually like airplane food, sorry not sorry' },
  { src: `${P}/from-the-sky/coast.JPG`, caption: 'First glimpse of the coast!' },
  { src: `${P}/from-the-sky/city1.JPG`, caption: 'Coming in over the city' },
  { src: `${P}/from-the-sky/city2.JPG`, caption: 'Almost there' },
]

/* -------- 11. Me -------- */
const meImages = [
  { src: `${P}/me/IMG_0212.JPG`, caption: 'Instagram worthy' },
  { src: `${P}/me/IMG_0992.JPG`, caption: 'Addressing the people' },
  { src: `${P}/me/IMG_0998.JPG`, caption: '' },
  { src: `${P}/me/IMG_1570.JPG`, caption: '' },
  { src: `${P}/me/IMG_1697.JPG`, caption: '' },
  { src: `${P}/me/IMG_1973.JPG`, caption: '' },
  { src: `${P}/me/IMG_1999.JPG`, caption: '' },
  { src: `${P}/me/IMG_2444.JPG`, caption: 'The Jeremy Allen White' },
  { src: `${P}/me/20260507_150611_009285.jpeg`, caption: '' },
  { src: `${P}/me/20260515_001235_004E40.jpeg`, caption: '' },
  { src: `${P}/me/20260515_001235_0FB7F4.jpeg`, caption: '' },
  { src: `${P}/me/20260516_101402_01F7CE.jpeg`, caption: 'Needed this' },
]

/* -------- 12. Journal entries -------- */
// const entries = [
//   {
//     date: 'May 7',
//     title: 'First walk through Alfama',
//     body: 'Paragraphs go here. Write like you are telling a friend at dinner.',
//     image: `${P}/scenery/IMG_0190.JPG`,
//     caption: 'Walking through Alfama',
//   },
//   {
//     date: 'May 10',
//     title: 'Benfica match day',
//     body: 'Paragraphs go here. The stadium, the crowd, the noise.',
//     image: `${P}/friends/20260510_235453_0EFB38.jpeg`,
//     caption: 'Match day with the crew',
//   },
//   {
//     date: 'May 15',
//     title: 'Surfing and cooking in Porto',
//     body: 'Paragraphs go here. Salt water, leg cramps, vinho verde, and the best kitchen I\'ve ever been in.',
//     image: `${P}/me/20260515_001235_004E40.jpeg`,
//     caption: 'Post-surf, pre-cooking class',
//   },
//   {
//     date: 'May 19',
//     title: 'The farewell cruise',
//     body: 'Paragraphs go here. The Douro at sunset, the last dinner together.',
//     image: `${P}/friends/IMG_3717.JPG`,
//     caption: 'The farewell crew',
//   },
// ]

/* ======================================================================= */

function MasonryGallery({ images }) {
  return (
    <div className="mt-10 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
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
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/0 to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 p-4 text-[13px] font-medium leading-snug text-cream-50">
            {img.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export function JamesNguyen() {
  let sectionNum = 0
  const next = () => String(++sectionNum).padStart(2, '0')

  return (
    <div className="relative flex min-h-screen flex-col bg-cream-50 text-navy-700">
      {/* Hero */}
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
            <div className="mt-6">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.24em] text-navy-700/50">
                Jump to section &darr;
              </p>
              <div className="flex flex-wrap gap-2.5">
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

      {/* By the numbers */}
      {/* <section className="border-y border-navy-700/10 bg-cream-50 py-12">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
            {funStats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.04}>
                <div className="text-center">
                  <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-crimson-600">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-display text-base leading-snug text-navy-700">
                    {stat.value}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section> */}

      {/* Favorite day */}
      <section id="favorite-day" className="scroll-mt-24 bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-5 md:px-10">
          <SectionHeader
            number={next()}
            kicker={`${favoriteDay.city} · ${favoriteDay.date}`}
            title={favoriteDay.title}
          />

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
                  <p
                    key={i}
                    className="font-display text-xl leading-relaxed text-navy-700/90 text-pretty md:text-2xl"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Three things */}
      <section id="three-things" className="scroll-mt-24 bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number={next()}
            kicker="Three things"
            title="Three things from this trip."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {threeThings.map((thing, i) => (
              <FadeIn key={thing.kicker} delay={i * 0.08}>
                <article className="group relative flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-50 transition-colors hover:border-crimson-600/40">
                  <div className="aspect-video overflow-hidden bg-cream-100">
                    <img
                      src={thing.image}
                      alt={thing.caption}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-6">
                    <span className="absolute right-5 top-5 font-display text-3xl text-cream-50/40 transition-colors group-hover:text-cream-50/70">
                      0{i + 1}
                    </span>
                    <p className="text-[13px] italic text-navy-700/50">
                      {thing.caption}
                    </p>
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

      {/* From the sky */}
      <section id="from-the-sky" className="scroll-mt-24 bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number={next()}
            kicker="From the sky"
            title="The trip started at 30,000+ feet."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skyImages.map((img, i) => (
              <FadeIn key={img.src} delay={(i % 3) * 0.06}>
                <figure className="group overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-100">
                  <div className="aspect-4/3 overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.caption}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="px-4 py-3 text-[13px] text-navy-700/60">
                    {img.caption}
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Scenery gallery */}
      <section id="scenery" className="scroll-mt-24 bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number={next()}
            kicker="The scenery"
            title="Finding beauty in everything."
          />
          <MasonryGallery images={sceneryImages} />
        </div>
      </section>

      {/* Friends gallery */}
      <section id="friends" className="scroll-mt-24 bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number={next()}
            kicker="Friends"
            title="Made my trip! <3"
          />
          <MasonryGallery images={friendsImages} />
        </div>
      </section>

      {/* Me gallery */}
      <section id="me" className="scroll-mt-24 bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number={next()}
            kicker="Best of the Gallery (me)"
            title="The part you came for."
          />
          <MasonryGallery images={meImages} />
        </div>
      </section>

      {/* Food gallery */}
      <section id="food" className="scroll-mt-24 bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number={next()}
            kicker="What I ate"
            title="Stand-out grub."
          />
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {foodImages.map((item, i) => (
              <FadeIn key={item.src} delay={(i % 3) * 0.06}>
                <figure className="flex h-full flex-col">
                  <div className="overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-100">
                    <img
                      src={item.src}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <p className="font-display text-lg leading-tight tracking-tight text-navy-700">
                      {item.name}
                    </p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-navy-700/75">
                      {item.note}
                    </p>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Art gallery */}
      <section id="art" className="scroll-mt-24 bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number={next()}
            kicker="Art!"
            title="Better than the Louvre."
          />
          <MasonryGallery images={artImages} />
        </div>
      </section>

      {/* Pups */}
      <section id="pups" className="scroll-mt-24 bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number={next()}
            kicker="The pups"
            title="TOO CUTE"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pupImages.map((img, i) => (
              <FadeIn key={img.src} delay={(i % 4) * 0.06}>
                <figure className="group overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-100">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.caption}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="px-4 py-3 text-[13px] text-navy-700/60">
                    {img.caption}
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Journal
      {entries.length > 0 && (
        <section className="bg-cream-100 py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-5 md:px-10">
            <SectionHeader
              number={next()}
              kicker="Journal"
              title="A few entries."
            />
            <div className="mt-10 flex flex-col gap-10">
              {entries.map((entry, i) => (
                <FadeIn key={`${entry.date}-${i}`} delay={i * 0.06}>
                  <article className="grid gap-6 md:grid-cols-2 md:items-start">
                    <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                      <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-crimson-600">
                        {entry.date}
                      </p>
                      <h3 className="mt-2 font-display text-3xl leading-tight tracking-tight text-navy-700">
                        {entry.title}
                      </h3>
                      <p className="mt-4 text-[15px] leading-relaxed text-navy-700/85 text-pretty">
                        {entry.body}
                      </p>
                    </div>
                    {entry.image && (
                      <figure className="overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-50">
                        <div className="aspect-4/5 overflow-hidden">
                          <img
                            src={entry.image}
                            alt={entry.caption}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <figcaption className="px-4 py-3 text-[13px] text-navy-700/60">
                          {entry.caption}
                        </figcaption>
                      </figure>
                    )}
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )} */}

      {/* Final message */}
      <section id="final-message" className="scroll-mt-24 bg-cream-100 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-10">
          <SectionHeader
            number={next()}
            kicker="Final message"
            title="Até mais, Portugal."
          />
          <FadeIn delay={0.1}>
            <p className="mt-8 font-display text-xl leading-relaxed text-navy-700/90 text-pretty md:text-2xl">
              This trip really was once-in-a-lifetime. The people of the cohort made it something I will never forget, and I am so grateful to have had the opportunity to be in another country with this crew,
              exploring a new culture and making so many core memories together. I'll be living down the high for a while!
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-crimson-800 py-16 text-cream-50">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <p className="font-display text-3xl leading-tight tracking-tight text-cream-50 md:text-4xl">
            Thanks for reading!
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

export default JamesNguyen
