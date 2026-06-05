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
  name: 'Molly Waldron',
  year: 'Senior (sadly)', // Freshman / Sophomore / Junior / Senior / MS
  major: 'Management Information Systems',
  hometown: 'Dallas, TX',
  tagline: 'Enjoyer of everything besides the rain in Lisbon',
  /** A photo in /public/students/your-slug.jpg works best. */
  photo: '/students/molly-waldron/pfp.jpeg',
}

/* -------- 2. Favorite day on the trip -------- */
const favoriteDay = {
  date: 'May 12th AND May 18th (no, I cannot pick)',
  city: 'Lisbon and Porto',
  title: 'A girl just wants to see some sights and sing some songs',
  body: `On may 12th, I went to see the most amazing statue of Jesus Christ that was accompanied by a breathtaking view of Lisbon, highlighted by the its notable red bridge. After, I had probably one of the coolest meal experiences that was truly
  authentic to Portugal. This included a pitcher of sangria and a live Fado performance. FANTASTICO!! I also got some Dubai Chocolate gelato that I still think about. The night was only improved by me and Sarah Janes unavoidable tendency to find a pub that has karaoke, where we belted out Like a Prayer by Madonna in our most natural tourist state. 
  It was the perfect way to finish up our time in Lisbon, and if I went back I would do all of it again! Might make the trek back for that gelato alone actually...
  
  On May 18th (the last day, ughhhh) I had the most special day because I truly soaked up each moment in Porto. 
  I got to see the most amazing views while walking the Dom Luiz I bridge and taking the cable cars down the hill. Then, I spent a couple of hours with great friends at the best wine bar in Portugal, and maybe the best wine bar in the world.
  Finally, we had the most heartwarming dinner all together ON A BOAT AT SUNSET (that is still so unreal to me) and it was so nice to be with everyone for the final night.
  Seeing Porto from some of the best viewpoints and sharing the last moments with the best group ever was one of the more special things I've experienced. 
  And Jeff REQUESTED a picture with me, which is enough reason in itself to make this my favorite day. (Jeff, we look so good!!!)`,
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
  title: 'a free day spent in duoro valley',
  caption: '[Add a caption about your Douro Valley day here...]',
}

const douroValleyPhotos = [
  { src: '/students/molly-waldron/views/winery.jpeg', caption: '[Caption]', story: '[What was happening in this photo? Add your memory here...]' },
  { src: '/students/molly-waldron/views/wineryvinhoverde.jpeg', caption: '[Caption]', story: '[Add your story here...]' },
  { src: '/students/molly-waldron/views/winerysjinvalley.jpeg', caption: '[Caption]', story: '[Add your story here...]' },
  { src: '/students/molly-waldron/friends/wineryboatride.jpeg', caption: '[Caption]', story: '[Add your story here...]' },
]

/* -------- 5. Photo galleries -------- */
const cityPhotos = [
  { src: '/students/molly-waldron/city/bluetile.jpeg', caption: '[Caption: blue tile moment]', story: '[What street or building was this? Add your memory here...]' },
  { src: '/students/molly-waldron/city/tiles.jpeg', caption: '[Caption: tile detail]', story: '[Why did this catch your eye? Write here...]' },
  { src: '/students/molly-waldron/city/lisbonbuidlings.jpeg', caption: '[Caption: Lisbon buildings]', story: '[Where were you standing? What did it feel like?]' },
  { src: '/students/molly-waldron/city/tangledpalace.jpeg', caption: '[Caption: palace / Sintra?]', story: '[Add the story behind this photo...]' },
  { src: '/students/molly-waldron/city/tigusbridge.jpeg', caption: '[Caption: bridge view]', story: '[Which bridge is this? What were you doing before you took it?]' },
  { src: '/students/molly-waldron/city/meonbridge.jpeg', caption: '[Caption: on the bridge]', story: '[Who was with you? What were you talking about?]' },
  { src: '/students/molly-waldron/city/viewfromcablecar.jpeg', caption: '[Caption: cable car view]', story: '[Describe the ride down the hill...]' },
  { src: '/students/molly-waldron/city/insidefoodtourstop.jpeg', caption: '[Caption: food tour stop]', story: '[What did you try here? Would you go back?]' },
  { src: '/students/molly-waldron/city/farewellcruiseview.jpeg', caption: '[Caption: farewell cruise]', story: '[What do you remember most about that sunset on the boat?]' },
]

const foodPhotos = [
  { src: '/students/molly-waldron/food/bifana.jpeg', caption: '[Caption: bifana]', story: '[How many did you end up eating? Be honest...]' },
  { src: '/students/molly-waldron/food/bifaname.jpeg', caption: '[Caption: me + bifana]', story: '[Where was this spot? Was it worth the hype?]' },
  { src: '/students/molly-waldron/food/pasteldenata.jpeg', caption: '[Caption: pastel de nata]', story: '[First bite or fiftieth? Add your ranking here...]' },
  { src: '/students/molly-waldron/food/jaxonpasteldenata.jpeg', caption: '[Caption: Jaxon + pastel de nata]', story: '[What happened right before this photo?]' },
  { src: '/students/molly-waldron/food/sangria.jpeg', caption: '[Caption: sangria]', story: '[Which meal was this with? Fado night maybe?]' },
  { src: '/students/molly-waldron/food/sammich.jpeg', caption: '[Caption: sandwich]', story: '[Name the place or describe the order...]' },
  { src: '/students/molly-waldron/food/banana.jpeg', caption: '[Caption: banana??]', story: '[Explain this photo. There has to be a story...]' },
  { src: '/students/molly-waldron/food/michelindessert.jpeg', caption: '[Caption: Michelin dessert]', story: '[Which course was this? What did it taste like?]' },
]

const viewPhotos = [
  { src: '/students/molly-waldron/views/cathedral.jpeg', caption: '[Caption: cathedral]', story: '[Which city? What stood out about the architecture?]' },
  { src: '/students/molly-waldron/views/montessary.jpeg', caption: '[Caption: monastery / monte]', story: '[How was the climb or the view from up top?]' },
  { src: '/students/molly-waldron/views/sintra.jpeg', caption: '[Caption: Sintra]', story: '[What was the weather like that day?]' },
  { src: '/students/molly-waldron/views/prettything.jpeg', caption: '[Caption: pretty thing]', story: '[What is this and why did you stop for a photo?]' },
  { src: '/students/molly-waldron/views/winebar.jpeg', caption: '[Caption: wine bar]', story: '[Was this the best wine bar in Portugal? Make your case...]' },
]

const friendPhotos = [
  { src: '/students/molly-waldron/friends/4girls.jpeg', caption: '[Caption: the four of us]', story: '[Who is in this photo and what were you celebrating?]' },
  { src: '/students/molly-waldron/friends/selfie.jpeg', caption: '[Caption: selfie]', story: '[Where and why this selfie?]' },
  { src: '/students/molly-waldron/friends/lookout.jpeg', caption: '[Caption: lookout]', story: '[What view were you looking at?]' },
  { src: '/students/molly-waldron/friends/cablecars.jpeg', caption: '[Caption: cable cars]', story: '[Who rode with you? Was anyone scared?]' },
  { src: '/students/molly-waldron/friends/cookingclass.jpeg', caption: '[Caption: cooking class]', story: '[What did you make? Who burned something?]' },
  { src: '/students/molly-waldron/friends/karaoke.jpeg', caption: '[Caption: karaoke night]', story: '[What song? How bad were the vocals?]' },
  { src: '/students/molly-waldron/friends/james.jpeg', caption: '[Caption: James]', story: '[Add a memory with James...]' },
  { src: '/students/molly-waldron/friends/jamesstatue.jpeg', caption: '[Caption: James + statue]', story: '[Which statue or monument is this?]' },
  { src: '/students/molly-waldron/friends/jeff.JPEG', caption: '[Caption: Jeff]', story: '[Jeff requested a picture — what do you want to say about it?]' },
  { src: '/students/molly-waldron/friends/olivia.jpeg', caption: '[Caption: Olivia]', story: '[Write something about Olivia here...]' },
  { src: '/students/molly-waldron/friends/sydney.jpeg', caption: '[Caption: Sydney]', story: '[Your favorite Sydney moment from the trip...]' },
  { src: '/students/molly-waldron/friends/tami.jpeg', caption: '[Caption: Tami]', story: '[Add your Tami memory here...]' },
  { src: '/students/molly-waldron/friends/evam.jpeg', caption: '[Caption: Eva M]', story: '[What do you remember about this day?]' },
]

const sarahJaneSection = {
  kicker: 'With Sarah Jane',
  title: '[Give this section a title — karaoke queen? travel partner?]',
  intro: '[Write an intro about you and Sarah Jane on this trip. Flight mix-ups, karaoke, pub hunts, inside jokes — whatever you want to remember.]',
}

const sarahJanePhotos = [
  { src: '/students/molly-waldron/friends/sarahjane.jpeg', caption: '[Caption: Sarah Jane]', story: '[Your favorite Sarah Jane memory from Lisbon...]' },
  { src: '/students/molly-waldron/friends/sarahjane1.jpeg', caption: '[Caption: Sarah Jane, part 2]', story: '[What were you two up to here?]' },
  { src: '/students/molly-waldron/friends/sarahjane2.jpeg', caption: '[Caption: Sarah Jane, part 3]', story: '[Add more context for this photo...]' },
  { src: '/students/molly-waldron/friends/sarahjane3.jpeg', caption: '[Caption: Sarah Jane, part 4]', story: '[One more story — maybe the karaoke night?]' },
]

/* -------- 6. Journal entries (optional, as many as you want) -------- */
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

/* ======================================================================= */
/*  You usually do not need to edit anything below this line.              */
/*  Rename the component to your name in CamelCase before you export.      */
/* ======================================================================= */

export function WaldronMolly() {
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

      {/* Douro Valley */}
      <section className="bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="03"
            kicker="Free day"
            title={douroValleySection.title}
          />
          <FadeIn delay={0.08}>
            <div className="mt-8 min-h-[5rem] max-w-3xl rounded-2xl border border-dashed border-navy-700/25 bg-cream-100/70 px-6 py-5 text-[15px] leading-relaxed text-navy-700/55 italic">
              {douroValleySection.caption}
            </div>
          </FadeIn>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-2">
            {douroValleyPhotos.map((photo, i) => (
              <FadeIn key={photo.src} delay={i * 0.08}>
                <figure className="flex h-full flex-col gap-4">
                  <div className="overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-100">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      loading="lazy"
                      decoding="async"
                      className="aspect-4/5 w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="flex flex-col gap-3">
                    <p className="font-display text-lg leading-tight tracking-tight text-navy-700">
                      {photo.caption}
                    </p>
                    <div className="min-h-[5.5rem] rounded-xl border border-dashed border-navy-700/25 bg-cream-100/70 px-4 py-3 text-[14px] leading-relaxed text-navy-700/55 italic">
                      {photo.story}
                    </div>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* City photos */}
      <section className="bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="04"
            kicker="Around the city"
            title="[Add a section title — Lisbon streets, tiles, and bridges]"
            subtitle="[Optional one-liner about wandering the cities. Edit in the JSX or replace this placeholder.]"
          />
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {cityPhotos.map((photo, i) => (
              <FadeIn key={photo.src} delay={(i % 3) * 0.06}>
                <figure className="flex h-full flex-col gap-4">
                  <div className="overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-100">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      loading="lazy"
                      decoding="async"
                      className="aspect-4/5 w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="flex flex-col gap-3">
                    <p className="font-display text-lg leading-tight tracking-tight text-navy-700">
                      {photo.caption}
                    </p>
                    <div className="min-h-[5.5rem] rounded-xl border border-dashed border-navy-700/25 bg-cream-100/70 px-4 py-3 text-[14px] leading-relaxed text-navy-700/55 italic">
                      {photo.story}
                    </div>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Food photos */}
      <section className="bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="05"
            kicker="What I ate"
            title="[Add a food section title — bifanas, gelato, and everything else]"
            subtitle="[Optional subtitle about your favorite bites. Fill in later.]"
          />
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {foodPhotos.map((photo, i) => (
              <FadeIn key={photo.src} delay={(i % 3) * 0.06}>
                <figure className="flex h-full flex-col gap-4">
                  <div className="overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-50">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      loading="lazy"
                      decoding="async"
                      className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="flex flex-col gap-3">
                    <p className="font-display text-lg leading-tight tracking-tight text-navy-700">
                      {photo.caption}
                    </p>
                    <div className="min-h-[5.5rem] rounded-xl border border-dashed border-navy-700/25 bg-cream-50/80 px-4 py-3 text-[14px] leading-relaxed text-navy-700/55 italic">
                      {photo.story}
                    </div>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* View photos */}
      <section className="bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="06"
            kicker="Views & day trips"
            title="[Add a title — Sintra, wine bars, and lookout points]"
            subtitle="[Optional subtitle. What views stuck with you most?]"
          />
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {viewPhotos.map((photo, i) => (
              <FadeIn key={photo.src} delay={(i % 3) * 0.06}>
                <figure className="flex h-full flex-col gap-4">
                  <div className="overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-100">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      loading="lazy"
                      decoding="async"
                      className="aspect-4/5 w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="flex flex-col gap-3">
                    <p className="font-display text-lg leading-tight tracking-tight text-navy-700">
                      {photo.caption}
                    </p>
                    <div className="min-h-[5.5rem] rounded-xl border border-dashed border-navy-700/25 bg-cream-100/70 px-4 py-3 text-[14px] leading-relaxed text-navy-700/55 italic">
                      {photo.story}
                    </div>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Friends photos */}
      <section className="bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="07"
            kicker="With the group"
            title="[Add a title — the people who made the trip]"
            subtitle="[Optional subtitle about your cohort, roommates, or favorite group moments.]"
          />
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {friendPhotos.map((photo, i) => (
              <FadeIn key={photo.src} delay={(i % 3) * 0.06}>
                <figure className="flex h-full flex-col gap-4">
                  <div className="overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-50">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      loading="lazy"
                      decoding="async"
                      className="aspect-4/5 w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="flex flex-col gap-3">
                    <p className="font-display text-lg leading-tight tracking-tight text-navy-700">
                      {photo.caption}
                    </p>
                    <div className="min-h-[5.5rem] rounded-xl border border-dashed border-navy-700/25 bg-cream-50/80 px-4 py-3 text-[14px] leading-relaxed text-navy-700/55 italic">
                      {photo.story}
                    </div>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Sarah Jane section */}
      <section className="bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="08"
            kicker={sarahJaneSection.kicker}
            title={sarahJaneSection.title}
          />
          <FadeIn delay={0.08}>
            <div className="mt-8 min-h-[6rem] max-w-3xl rounded-2xl border border-dashed border-crimson-600/30 bg-cream-100/80 px-6 py-5 text-[15px] leading-relaxed text-navy-700/60 italic">
              {sarahJaneSection.intro}
            </div>
          </FadeIn>
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {sarahJanePhotos.map((photo, i) => (
              <FadeIn key={photo.src} delay={i * 0.08}>
                <figure className="flex h-full flex-col gap-4">
                  <div className="overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-100 shadow-deep">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      loading="lazy"
                      decoding="async"
                      className="aspect-4/5 w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="flex flex-col gap-3">
                    <p className="font-display text-xl leading-tight tracking-tight text-navy-700">
                      {photo.caption}
                    </p>
                    <div className="min-h-[6.5rem] rounded-xl border border-dashed border-crimson-600/25 bg-cream-100/70 px-4 py-4 text-[14px] leading-relaxed text-navy-700/55 italic">
                      {photo.story}
                    </div>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

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

export default WaldronMolly
