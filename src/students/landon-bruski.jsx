/**
 * Landon Bruski — Portugal 2026.
 *
 * Personal page. Slots into the cohort site through the auto-discovered
 * route at /students/landon-bruski. Keep `export default` at the bottom.
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FadeIn } from '../components/ui/FadeIn'
import { SectionHeader } from '../components/ui/SectionHeader'

/* -------- 1. Profile -------- */
const me = {
  name: 'Landon Bruski',
  monogram: 'LB',
  tagline:
    'Builder, brander, and serial over-packer. This is my Portugal, the way I saw it.',
  /** Replace by dropping the file at /public/students/landon-bruski.jpg */
  photo: '/students/landon-bruski.jpg',
}

/* -------- 2. Quick about me (rapid-fire facts, easy to swap) -------- */
const aboutMe = [
  { label: 'Currently', value: 'Running Bruski Branding Services' },
  { label: 'Studying', value: 'MIS at Alabama' },
  { label: 'Reading', value: 'Whatever has a map in the front' },
  { label: 'Coffee order', value: 'Black, two espressos in' },
  { label: 'Travel rule', value: 'Walk every neighborhood once' },
  { label: 'Soundtrack', value: 'Whatever the cab driver had on' },
]

/* -------- 3. Favorite day on the trip -------- */
const favoriteDay = {
  date: 'May __',
  city: 'Porto',
  title: 'A title for the day that stuck with me.',
  body: `A few sentences about the day. A specific moment, a thing I noticed,
the part I keep replaying. Replace this with the real one when I get back.`,
}

/* -------- 4. Three things -------- */
const threeThings = [
  {
    kicker: 'Best thing I ate',
    body: 'Placeholder. Replace with a specific dish at a specific spot.',
  },
  {
    kicker: 'Something I did not expect',
    body: 'Placeholder. A real moment, not a generic observation.',
  },
  {
    kicker: 'What I am bringing home',
    body: 'Placeholder. One habit, idea, or inside joke I am keeping.',
  },
]

/* -------- 5. Three blog posts from my other site (external links) -------- */
const posts = [
  {
    kicker: 'Field note 01',
    title: 'Placeholder title for post one.',
    blurb: 'A one-sentence teaser for the post. Replace when published.',
    href: 'https://example.com/post-1',
    readTime: '4 min read',
  },
  {
    kicker: 'Field note 02',
    title: 'Placeholder title for post two.',
    blurb: 'A one-sentence teaser for the post. Replace when published.',
    href: 'https://example.com/post-2',
    readTime: '6 min read',
  },
  {
    kicker: 'Field note 03',
    title: 'Placeholder title for post three.',
    blurb: 'A one-sentence teaser for the post. Replace when published.',
    href: 'https://example.com/post-3',
    readTime: '5 min read',
  },
]

/* -------- 6. Journal (optional, as many as I want) -------- */
const entries = [
  {
    date: 'May __',
    title: 'A short title.',
    body: `Paragraph goes here. Write like I am telling a friend at dinner.`,
  },
]

/* ======================================================================= */

export function LandonBruski() {
  return (
    <div className="relative flex min-h-screen flex-col bg-cream-50 text-navy-700">
      {/* Hero */}
      <header className="relative overflow-hidden bg-cream-100 pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(60%_60%_at_15%_10%,#D9A44133_0%,transparent_60%),radial-gradient(50%_50%_at_85%_90%,#3F7AA322_0%,transparent_60%)]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 md:px-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-700 font-display text-base text-cream-50">
                {me.monogram}
              </span>
              <span className="h-px flex-1 max-w-24 bg-navy-700/20" />
              <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-navy-700/55">
                A personal field guide
              </span>
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] tracking-tight text-navy-700">
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
              <a
                href="#field-notes"
                className="inline-flex items-center gap-2 rounded-full bg-navy-700 px-4 py-2 text-sm font-medium text-cream-50 transition-colors hover:bg-crimson-800"
              >
                Read my field notes
              </a>
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
              <div className="flex items-center justify-between border-t border-navy-700/10 bg-cream-50 px-5 py-3">
                <p className="font-display text-sm tracking-wide text-navy-700/80">
                  {me.name}
                </p>
                <p className="font-display text-sm italic text-crimson-600">
                  ~ Lando
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* About me strip */}
      <section className="border-y border-navy-700/10 bg-cream-50 py-12">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3 lg:grid-cols-6">
            {aboutMe.map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.04}>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-crimson-600">
                    {item.label}
                  </p>
                  <p className="mt-2 font-display text-base leading-snug text-navy-700">
                    {item.value}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

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
        </div>
      </section>

      {/* Three things */}
      <section className="bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="02"
            kicker="Three things"
            title="A small list, in no particular order."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {threeThings.map((thing, i) => (
              <FadeIn key={thing.kicker} delay={i * 0.08}>
                <article className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-50 p-6 transition-colors hover:border-crimson-600/40">
                  <span className="absolute right-5 top-5 font-display text-3xl text-crimson-600/15 transition-colors group-hover:text-crimson-600/30">
                    0{i + 1}
                  </span>
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
      </section>

      {/* Field notes / blog posts */}
      <section id="field-notes" className="scroll-mt-24 bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="03"
            kicker="Field notes"
            title="Three pieces I wrote about the trip."
            subtitle="The longer-form writing lives on my own site. These are the three I want you to read first."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {posts.map((post, i) => (
              <FadeIn key={post.kicker} delay={i * 0.08}>
                <a
                  href={post.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-navy-700/10 bg-cream-100 p-6 transition-all hover:-translate-y-1 hover:border-crimson-600/40 hover:shadow-deep"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-crimson-600">
                        {post.kicker}
                      </p>
                      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-navy-700/55">
                        {post.readTime}
                      </p>
                    </div>
                    <h3 className="mt-4 font-display text-2xl leading-tight tracking-tight text-navy-700">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-navy-700/80">
                      {post.blurb}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.2em] text-navy-700/70 transition-colors group-hover:text-crimson-600">
                    Read on my site
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Journal */}
      {entries.length > 0 && (
        <section className="bg-cream-100 py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-5 md:px-10">
            <SectionHeader
              number="04"
              kicker="Journal"
              title="A few entries from the road."
            />
            <div className="mt-10 flex flex-col gap-12">
              {entries.map((entry, i) => (
                <FadeIn key={`${entry.date}-${i}`} delay={i * 0.06}>
                  <article className="border-l-2 border-crimson-600/30 pl-6">
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
      )}

      {/* Footer */}
      <footer className="bg-crimson-800 py-16 text-cream-50">
        <div className="mx-auto max-w-7xl px-5 md:px-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-3xl leading-tight tracking-tight text-cream-50 md:text-4xl">
              Thanks for reading.
            </p>
            <p className="mt-3 font-display text-xl italic text-cream-50/80">
              {me.monogram} &middot; {me.name}
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-cream-50/30 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-cream-50/85 transition-colors hover:border-gold-400 hover:text-cream-50"
          >
            &larr; Back to the cohort homepage
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default LandonBruski
