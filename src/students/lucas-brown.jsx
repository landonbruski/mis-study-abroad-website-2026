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

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FadeIn } from '../components/ui/FadeIn'

const P = '/students/lucas-brown'

/* -------- Azulejo theme (internal styling) -------- */
const az = {
  ink: 'text-[#0A2647]',
  inkSoft: 'text-[#0A2647]/85',
  sky: 'text-[#4A7C9B]',
  skyMuted: 'text-[#5B8FA8]',
  cobalt: 'text-[#1E4D7B]',
  bg: 'bg-white',
  bgIce: 'bg-[#EDF5FC]',
  border: 'border-[#93B5D0]',
  borderStrong: 'border-[#2563A8]',
  fontDisplay: "font-['Cinzel_Decorative',serif] font-bold",
  fontLabel: "font-['Cinzel',serif] font-bold",
  fontBody: "font-['Lora',serif]",
}

function AzulejoSectionHeader({ number, kicker, title, subtitle }) {
  return (
    <div className="flex flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 1] }}
        className="flex items-center gap-3"
      >
        <span className={`${az.fontLabel} text-sm leading-none tabular-nums tracking-tight ${az.skyMuted}`}>
          {number}
        </span>
        <span className="h-px w-10 bg-[#2563A8]/70" />
        {kicker && (
          <span className={`${az.fontLabel} text-[11px] uppercase tracking-[0.28em] ${az.sky}`}>
            {kicker}
          </span>
        )}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.65, 0.3, 1] }}
        className={`max-w-6xl ${az.fontDisplay} text-4xl leading-[1.08] tracking-tight md:text-5xl lg:text-6xl ${az.ink}`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`mt-1 max-w-4xl ${az.fontBody} text-sm leading-relaxed md:text-[15px] ${az.inkSoft}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

/* -------- 1. Your profile -------- */
const me = {
  name: 'Luke Brown',
  year: 'Rising Senior', // Freshman / Sophomore / Junior / Senior / MS
  major: 'Management Information Systems',
  hometown: 'Morganton, North Carolina',
  tagline: 'There is no limit to the amount of pastéis de nata I can eat.',
  /** Copy Images/lucas-brown.jpg to public/students/lucas-brown/lucas-brown.jpg */
  photo: `${P}/lucas-brown.jpg`,
}

/* -------- 2. My trip -------- */
const myTrip = {
  title: 'My trip',
  body: `Scroll through my page to see the trip through my eyes, via my photos. I thoroughly enjoyed the trip from start to finish.
  I would like to thank the MIS program at the University of Alabama for this wonderful opportunity.
  Getting to experience the culture and people of Portugal was incredible, and was just as valuable
  if not moreso than my other coursework at UA. After eating many salty and savory seafood dishes like
  cod, sardines, octopus, and clams, I can certainly say that I've expanded my palatte. The
  melancholy of the Fado music was certainly something I will remember for a long time.
  Perhaps best of all, though, was the great architecture of the cities and the beautiful tiles everywhere.
  Those added a through line with a lot of character that really defined the whole trip for me. Check out the rest of 
  my page for some photos of these, among other things!`,
  photo: {
    src: `${P}/more/porto-dusk-douro.png`,
    alt: 'Porto at dusk, the Douro and the city lights',
    description: 'The Douro river in Porto.',
  },
}

/* -------- 3. Favorite day on the trip -------- */
const favoriteDay = {
  date: 'May 11',
  city: 'Lisbon',
  title: 'Cornering the Portuguese cuisine, and a run-in with the Ultras',
  body: `I was chewing on the grit of my 5th serving of clams when it occured to me that I was finally nearing the central 
  nerve of the Portuguese culture, something I'd hoped to find on this trip. It wasn't in those clams at the end of our food tour in the 
  old moorish-style palace turned restaurant, though. I found it later that evening at a soccer match among the stomping, clapping, chanting, Ultras of Benfica- the most dedicated of all fans. 
  These fans, who called themselves the Red Devils, brought an angry passion and hooligan attitude with their flares, fireworks, and flags. 
  In a sea of red smoke they concetrated the Portuguese spirit and we were right in the middle of it. 
  For me I had found the great Portuguese dream, the center of their culture, but for the Red Devils it was just Monday night.`,
  photo: {
    src: `${P}/favorite/mourinho-benfica.png`,
    alt: 'José Mourinho on the sideline at a Benfica match',
    description:
      'José Mourinho on the sideline managing for Benfica. Within a week\'s time, he would leave Benfica for Real Madrid.',
  },
}

/* -------- 4. Three things -------- */
const threeThings = [
  {
    kicker: 'Best thing I ate',
    body: 'Paella in Barcelona.',
  },
  {
    kicker: 'Something I did not expect',
    body: 'The detailed tilework across the country. There were beautiful blue and white tiles everywhere we went.',
  },
  {
    kicker: 'What I am bringing home',
    body: 'A new white shirt.',
  },
]

/* -------- 5. Journal entries (optional, as many as you want) -------- */
const entries = []

/* -------- 6. Photo galleries --------
 * Copy images from the local Images/ folder into public/students/lucas-brown/:
 *   Images/Tiles/*      -> public/students/lucas-brown/tiles/
 *   Images/Art/*        -> public/students/lucas-brown/art/
 *   Images/Buildings/*  -> public/students/lucas-brown/more/
 *   Images/Other/*      -> public/students/lucas-brown/more/
 * Fill in caption and description for each photo below.
 */
const tilePhotos = [
  { src: '/students/lucas-brown/tiles/21016cff-ec12-42c3-9c76-eaf9e0a8079b.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/tiles/308392da-6dc8-4f7c-90fe-e56e632876c3.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/tiles/3dac324d-18a1-43c0-bf2a-e552bb4e9aa5.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/tiles/ba9af1cd-57bc-40d9-a629-dc36dc668fc4.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/tiles/ca8bd1c6-f72c-4998-8199-181241d4888e.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/tiles/db9d0433-5423-4b45-bcad-a38ae9e43f31.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/tiles/conquista-lisboa-1147.png', caption: '', description: '' },
  { src: '/students/lucas-brown/tiles/azulejo-street-mural.png', caption: '', description: '' },
  { src: '/students/lucas-brown/tiles/chapel-azulejo-interior.png', caption: '', description: '' },
  { src: '/students/lucas-brown/tiles/weathered-azulejo-wall.png', caption: '', description: '' },
]

const artPhotos = [
  { src: '/students/lucas-brown/art/1cb8524a-f62a-428e-97ef-685d4e4e9df4.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/art/2b3dab8b-0ced-4111-9b14-d6b21c8c7039.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/art/4c0fc84a-c869-4784-8e14-709108c81d5d.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/art/4ff07f19-3698-4f83-be09-9096c2f408ab.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/art/545d8102-574f-42af-a87d-bdc5190fdbb2.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/art/5e89adfd-9f64-40b9-bc1f-78e1c1985f01.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/art/6292a69f-e1cd-4f86-af76-d6cdf60f7111.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/art/76f33dff-d7eb-468f-87b0-abad1c068177.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/art/c740f03e-9331-4de9-9d7d-d95312d6bae4.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/art/d03895f9-c027-466b-8c32-224f060d481f.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/art/db79eecc-6a7a-4a70-a251-9a237923c783.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/art/e0eed4ed-f0a8-4be1-8177-39b686a378cd.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/art/self-portrait-talavera-1954.png', caption: '', description: '' },
  { src: '/students/lucas-brown/art/surrealist-painting.png', caption: '', description: '' },
  { src: '/students/lucas-brown/art/soares-dos-reis-sarcophagus.png', caption: '', description: '' },
]

const morePhotos = [
  { src: '/students/lucas-brown/more/390fa3f3-6b25-4ff2-87f1-e654224a027f.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/4298aa5d-81e0-4610-abdc-fd9c3153317b.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/58921790-f776-44e7-a025-487ed1064255.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/597f4503-5370-4397-a8e8-0c910001e21f.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/615d74f1-0698-435f-b12f-e0a9371eb70a.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/6c7144d2-8c96-4d45-a945-180f36f3aae3.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/73e5d261-8713-4a7b-9444-b5ee7fc90d71.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/83f0906a-f1e5-4548-8dfa-5318a0ae356d.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/86c7655f-e020-40ca-a4ff-e3eff59f98cd.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/91f269aa-ad9b-4aeb-821b-f49bf064dafb.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/a124160c-ec17-4af6-b851-a805a86ce180.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/c8bb8f92-af91-4dbc-9273-2d073d93c538.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/d8283f72-ce96-4601-acb6-85e7ee328b8a.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/fdac593b-2a22-4a77-a99b-51e0931628ad.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/013434dd-65f4-431f-a4a3-ce9e12205fe0.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/0ade6054-0bb3-46c3-b3d2-b40f60a55356.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/17315df3-5649-48e8-a8c1-15181a2aa161.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/3b1e7054-ca1d-4c1d-a13b-840af1b84c0b.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/5b47b6c4-605f-45e5-9705-e294670748e7.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/5f05954c-6a7e-4077-a972-b23ec825b453.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/5fb9864d-42ad-468a-b9e9-d43ab190513c.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/69d07d0d-c360-4c4d-9f31-d78a44670c0e.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/7b4c00df-3185-4571-abcd-67db887bda6f.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/7d827a77-e4d2-485d-86b7-7214052cb7f8.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/80a12fae-3b12-4ab8-b26c-11fd2bffca7c.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/84355a10-9d6e-429d-88ef-0aec74d95f96.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/9536d89f-bd45-4105-bbc8-0f5a8a81436a.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/987efc6b-ddf7-4942-98f2-7718342b9f67.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/99a4d9cd-5bab-43cd-b40e-02725ecb02f5.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/9ce6ee9a-b978-46e7-b082-03c2ff6d67a6.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/a9fc87f9-8b9e-4ed5-b75f-89f5892d0c55.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/ae4033dd-382d-4b1c-8b80-046a13bd1ac0.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/bfcccc43-8a59-4909-9627-642bba60b3f4.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/c11d593b-c02c-4d6f-ae34-084fcfb63ee5.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/c5d9730c-172f-4a3c-89c2-210fed969a60.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/d33846bd-7773-40b9-9ddb-6bee22725aea.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/d67fcf24-eac2-47bc-aece-065b7d45433a.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/e329ff40-238d-4b19-85cc-021797bc991e.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/ea84de71-77b0-4007-bad0-9c9db4c67085.jpg', caption: '', description: '' },
  { src: '/students/lucas-brown/more/bom-jesus-braga-staircase.png', caption: '', description: '' },
]
/* ======================================================================= */
/*  You usually do not need to edit anything below this line.              */
/*  Rename the component to your name in CamelCase before you export.      */
/* ======================================================================= */

function PhotoLightbox({ src, alt, className, loading, rounded = 'rounded-2xl' }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group block w-full cursor-zoom-in overflow-hidden ${rounded} text-left transition-shadow duration-300 hover:shadow-[0_10px_28px_-10px_rgba(30,77,123,0.28)]`}
        aria-label={`View larger: ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          className={`${className} transition-transform duration-700 group-hover:scale-[1.04]`}
          loading={loading}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A2647]/90 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-sm border border-[#93B5D0] px-3 py-1.5 text-sm font-medium text-[#EDF5FC] transition-colors hover:border-white"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              Close
            </button>
            <motion.img
              src={src}
              alt={alt}
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

function AzulejoStorySection({ number, kicker, title, body, photo, imageRight = false }) {
  const imageBlock = (
    <FadeIn delay={0.1} className={imageRight ? 'md:order-2' : undefined}>
      <figure>
        <PhotoLightbox
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          className="aspect-4/5 w-full object-cover"
        />
        {photo.description && (
          <figcaption className={`mt-4 ${az.fontBody} text-[13px] leading-relaxed ${az.inkSoft}`}>
            {photo.description}
          </figcaption>
        )}
      </figure>
    </FadeIn>
  )

  const textBlock = (
    <FadeIn delay={0.15} className={imageRight ? 'md:order-1' : undefined}>
      <p className={`${az.fontBody} text-base leading-[1.75] md:text-lg md:leading-[1.8] ${az.ink}`}>
        {body}
      </p>
    </FadeIn>
  )

  return (
    <section className={`${az.bg} py-20 md:py-24`}>
      <div className="mx-auto max-w-5xl px-5 md:px-10">
        <AzulejoSectionHeader number={number} kicker={kicker} title={title} />
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-start">
          {imageBlock}
          {textBlock}
        </div>
      </div>
    </section>
  )
}

function PhotoGallery({ images, compact = false }) {
  return (
    <div
      className={
        compact
          ? 'mt-6 grid gap-x-3 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
          : 'mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3'
      }
    >
      {images.map((img, i) => (
        <FadeIn key={img.src} delay={(i % 5) * 0.04}>
          <figure className="flex h-full flex-col">
            <PhotoLightbox
              src={img.src}
              alt={img.caption || 'Trip photo'}
              loading="lazy"
              rounded={compact ? 'rounded-xl' : 'rounded-2xl'}
              className={
                compact
                  ? 'aspect-square w-full object-cover'
                  : 'aspect-4/5 w-full object-cover'
              }
            />
            {(img.caption || img.description) && (
              <figcaption className={`px-0.5 ${compact ? 'mt-2' : 'mt-4 px-1'}`}>
                {img.caption && (
                  <p
                    className={`${az.fontLabel} leading-tight tracking-tight ${az.ink} ${compact ? 'text-sm' : 'text-lg'}`}
                  >
                    {img.caption}
                  </p>
                )}
                {img.description && (
                  <p
                    className={`${az.fontBody} leading-relaxed ${az.inkSoft} ${compact ? 'mt-1 text-[11px]' : 'mt-1.5 text-[13px]'}`}
                  >
                    {img.description}
                  </p>
                )}
              </figcaption>
            )}
          </figure>
        </FadeIn>
      ))}
    </div>
  )
}

export function LucasBrown() {
  return (
    <div className={`azulejo-page relative flex min-h-screen flex-col ${az.bg} ${az.ink}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cinzel:wght@600;700&family=Lora:wght@400;500&display=swap');

        .azulejo-page {
          background-color: #ffffff;
          background-image:
            radial-gradient(circle at 0 0, rgba(37, 99, 168, 0.07) 1px, transparent 1px),
            radial-gradient(circle at 12px 12px, rgba(37, 99, 168, 0.05) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .azulejo-hero {
          background:
            linear-gradient(180deg, #f4f9fd 0%, #ffffff 100%);
          border-bottom: 2px solid rgba(37, 99, 168, 0.2);
        }

        .az-card {
          border: 2px solid rgba(37, 99, 168, 0.25);
          box-shadow: 4px 4px 0 rgba(37, 99, 168, 0.08);
        }
      `}</style>

      {/* Hero */}
      <header className="azulejo-hero relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 md:px-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className={`${az.fontLabel} text-[11px] uppercase tracking-[0.28em] ${az.sky}`}>
              Portugal 2026 · {me.year} · {me.major}
            </p>
            <h1 className={`mt-4 ${az.fontDisplay} text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-tight ${az.ink}`}>
              {me.name}
            </h1>
            <p className={`mt-6 max-w-xl ${az.fontBody} text-base leading-relaxed text-pretty md:text-[17px] ${az.inkSoft}`}>
              {me.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/"
                className={`inline-flex items-center gap-2 rounded-sm border-2 ${az.borderStrong} bg-white px-4 py-2 ${az.fontLabel} text-sm ${az.cobalt} transition-colors hover:bg-[#EDF5FC] hover:text-[#0A2647]`}
              >
                &larr; Back to the cohort
              </Link>
              <span className={`inline-flex items-center gap-2 rounded-sm border ${az.border} bg-[#EDF5FC] px-4 py-2 ${az.fontLabel} text-[11px] uppercase tracking-[0.22em] ${az.sky}`}>
                {me.hometown}
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md overflow-hidden"
          >
            <div className="aspect-4/5">
              <PhotoLightbox
                src={me.photo}
                alt={me.name}
                rounded="rounded-3xl"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* My trip */}
      <AzulejoStorySection
        number="01"
        title={myTrip.title}
        body={myTrip.body}
        photo={myTrip.photo}
        imageRight
      />

      {/* Favorite day */}
      <AzulejoStorySection
        number="02"
        kicker={`${favoriteDay.city} · ${favoriteDay.date}`}
        title={favoriteDay.title}
        body={favoriteDay.body}
        photo={favoriteDay.photo}
      />

      {/* Three things */}
      <section id="three-things" className={`scroll-mt-24 ${az.bgIce} py-20 md:py-24`}>
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <AzulejoSectionHeader
            number="03"
            kicker="Three things"
            title="3 things from my trip."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {threeThings.map((thing, i) => (
              <FadeIn key={thing.kicker} delay={i * 0.08}>
                <article className={`az-card flex h-full flex-col gap-3 rounded-sm bg-white p-6`}>
                  <p className={`${az.fontLabel} text-[10px] uppercase tracking-[0.28em] ${az.sky}`}>
                    {thing.kicker}
                  </p>
                  <p className={`${az.fontBody} text-[15px] leading-relaxed ${az.inkSoft}`}>
                    {thing.body}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tiles */}
      <section id="tiles" className={`scroll-mt-24 ${az.bg} py-12 md:py-16`}>
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <AzulejoSectionHeader
            number="04"
            kicker="Azulejo"
            title="Tiles on every corner."
            subtitle="A true staple of Portugal, used to cool and decorate buildings."
          />
          <PhotoGallery images={tilePhotos} compact />
        </div>
      </section>

      {/* Art */}
      <section id="art" className={`scroll-mt-24 ${az.bgIce} py-12 md:py-16`}>
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <AzulejoSectionHeader
            number="05"
            kicker="Art"
            title="My favorite artworks."
          />
          <PhotoGallery images={artPhotos} compact />
        </div>
      </section>

      {/* Buildings and other */}
      <section id="more" className={`scroll-mt-24 ${az.bg} py-12 md:py-16`}>
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <AzulejoSectionHeader
            number="06"
            kicker="The rest"
            title="Buildings, streets, and everything in between."
          />
          <PhotoGallery images={morePhotos} compact />
        </div>
      </section>

      {/* Journal */}
      {entries.length > 0 && (
        <section className={`${az.bgIce} py-20 md:py-24`}>
          <div className="mx-auto max-w-3xl px-5 md:px-10">
            <AzulejoSectionHeader
              number="07"
              kicker="Journal"
              title="A few entries."
            />
            <div className="mt-10 flex flex-col gap-10">
              {entries.map((entry, i) => (
                <FadeIn key={`${entry.date}-${i}`} delay={i * 0.06}>
                  <article className="az-card rounded-sm bg-white p-6">
                    <p className={`${az.fontLabel} text-[11px] uppercase tracking-[0.28em] ${az.sky}`}>
                      {entry.date}
                    </p>
                    <h3 className={`mt-2 ${az.fontDisplay} text-3xl leading-tight tracking-tight ${az.ink}`}>
                      {entry.title}
                    </h3>
                    <p className={`mt-4 ${az.fontBody} text-[15px] leading-relaxed ${az.inkSoft}`}>
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
      <footer className="border-t-4 border-[#2563A8] bg-[#0A3D62] py-16 text-white">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <p className={`${az.fontDisplay} text-3xl leading-tight tracking-tight text-[#EDF5FC] md:text-4xl`}>
            Thanks for reading.
          </p>
          <p className={`mt-4 ${az.fontBody} text-sm text-[#B8D4E8]`}>
            &mdash; {me.name}, UA MIS Portugal 2026
          </p>
          <Link
            to="/"
            className={`mt-6 inline-flex items-center gap-2 rounded-sm border-2 border-[#93B5D0] px-4 py-2 ${az.fontLabel} text-[11px] uppercase tracking-[0.22em] text-[#EDF5FC] transition-colors hover:border-white hover:bg-[#1E4D7B] hover:text-white`}
          >
            &larr; Back to the cohort homepage
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default LucasBrown
