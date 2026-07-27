import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FadeIn } from '../components/ui/FadeIn'
import Lenis from 'lenis'
import anime from 'animejs/lib/anime.es.js'

/* -------- Profile -------- */
const me = {
  name: 'Evan Patterson',
  year: 'Junior',
  major: 'Management Information Systems',
  hometown: 'Albertville, Alabama',
  tagline: 'Two weeks between Lisbon and Porto, written down before I forget it.',
  photo: '/students/evan-patterson/evan-patterson.jpeg',
  heroPhoto: '/students/evan-patterson/in_post/head.JPEG'
}

/* -------- Journal entries -------- */
// paragraphs: add as many strings as you want.
// Photo A floats left alongside paragraphs[0] onward.
// Photo B floats right alongside paragraphs[2] onward.
const entries = [
  {
    city: 'Lisbon',
    title: 'Croissants, Chaos, and My First Night in Lisbon',
    photoA: '/students/evan-patterson/in_post/first.jpeg',
    photoB: '/students/evan-patterson/in_post/welcome.JPEG', // e.g. '/students/evan-patterson/entry-1-b.jpg'
    captionA: 'On our way to the welcome dinner, first look at Lisbon',
    captionB: 'Welcome dinner spread, Portuguese food sampler',
    paragraphs: [
      "I was looking forward to this trip so much. This was my first time flying alone - no group, no one to follow through the airport. It was a brand new experience, but one I'm really glad I did. The flight over wasn't great. I tried to sleep to fight off jet lag, but it did not work at all. I flew out of Atlanta with a layover in Paris, where the passport system happened to be down, so they had to hand-check everyone's passport - painfully slow. Once I got through, I found my gate and had my first European coffee and croissant of the trip. Felt like a good start to the next few weeks.",
      "The flight from Paris to Lisbon was short and easy. Getting out of the Lisbon airport felt like walking through a shopping mall - so many stores that I genuinely thought I'd missed my exit. I finally found baggage claim and ended up waiting almost two hours for my luggage, which was ridiculous. That wait was also where I met up with some of the other people in my group for the first time. Once we had our bags, we met our field director, Martino, just outside the terminal. It was a little awkward at first, but I think we all grew to love him.",
      "We took a short bus ride to the hotel, dropped off our things, and headed back downstairs for our welcome dinner. The walk over was great - my first real look at Lisbon, and good conversation with people I hadn't seen since our last day of class back home. Dinner was our first taste of Portuguese food, basically a sampler of everything: cuttlefish, prawns, homemade fried potato chips, and this is where it started - my love for octopus in the form of a salad. More on that later. Afterward a few of us went looking for gelato and ended up at a frozen yogurt place instead. Good, just not what I had in mind. I was so exhausted that night that people kept asking if I was okay. Back at the hotel I had the best sleep of my life - a full ten hours, 10pm to 8am, which never happens to me.",
      "The next day we met our Lisbon tour guide, Isabelle, who I loved immediately - a little sassy, which only made the stories of the trip better. She walked us through the city's main sights and dropped us off at the oldest bookstore in the world, which genuinely amazed me. Back at the hotel, a small group of us kept exploring on our own: a bus ride to a church with rooftop access and incredible views, a garden across the street with a grand gazebo and an enormous old tree, and then just wandering the streets with no real plan.",
      "That became one of my favorite parts of the whole trip - walking somewhere new and realizing I'd already been there, just by a different route. Small moments like that made the city feel a little smaller, a little more mine, each time it happened. That night a few of us grabbed dinner at a cantina where I had octopus again and loved it even more. Afterward we went to an Irish pub, played imposter, and I had my first soft drink in Europe - a ginger ale and a Coca-Cola, and somehow it tastes better over there than it does back home. A good way to close out night two.",
    ],
  },
  {
    city: 'Lisbon',
    title: 'Trams, Pastries, and the Best Cinnamon Roll of My Life',
    photoA: '/students/evan-patterson/in_post/monestary.jpeg',
    photoB: '/students/evan-patterson/in_post/rolls.jpeg',
    captionA: 'Monestary courtyard, where the Pastel de Nata was invented',
    captionB: 'Quest, where I had the best cinnamon roll of my life',
    paragraphs: [
      "The next couple of days were spent exploring Lisbon and the surrounding areas, and there was a lot to see. We visited a monastery, a nautical museum, and a monument to exploration. The monastery was so pretty, and it turned out to be the place that invented the Pastel de Nata. We learned that in Portugal, a lot of desserts were actually created by churches, because they were government funded and could afford sugar, so they would make treats to give to the poor. I thought that was really interesting. The nautical museum was a lot of fun too, getting to look at all the different boats and learning about Portugal's history of exploration. The monument was really neat, very tall and pretty against a bright blue sky, and we got to go up to the top which made the views even better.",
      "That evening a group of us went to an Italian restaurant and it was such a great experience. Part of the group had their pasta rolled in a cheese wheel right at the table so the cheese melted fresh on top, and then a few of us ordered tiramisu for dessert where they made it right in front of us. It was so good and really fun watching them make it.",
      "The next day we went to Sintra to see the National Palace of Pena. It was so beautiful and colorful, it honestly looked like it came straight out of a storybook. We had to do a short hike to get up to it, and seeing it peek out from behind the trees on the way up was such a great view. Sintra itself was a really nice little town to explore - I just enjoyed walking around, getting a little lost, and doing some shopping. Sintra is also known for their cheese tarts and Travesseiros, which are two treats you can really only find there.",
      "Back in Lisbon we got to ride both the historic trams and the newer ones. I learned very quickly that they don't stop unless you push the button, but it was a great experience either way. We went on an art tour through the city where we got to see some really great street art, and along the way we got up high enough to see some spectacular views. A group of us also went to see the Sanctuary of Christ the King, which is basically Portugal's version of Christ the Redeemer in Rio. From the top you could see all of Lisbon across the water with their version of the Golden Gate Bridge right in the middle. We also went up the Rua Augusta Arch, which looks out over the main street on one side and an open square with the ocean behind it on the other.",
      "The last full day in Lisbon was probably one of my most memorable of the whole trip. Two friends and I went to this place called Quest, and they had the best cinnamon roll I have ever had in my life. It was so big and so beautiful, I think it will stay in my memory forever. And then my dream came true, because one of the workers came over and gave us cinnamon rolls to take with us. I could have cried. Lisbon gave me so much - from the octopus and the desserts to all of the incredible views - and I was really going to miss it.",
    ],
  },
  {
    city: 'Lisbon',
    title: 'Benfica, Bollards, and a Rainy Walk Home',
    photoA: '/students/evan-patterson/in_post/pressconf.JPEG',
    photoB: '/students/evan-patterson/in_post/monorail.JPEG',
    captionA: 'Program Support Press Conference at the Benfica stadium',
    captionB: 'Packed monorail on the way back from the Benfica game',
    paragraphs: [
      "One of the days in Lisbon we had a tour of the Benfica stadium. It was really interesting learning how soccer culture works there, and how they have academies for young kids all around the world to learn and grow up playing for the club. The stadium itself was great, and one thing I found really interesting was that their mascot is an eagle, which I always associate with the United States. Another thing that surprised me was that the stadium actually holds fewer people than Bryant-Denny. A professional soccer club in Europe has a smaller stadium than a college football team back home.",
      "That evening we went to a Benfica game, which was my first soccer game ever. The ride over was crazy because there was a monorail station nearby and the trains were absolutely packed. I really enjoyed the atmosphere and just taking in the whole experience, even though I honestly didn't understand a whole lot of what was happening on the field. It was just really fun to be there. One thing that caught me off guard was that when I bought water they took the cap off so I couldn't throw it onto the field. That was something I had never seen before.",
      "The craziest part of the night was the fans. Benfica has two major fan groups who are kind of rivals with each other, and one of them was sitting right behind us. At different points during the game they set off fireworks - actual fireworks, right there in the stands behind us. It was absolutely wild. Benfica won, so the whole crowd was in a great mood when we finally left.",
      "Then it started raining. We had to find our own way back to the hotel, and on the way out of the stadium I walked right into one of those concrete bollards they put on the sidewalk to keep cars off. It got me pretty good. We eventually made it onto a train that was super packed at first but thinned out as we got closer to the hotel. A great night overall, sore shin and all.",
    ],
  },
  {
    city: 'Porto',
    title: 'Harry Potter Robes and a Ten Course Dinner',
    photoA: '/students/evan-patterson/in_post/coimbra.jpeg',
    photoB: '/students/evan-patterson/in_post/michelin.jpeg',
    captionA: 'University of Coimbra courtyard',
    captionB: 'Michelin star dessert plating',
    paragraphs: [
      "When we left Lisbon for Porto, we made a stop in Coimbra along the way. Coimbra is home to the oldest university in the world, and we got to take a short tour of the campus. It was so beautiful, and one of the coolest things I learned was that students there still wear academic robes around campus, kind of like Harry Potter. I really enjoyed walking around and learning about Coimbra and all of the traditions they have around the university.",
      "When we got to Porto and settled into the hotel, we got ready pretty quickly because we had reservations at a Michelin star restaurant. Everything about it was beautiful and it was truly a great experience, from the showmanship of how everything was presented to the food itself. The whole meal was themed around a journey through Portugal, with each course representing something from a different part of the country.",
      "It was ten courses total, and it was all really good and worth every bit of it. We had things like pigeon, whipped egg served right in the egg shell, and saffron, which is one of the most expensive spices in the world. Dessert was a lemon honey bee made with honey from their own local beehives, fresh fruit, and a chocolate cookie. The whole dinner ended up being about four hours long, and I would do it again without hesitation.",
    ],
  },
  {
    city: 'Porto',
    title: 'Cooking, Surfing, and the Most Beautiful Bookstore',
    photoA: '/students/evan-patterson/in_post/cooking.JPEG',
    photoB: '/students/evan-patterson/in_post/lello.jpeg',
    captionA: 'Pastel de Natas fresh from the cooking class',
    captionB: 'Lello Bookstore interior staircase',
    paragraphs: [
      "Porto had some of my favorite experiences of the whole trip. One of the best was the cooking class. I really enjoyed getting to make traditional Portuguese food. We split into groups and each group made something different - appetizers, sides, the main dish, or in my group's case, dessert. We made Pastel de Natas, which I really enjoyed, and it was surprisingly easy to make. They are better warm than they were by the time we got to eat them cold, but adding icing sugar and cinnamon on top made them really good. The two teachers were great and I really enjoyed learning from them.",
      "Next up was a surfing lesson, which was something I had never done before. We wore wetsuits because the water was so cold, and we had a short lesson on the beach covering how to get up on the board. I went out into the water, came back, and that was pretty much the end of my surfing experience. I spent the rest of the class sitting on the beach watching everyone else do really well. No shame in that.",
      "We also got to explore Porto and see some really great views. The highlight for me was visiting the Lello Bookstore, which is widely called the most beautiful bookstore in the world. Having seen it in person, I have to agree completely.",
    ],
  },
  {
    city: 'Porto',
    title: 'The Last Morning, and the Best French Toast',
    photoA: '/students/evan-patterson/in_post/majestic.jpeg',
    photoB: '/students/evan-patterson/in_post/cruise.jpeg',
    captionA: 'Majestic Cafe interior, marble tables and leather chairs',
    captionB: 'Dinner cruise on the last night',
    paragraphs: [
      "The last couple of days were a really great way to close out the trip. After visiting the Lello Bookstore, a friend and I found a viewpoint and watched the sunset go down over the city. The next morning I got up early and walked around the empty streets of Porto by myself for a while. It was really relaxing and I enjoyed having the time to just clear my head before heading home.",
      "I joined the line at the Majestic Cafe, which has been there since the 1920s and the inside still looks like it. The original architecture is all still there and I truly could not have been more impressed by it. The tables were heavy marble with wooden legs and the chairs felt like real aged leather. I had the best French toast I think I have ever had - more of a pastry bread, perfectly toasted, with fresh walnuts, honey, and raisins. And for me to say the raisins were good is really saying something. The cappuccino I had with it tasted so good out of their little cup. I put my phone away completely and just took in the whole experience, eating slowly and finding new little details in the building every time I looked up. By the time I finished the French toast they had me sitting right in front of the Pastel de Nata case, so naturally I had to order one. It might have been the best one I had the whole trip.",
      "After that I headed back to the hotel for our last study abroad class where we talked about the 7 Habits, then squeezed in some last minute shopping at Vida Portuguesa, a store that carries products from all over Portugal. Lunch was a Portuguese chicken sandwich with potato salad - really good, just a little different from what you would expect back home.",
      "That evening we had a dinner cruise, and it was honestly the perfect way to end the trip. We were all together, we had a great meal, and we could see Porto all lit up along the river. We took pictures together, told stories from the trip, and the captain even let us take turns steering the boat. Afterward my group went for one last walk through Porto and really soaked in the views of the city at night before heading back to the hotel.",
      "The next day we went to the airport. A lot of us had later flights so we hung out near the gate for a while before we could even check our bags, just talking and saying we could not wait to see each other in the fall. I flew home with a layover in Amsterdam, and my parents picked me up in Atlanta. I slept the whole way home, and honestly most of the next couple of days too.",
    ],
  },
]

/* -------- Three things -------- */
const threeThings = [
  { kicker: 'Best thing I ate', body: 'The cinnamon roll at Quest in Lisbon that was so good a worker came over and gave us extra ones to take with us. Or the French toast at the Majestic Cafe in Porto that I ate every single bite of without touching my phone once.' },
  { kicker: 'Something I did not expect', body: 'How much I would love octopus. I ordered it at the welcome dinner not really knowing what I was getting into, and eded up ordering it again every chance I got after that.' },
  { kicker: 'What I am bringing home', body: 'Putting the phone down. The best moments of the whole trip were the ones where I just looked around and took it in, whether that was wandering streets I had already been on, or sitting in the Majestic Cafe finding new deatils in the ceiling.' },
]

/* -------- Shared inline style helpers -------- */
const MONO = { fontFamily: "'JetBrains Mono', monospace" }
const DISPLAY = { fontFamily: "'Fraunces', serif" }

function PhotoSlot({ src, width, height, caption, style }) {
  return (
    <div style={style}>
      <div style={{
        width, height,
        border: '6px solid #FCF8F1',
        outline: '1px solid #E2CFA8',
        boxShadow: '0 15px 40px -20px rgba(158,27,50,0.35)',
        overflow: 'hidden',
        ...(!src && { background: 'linear-gradient(135deg, #D4C9B8 0%, #BFB3A2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }),
      }}>
        {src
          ? <img src={src} alt={caption} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <span style={{ ...MONO, fontSize: '10px', color: '#9E1B32', textAlign: 'center', padding: '8px', opacity: 0.5 }}>photo</span>
        }
      </div>
      <div style={{ ...MONO, fontSize: '11px', color: '#3F7AA3', marginTop: '8px', textAlign: 'center' }}>
        {caption}
      </div>
    </div>
  )
}

export function EvanPatterson() {
  const [activeIdx, setActiveIdx] = useState(0)
  const entryRefs = useRef([])

  /* Lenis smooth scroll */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    let raf
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])

  /* anime.js scroll-reveal — one-shot fade+slide per entry */
  useEffect(() => {
    const els = entryRefs.current.filter(Boolean)
    els.forEach(el => { el.style.opacity = '0' })
    const io = new IntersectionObserver((observed) => {
      observed.forEach(en => {
        if (en.isIntersecting) {
          anime({ targets: en.target, translateY: [28, 0], opacity: [0, 1], duration: 900, easing: 'easeOutCubic' })
          io.unobserve(en.target)
        }
      })
    }, { threshold: 0.15 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  /* Trip-meter scroll-spy */
  useEffect(() => {
    const els = entryRefs.current.filter(Boolean)
    const spy = new IntersectionObserver((observed) => {
      observed.forEach(en => {
        if (en.isIntersecting) setActiveIdx(Number(en.target.dataset.idx))
      })
    }, { threshold: 0.5 })
    els.forEach(el => spy.observe(el))
    return () => spy.disconnect()
  }, [])

  const n = entries.length
  const tilt = 3

  return (
    <div style={{ background: '#FCF8F1', color: '#0B1F3A', position: 'relative', fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif", overflowX: 'hidden' }}>

      {/* ── Trip-meter rail (desktop only) ── */}
      <div
        className="hidden lg:flex"
        style={{ position: 'absolute', left: 0, top: '88vh', bottom: 0, width: '64px', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}
      >
        <div style={{ position: 'relative', width: '2px', background: 'linear-gradient(#E2CFA8, #B0223A, #E2CFA8)', height: '100%' }}>
          {entries.map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                transform: activeIdx === i ? 'translateX(-50%) scale(1.3)' : 'translateX(-50%) scale(1)',
                top: `${(i / (n - 1)) * 92 + 2}%`,
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: activeIdx === i ? '#9E1B32' : '#FCF8F1',
                border: '2px solid #9E1B32',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* ══ HERO ══ */}
      <header style={{ position: 'relative', height: '88vh', minHeight: '600px', overflow: 'hidden' }}>
        {/* Background */}
        {me.heroPhoto
          ? <img src={me.heroPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #050D1B 0%, #0B1F3A 45%, #14304F 100%)' }} />
        }
        {/* Scrim */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,13,27,0.15) 0%, rgba(5,13,27,0.55) 78%, rgba(5,13,27,0.85) 100%)', pointerEvents: 'none' }} />

        {/* Top nav */}
        <div style={{ position: 'absolute', left: '8%', right: '8%', top: '8%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link
            to="/"
            style={{ ...MONO, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F7EFE1', textDecoration: 'none', border: '1px solid rgba(247,239,225,0.4)', borderRadius: '9999px', padding: '8px 16px' }}
          >
            ← Back to the cohort
          </Link>
          <span style={{ ...MONO, fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#F7EFE1', opacity: 0.75, background: 'rgba(5,13,27,0.3)', borderRadius: '9999px', padding: '8px 16px' }}>
            {me.hometown}
          </span>
        </div>

        {/* Bottom cluster: polaroid + name block */}
        <div style={{ position: 'absolute', left: '8%', right: '8%', bottom: '10%', display: 'flex', alignItems: 'flex-end', gap: '28px', flexWrap: 'wrap' }}>
          {/* Polaroid-style profile photo */}
          <div style={{ flexShrink: 0, width: '190px', padding: '14px 14px 44px', background: '#FCF8F1', boxShadow: '0 20px 45px -18px rgba(5,13,27,0.5)', transform: 'rotate(-4deg)' }}>
            <img src={me.photo} alt={me.name} style={{ width: '100%', height: '230px', objectFit: 'cover', display: 'block' }} />
          </div>

          {/* Name block */}
          <div>
            <div style={{ ...MONO, fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#EFE2C9', marginBottom: '14px' }}>
              UA MIS Portugal 2026 · {me.year} · {me.major}
            </div>
            <h1 style={{ ...DISPLAY, fontWeight: 500, fontStyle: 'italic', fontSize: 'clamp(40px,7vw,84px)', lineHeight: 1.02, color: '#FCF8F1', margin: 0, maxWidth: '820px' }}>
              {me.name}
            </h1>
            <p style={{ fontSize: '17px', color: '#F7EFE1', opacity: 0.9, maxWidth: '560px', margin: '18px 0 0 0' }}>
              {me.tagline}
            </p>
            <div style={{ height: '2px', width: '96px', background: '#D9A441', marginTop: '22px' }} />
          </div>
        </div>
      </header>

      {/* ══ SECTION 01: THREE THINGS ══ */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '100px 28px 60px 100px' }}>
        <div style={{ ...MONO, fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9E1B32', marginBottom: '10px' }}>
          01&nbsp;/&nbsp;Three things
        </div>
        <h2 style={{ ...DISPLAY, fontWeight: 600, fontSize: 'clamp(26px,3.6vw,34px)', margin: '0 0 32px 0', color: '#0B1F3A' }}>
          A small list.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {threeThings.map((thing, i) => (
            <FadeIn key={thing.kicker} delay={i * 0.08}>
              <div style={{ background: '#F7EFE1', border: '1px solid #E2CFA8', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ ...MONO, fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9E1B32' }}>{thing.kicker}</div>
                <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#14304F', margin: 0 }}>{thing.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══ SECTION 02: FIELD NOTES ══ */}
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 28px 20px 100px', position: 'relative' }}>
        <div style={{ ...MONO, fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9E1B32', marginBottom: '10px' }}>
          02&nbsp;/&nbsp;Field notes
        </div>
        <h2 style={{ ...DISPLAY, fontWeight: 600, fontSize: 'clamp(28px,4vw,36px)', margin: '0 0 12px 0', color: '#0B1F3A' }}>
          The trip, written down in six parts.
        </h2>
        <p style={{ fontSize: '16px', color: '#14304F', opacity: 0.75, margin: '0 0 60px 0' }}>
          I kept this journal the whole way through — scroll on for the whole thing.
        </p>

        {entries.map((entry, i) => (
          <section
            key={i}
            ref={el => { entryRefs.current[i] = el }}
            data-idx={String(i)}
            style={{ marginBottom: '130px', position: 'relative' }}
          >
            {/* Entry meta */}
            <div style={{ ...MONO, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9E1B32', display: 'flex', gap: '14px', alignItems: 'baseline', marginBottom: '10px' }}>
              <span>Entry {String(i + 1).padStart(2, '0')}</span>
              <span style={{ color: '#E2CFA8' }}>/</span>
              <span style={{ color: '#0B1F3A' }}>{entry.city}</span>
            </div>

            <h2 style={{ ...DISPLAY, fontWeight: 600, fontSize: 'clamp(28px,4vw,38px)', margin: '0 0 22px 0', color: '#0B1F3A' }}>
              {entry.title}
            </h2>

            {/* Float-left photo appears before paragraph 0 */}
            <PhotoSlot
              src={entry.photoA || undefined}
              width="260px"
              height="190px"
              caption={entry.captionA}
              style={{ float: 'left', width: '260px', margin: '4px 28px 14px 0', transform: `rotate(${i % 2 === 0 ? -tilt : tilt}deg)` }}
            />

            {entry.paragraphs.map((text, p) => (
              <div key={p}>
                {/* Float-right photo injected before paragraph 2 */}
                {p === 2 && (
                  <PhotoSlot
                    src={entry.photoB || undefined}
                    width="230px"
                    height="290px"
                    caption={entry.captionB}
                    style={{ float: 'right', width: '230px', margin: '10px 0 14px 28px', transform: `rotate(${i % 2 === 0 ? tilt : -tilt}deg)` }}
                  />
                )}
                <p style={{ fontSize: '17px', lineHeight: 1.75, color: '#14304F', margin: '0 0 18px 0' }}>{text}</p>
              </div>
            ))}

            <div style={{ clear: 'both' }} />
          </section>
        ))}
      </main>

      {/* ══ FOOTER ══ */}
      <footer style={{ borderTop: '1px solid #E2CFA8', padding: '32px 8% 60px 8%', textAlign: 'center' }}>
        <div style={{ ...DISPLAY, fontStyle: 'italic', fontSize: '20px', color: '#9E1B32' }}>
          Obrigada, Portugal.
        </div>
        <div style={{ ...MONO, fontSize: '11px', color: '#14304F', opacity: 0.6, marginTop: '10px' }}>
          UA MIS Portugal 2026 · Evan's personal page
        </div>
        <Link
          to="/"
          style={{ display: 'inline-block', marginTop: '20px', ...MONO, fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9E1B32', textDecoration: 'none', border: '1px solid rgba(158,27,50,0.3)', borderRadius: '9999px', padding: '8px 16px' }}
        >
          ← Back to the cohort
        </Link>
      </footer>
    </div>
  )
}

export default EvanPatterson
