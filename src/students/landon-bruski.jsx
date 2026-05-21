/**
 * Landon Bruski, Portugal 2026.
 *
 * Personal page. Slots into the cohort site through the auto-discovered
 * route at /students/landon-bruski. Keep `export default` at the bottom.
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FadeIn } from '../components/ui/FadeIn'
import { SectionHeader } from '../components/ui/SectionHeader'

/* -------- 1. Profile -------- */
const me = {
  name: 'Landon Bruski',
  monogram: 'LB',
  tagline:
    'My first trip outside the U.S., told the way I saw it. A few days in Madrid and Barcelona, then two weeks across Portugal.',
  photo: '/students/landon-bruski.jpg',
}

/* -------- 2. Cities we visited -------- */
const aboutMe = [
  { label: 'Spain', value: 'Madrid' },
  { label: 'Spain', value: 'Barcelona' },
  { label: 'Portugal', value: 'Porto' },
  { label: 'Portugal', value: 'Lisbon' },
  { label: 'Portugal', value: 'Sintra' },
  { label: 'Portugal', value: 'Braga' },
  { label: 'Portugal', value: 'Coimbra' },
]

/* -------- 3. Favorite day -------- */
const favoriteDay = {
  date: 'May 18',
  city: 'Peneda-Gerês',
  title: '40,000 steps through Portugal’s only national park.',
  body: [
    `On our free day, a few of us drove north of Braga to Peneda-Gerês, the only national park in Portugal. It is all granite hills and cold-water pools fed by waterfalls, right up against the Spanish border. Sydney, Anna, and I basically did not stop walking. By the end of it my phone said 40,000 steps.`,
    `We swam in the spring water under the falls even though it was cold enough to knock the air out of you. The water comes straight off the mountains, so it never really warms up, even in May. The drive back wound through some of the most beautiful country I have seen.`,
  ],
  images: [
    { src: '/students/landon-bruski/favorite/geres-valley.jpg', alt: 'A green river valley and reservoir in the Gerês hills' },
    { src: '/students/landon-bruski/favorite/geres-waterfall.jpg', alt: 'Landon in front of a waterfall in Peneda-Gerês' },
  ],
}

/* -------- 4. Three things -------- */
const threeThings = [
  {
    kicker: 'Best thing I ate',
    title: 'A ten-course Michelin dinner, and my first seafood ever.',
    body: 'I had somehow never really eaten seafood before this trip. It started with a Catalan seafood stew in Barcelona and peaked at Le Monument in Porto: Grande Viagem, ten courses over four hours. Four hours at a table sounds insane until you are an hour in and fully along for the ride.',
  },
  {
    kicker: 'Something I did not expect',
    title: 'How loud a Benfica match gets.',
    body: 'Benfica vs Braga at Estádio da Luz. I did not expect a regular-season game to feel like that, the noise and the flares and the whole stadium moving at once. Still not louder than Bryant-Denny on a Saturday, but honestly close, and a lot of fun.',
  },
  {
    kicker: 'What I am bringing home',
    title: 'A Lamine Yamal Barcelona jersey.',
    body: 'I flew over early to meet Lucas in Barcelona to kick off the trip, and the jersey came back with me. While we were over there, Barcelona played Real Madrid and won. I caught that one on TV instead of in the city, but it sealed the deal on the jersey.',
  },
]

/* -------- 5. Photo gallery -------- */
const galleryImages = [
  { src: '/students/landon-bruski/gallery/cohort-jeronimos-monastery.jpg', caption: 'The whole cohort at the Jerónimos Monastery, Lisbon' },
  { src: '/students/landon-bruski/gallery/jeronimos-cloister.jpg', caption: 'Inside the Jerónimos cloister, Belém' },
  { src: '/students/landon-bruski/gallery/rua-augusta-arch-lisbon.jpg', caption: 'Rua Augusta Arch, Praça do Comércio' },
  { src: '/students/landon-bruski/gallery/monument-to-the-discoveries-belem.jpg', caption: 'Monument to the Discoveries, Belém' },
  { src: '/students/landon-bruski/gallery/lisbon-sunset-sao-jorge-castle.jpg', caption: 'Dusk over Lisbon, São Jorge Castle on the hill' },
  { src: '/students/landon-bruski/gallery/cristo-rei-lisbon.jpg', caption: 'Cristo Rei, above the Tagus' },
  { src: '/students/landon-bruski/gallery/pena-palace-sintra.jpg', caption: 'Pena Palace, Sintra' },
  { src: '/students/landon-bruski/gallery/benfica-stadium-tunnel.jpg', caption: 'The player’s tunnel at Benfica’s Estádio da Luz' },
  { src: '/students/landon-bruski/gallery/benfica-eagle.jpg', caption: 'Vitória, the Benfica eagle' },
  { src: '/students/landon-bruski/gallery/puerta-de-alcala-madrid.jpg', caption: 'Puerta de Alcalá, Madrid, day one' },
  { src: '/students/landon-bruski/gallery/sagrada-familia-barcelona.jpg', caption: 'Sagrada Família, Barcelona' },
  { src: '/students/landon-bruski/gallery/casa-batllo-barcelona.jpg', caption: 'Casa Batlló, Barcelona' },
  { src: '/students/landon-bruski/gallery/surf-lesson-porto.jpg', caption: 'Surf lesson on the Atlantic, Porto' },
  { src: '/students/landon-bruski/gallery/bom-jesus-braga.jpg', caption: 'Bom Jesus do Monte, Braga, all 583 steps' },
  { src: '/students/landon-bruski/gallery/porto-douro-ribeira.jpg', caption: 'The Douro and Ribeira from above, Porto' },
  { src: '/students/landon-bruski/gallery/douro-cruise-friends.jpg', caption: 'Farewell Douro cruise with Sydney and Anna' },
  { src: '/students/landon-bruski/gallery/cohort-douro-cruise.jpg', caption: 'The cohort on the farewell dinner cruise' },
  { src: '/students/landon-bruski/gallery/douro-boat-wheel.jpg', caption: 'Briefly in charge of the boat' },
  { src: '/students/landon-bruski/gallery/porto-at-night.jpg', caption: 'Porto at night, from the river' },
]

/* -------- 6. Food gallery -------- */
const foodImages = [
  { src: '/students/landon-bruski/food/seafood-rice.jpg', name: 'Seafood rice', note: 'Prawns, mussels, and clams in a tomato-saffron rice. My first real seafood, and the dish that broke the ice.' },
  { src: '/students/landon-bruski/food/flaming-chourico.jpg', name: 'Flaming chouriço', note: 'Cured sausage set on fire tableside at a grocer and charred over its own flame. You eat it straight off the dish.' },
  { src: '/students/landon-bruski/food/steak-egg-bun.jpg', name: 'Steak, egg, and a bun', note: 'A toasted roll stacked with steak, melted cheese, and a runny fried egg on top.' },
  { src: '/students/landon-bruski/food/cacio-e-pepe.jpg', name: 'Cacio e pepe, La Fiorentina', note: 'Fresh pasta, pecorino, cracked black pepper. Three ingredients, done exactly right.' },
  { src: '/students/landon-bruski/food/tagliatelle-meatball.jpg', name: 'Tagliatelle and meatball', note: 'Tomato sauce, parmesan, basil, and a meatball about the size of my fist.' },
  { src: '/students/landon-bruski/food/grilled-picanha.jpg', name: 'Grilled picanha', note: 'Sirloin cap under a garlic-herb sauce, with blistered cherry tomatoes.' },
  { src: '/students/landon-bruski/food/flatbread.jpg', name: 'Flatbread, two ways', note: 'Half mozzarella and herbs, half cured ham with ricotta, tomato, and crushed pistachio.' },
  { src: '/students/landon-bruski/food/le-monument-welcome.jpg', name: 'The welcome at Le Monument', note: 'Petit fours, macarons, and a cocktail before a four-hour, ten-course tasting menu.' },
  { src: '/students/landon-bruski/food/le-monument-terrine.jpg', name: 'A terrine at Le Monument', note: 'A delicate terrine with dots of citrus and herb purée and an edible borage flower.' },
  { src: '/students/landon-bruski/food/le-monument-bite.jpg', name: 'A single bite at Le Monument', note: 'One composed mouthful under a saffron-colored sauce. The plate was half the art.' },
  { src: '/students/landon-bruski/food/le-monument-lamb.jpg', name: 'Lamb at Le Monument', note: 'Pink-cooked lamb with nasturtium leaves and herb oil, a seeded cracker on the side.' },
  { src: '/students/landon-bruski/food/red-velvet.jpg', name: 'Red velvet, café-style', note: 'Eaten outside on a pineapple-print tablecloth. Not Michelin, still excellent.' },
]

/* -------- 7. Field notes: the three blog posts, in full -------- */
const posts = [
  {
    kicker: 'Part one',
    title: 'The Comparison Kept Breaking',
    blurb: 'Madrid and Barcelona with Lucas. My first time out of the country, and every comparison to home fell apart.',
    readTime: '5 min read',
    paragraphs: [
      `My family never left America. Not once growing up, and not for lack of curiosity, it just was not something we did. So when the chance to study abroad came up through the University of Alabama, the whole idea sat strangely in my head, like something that happened to other people’s families. College had already taught me to say yes to things I would have flinched at in high school, and this was the biggest version of that yet.`,
      `The plan was to fly to Spain alone, meet my travel partner Lucas in Barcelona, and figure out the rest. The night before, my brain ran the same loop. Do I have my passport? Do I have my charger? Was my Spanish actually going to hold up? I packed and repacked twice before I left.`,
      `Fifteen hours of layovers and flights later, I landed in Madrid with one day to explore before the train to Barcelona. I took an Uber into the city and immediately understood I had no reference point for what I was looking at. The buildings were older than anything I had grown up around, and they were old in a way that felt lived in rather than preserved. I passed the Alcalá Gate and just stared at it, a stone arch from the 1700s sitting in the middle of a roundabout with cars circling it like it was a normal Tuesday. People at the cafés ate slowly, and nobody was on their phone in the way I was used to seeing back home. The parks were the size of midtown Manhattan blocks, which mattered to me because running is the thing I do to clear my head, and I started mentally mapping routes before I had even checked in anywhere.`,
      `By that evening, I was on a train to Barcelona, and Lucas was waiting for me at the station when I got in. The city was louder than Madrid, in a good way. Tourists everywhere, restaurants spilling onto the sidewalks, people taking pictures of buildings I had not even noticed yet.`,
      `We went to the Sagrada Família first. I had seen pictures, but pictures do not prepare you for the scale, or for the fact that it is still being built more than a century after they started. Standing under it, I kept thinking about how many generations of stonemasons and architects have worked on the same building and will never see it finished.`,
      `We wandered into other cathedrals almost by accident, Gothic and Romanesque ones tucked between regular streets, the kind of buildings that would be a national landmark back home and were just sort of there. Then we went to the beach to try seafood, which I had somehow never really had before. We ordered Zarzuela de Mariscos, a Catalan stew with lobster, shrimp, and mussels in a rich tomato broth.`,
      `Somewhere between the cathedrals and the beach, we stumbled into the White Rabbit, an immersive art space tucked into a side street. The whole thing is built by a rotating group of contemporary artists, each given a room or a hallway to do whatever they want with, whether that means projection mapping, sound installations, or sculpture you can walk through. You move from one piece to the next without any warning about what is coming. It was the kind of place I would never have walked into on purpose and probably loved more because of it.`,
      `On our last day, we climbed up to Montjuïc Castle. From the top, you can see the whole city pressed against the water, the harbor full of ships, the cathedrals we had walked through earlier reduced to small spikes in the skyline.`,
      `Barcelona was not even the main experience. It was the warm-up for Lisbon, and the flight there is where the trip caught up with me. I kept comparing what I had seen to something back in the US, and every comparison broke down within a sentence. The Sagrada Família was like, no. The parks in Madrid reminded me of, no. Barcelona at night felt a little like, no. I kept trying anyway, because that is how my brain wanted to handle it, filing the new thing under something familiar so it would stop being so disorienting. The part I had been fighting was the part I had come for, and I had been treating it as the problem the whole time.`,
      `Now, for my next stop in Lisbon, I plan to embrace these differences without comparisons. To see each thing for what it is and recognize that these countries have unique and distinctive aspects that I can experience alongside the rest of my study abroad group. The comparisons that kept breaking turned out to be a good thing because they revealed exactly what you want to get out of studying abroad, a global perspective I have never had before.`,
    ],
  },
  {
    kicker: 'Part two',
    title: 'First Week in Lisbon',
    blurb: 'Seven hills, a full day in Belém, a Benfica match, the food tour, and Sintra in the fog.',
    readTime: '4 min read',
    paragraphs: [
      `I checked into the hotel on a Wednesday afternoon. Two hours later, I was standing in Praça do Comércio, still jet-lagged, looking up at the arch on the north side of the square that once served as Lisbon’s grand entrance from the river.`,
      `The city tour the next day put the geography in context. Lisbon sits on seven hills, and every block ends in either a staircase or a viewpoint. Edward 7th Park, Liberty Avenue, and Rossio all sit in the grid that was built after the 1755 earthquake leveled most of the city. From Miradouro de Santa Luzia, you can see what didn’t get rebuilt: Alfama, the medieval Moorish neighborhood, still tangled and narrow, the way it has been for centuries. The Lisbon Cathedral, which was started in 1147, sits at the edge of it. Every neighborhood has its own parish church tucked into the alleys, many built directly on top of former mosques after the Reconquista.`,
      `We spent a full day in Belém. The Jerónimos Monastery, the Belém Tower, the Maritime Museum, and the Monument to the Discoveries all sit within a fifteen-minute walk of each other. This stretch of the city is essentially a monument to the Age of Discovery. Vasco da Gama is buried in the monastery, and the Belém Tower was built to guard the harbor from which his ships sailed.`,
      `Later that week, we caught a Benfica match at Estádio da Luz. The game was Benfica vs Braga, and the game ended in a tie, but it was a thrilling game the entire way through. The crowd was the loudest stadium I’ve ever been in outside of Bryant-Denny.`,
      `The food tour surprised me the most on the trip. Portugal eats more cod per capita than almost anywhere on earth, even though cod isn’t native to its waters. The Portuguese have been salting and importing it from the North Atlantic since the 1500s, and the national dish, bacalhau, is built around an ingredient the country had to sail thousands of miles to get. I tried octopus and rojões, fried pork chunks served in piri-piri, the Portuguese hot sauce made from chilies the country brought back from its African colonies.`,
      `We finished the week in Sintra. Pena Palace sits at the top of the mountain, painted yellow and red in the 19th-century Romantic style. The hillside is wrapped in a fog forest that feels nothing like the Lisbon we’d left an hour earlier. By the time we left for Porto the next morning, Lisbon had given me more history, food, and steep climbs in a week than I’d expected from a single city.`,
    ],
  },
  {
    kicker: 'Part three',
    title: 'Second Week in Porto',
    blurb: 'Surfing the Atlantic, a cooking class, 583 steps in Braga, the Gerês free day, and a four-hour Michelin dinner.',
    readTime: '4 min read',
    paragraphs: [
      `We arrived in Porto on Wednesday afternoon after a stop at the University of Coimbra, founded in 1290. Porto sits along the Douro River, with the historic Ribeira district on one bank and the port wine cellars of Vila Nova de Gaia on the other. The city’s Roman name, Portus Cale, gave Portugal its name.`,
      `The next day, we did a city tour by tuk-tuk. We saw the Porto Cathedral, built in the 12th century on the highest point in the city, and the Igreja dos Carmelitas, which is separated from the neighboring Igreja do Carmo by a one-meter-wide house built between them. We took the cable car along the Douro for views over the river and the Dom Luís I Bridge, the iron arch completed in 1886 and once the longest of its kind in the world.`,
      `We spent the following day on the Atlantic for a surf lesson. The waves were heavy, and it took most of the lesson to catch my first wave. I also spotted my first wild sea urchin in the shallows. That afternoon, we did a hands-on Portuguese cooking class with two local chefs, George and Vitor. I made the pan-seared prawn starter while they led the rest of the meal.`,
      `Later in the week, we drove out to Braga, one of Portugal’s oldest cities and home to the country’s oldest cathedral, the Sé de Braga. We climbed all 583 steps of the Baroque stairway at the Bom Jesus do Monte sanctuary.`,
      `The free day was the best of the trip. A few of us drove out to Peneda-Gerês, Portugal’s only national park. The granite hills are dotted with waterfalls and cold-water pools where you can swim. The bus ride back wound through some of the most beautiful country I’ve seen.`,
      `FC Porto also clinched their 31st Primeira Liga title while we were in town, and the city threw a celebration to match. The team paraded from Ribeira up to Praça dos Aliados, where captain Diogo Costa and coach Francesco Farioli lifted the trophy in front of a packed square. The night ended with fireworks and a drone show that spelled “One Family” across the sky over downtown.`,
      `The standout was Le Monument, the Michelin-starred restaurant in the Monumental Palace Hotel, where Chef Julien Montbabut serves Grande Viagem, a ten-course, four-hour tasting menu through Portugal’s regions. We closed the trip with a farewell dinner cruise down the Douro at sunset. By the time the boat pulled back in, my first time leaving the U.S. was over, and I was already trying to figure out when I’d be back. What I’ll remember most isn’t any single monument or meal, but the feeling that I’d barely started seeing what’s out there.`,
    ],
  },
]

/* ======================================================================= */

export function LandonBruski() {
  const [openPost, setOpenPost] = useState(0)

  return (
    <div className="relative flex min-h-screen flex-col bg-cream-50 text-navy-700">
      {/* Hero */}
      <header className="relative overflow-hidden bg-cream-100 pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(60%_60%_at_15%_10%,#D9A44133_0%,transparent_60%),radial-gradient(50%_50%_at_85%_90%,#3F7AA322_0%,transparent_60%)]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 md:px-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <h1 className="font-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] tracking-tight text-navy-700">
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
            </div>
          </motion.div>
        </div>
      </header>

      {/* About me strip */}
      <section className="border-y border-navy-700/10 bg-cream-50 py-12">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 lg:grid-cols-7">
            {aboutMe.map((item, i) => (
              <FadeIn key={item.value} delay={i * 0.04}>
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
        <div className="mx-auto max-w-5xl px-5 md:px-10">
          <SectionHeader
            number="01"
            kicker={`${favoriteDay.city} · ${favoriteDay.date}`}
            title={favoriteDay.title}
          />

          <FadeIn delay={0.1}>
            <div className="mt-10 overflow-hidden rounded-3xl border border-navy-700/10 shadow-deep">
              <img
                src={favoriteDay.images[0].src}
                alt={favoriteDay.images[0].alt}
                loading="lazy"
                className="aspect-video w-full object-cover"
              />
            </div>
          </FadeIn>

          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-start">
            <FadeIn delay={0.15}>
              <div className="overflow-hidden rounded-3xl border border-navy-700/10 bg-cream-100">
                <img
                  src={favoriteDay.images[1].src}
                  alt={favoriteDay.images[1].alt}
                  loading="lazy"
                  className="aspect-4/5 w-full object-cover"
                />
              </div>
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
      <section className="bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="02"
            kicker="Three things"
            title="Three things from my trip."
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
                  <h3 className="font-display text-xl leading-tight tracking-tight text-navy-700">
                    {thing.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-navy-700/85">
                    {thing.body}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="03"
            kicker="The gallery"
            title="Two weeks, six cities, one camera roll."
            subtitle="Lisbon and Belém, Sintra, Porto and the Douro, Braga and Gerês, with Madrid and Barcelona at the start."
          />
          <div className="mt-10 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
            {galleryImages.map((img) => (
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
        </div>
      </section>

      {/* Food gallery */}
      <section className="bg-cream-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeader
            number="04"
            kicker="What I ate"
            title="From a very uncultured palate to ten Michelin courses."
            subtitle="Street food, restaurants, and the ten-course tasting menu in Porto."
          />
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {foodImages.map((item, i) => (
              <FadeIn key={item.src} delay={(i % 3) * 0.06}>
                <figure className="flex h-full flex-col">
                  <div className="overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-50">
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

      {/* Field notes / blog posts */}
      <section id="field-notes" className="scroll-mt-24 bg-cream-50 py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <SectionHeader
            number="05"
            kicker="Field notes"
            title="The trip, written down in three parts."
            subtitle="I kept a blog the whole way through. Tap a part to read the whole thing."
          />
          <div className="mt-10 flex flex-col gap-4">
            {posts.map((post, i) => {
              const open = openPost === i
              return (
                <FadeIn key={post.title} delay={i * 0.06}>
                  <article className="overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-100">
                    <button
                      type="button"
                      onClick={() => setOpenPost(open ? -1 : i)}
                      aria-expanded={open}
                      className="flex w-full items-start gap-4 p-6 text-left transition-colors hover:bg-cream-200/40"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-crimson-600">
                            {post.kicker}
                          </p>
                          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-navy-700/50">
                            {post.readTime}
                          </p>
                        </div>
                        <h3 className="mt-3 font-display text-2xl leading-tight tracking-tight text-navy-700">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-[14px] leading-relaxed text-navy-700/75">
                          {post.blurb}
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className={`mt-1 shrink-0 font-display text-2xl leading-none text-crimson-600 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
                      >
                        +
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.2, 0.65, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-5 border-t border-navy-700/10 px-6 py-7">
                            {post.paragraphs.map((para, p) => (
                              <p
                                key={p}
                                className="text-[15px] leading-relaxed text-navy-700/85 text-pretty"
                              >
                                {para}
                              </p>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

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
