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
const entries = [
  {
    city: 'Lisbon',
    title: 'Croissants, Chaos, and My First Night in Lisbon',
    photoA: '/students/evan-patterson/in_post/first.jpeg',
    photoB: '/students/evan-patterson/in_post/welcome.JPEG',
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
    captionA: 'Monastery courtyard, where the Pastel de Nata was invented',
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
    photoB: '/students/evan-patterson/in_post/michelin.JPEG',
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
  { kicker: 'Something I did not expect', body: 'How much I would love octopus. I ordered it at the welcome dinner not really knowing what I was getting into, and ended up ordering it again every chance I got after that.' },
  { kicker: 'What I am bringing home', body: 'Putting the phone down. The best moments of the whole trip were the ones where I just looked around and took it in, whether that was wandering streets I had already been on, or sitting in the Majestic Cafe finding new details in the ceiling.' },
]

/* -------- Shared inline style helpers -------- */
const MONO = { fontFamily: "'JetBrains Mono', monospace" }
const DISPLAY = { fontFamily: "'Fraunces', serif" }

/* -------- Three torn-paper path variants -------- */
const TORN_PATHS = [
  "M0,10 L14,4 L22,13 L36,2 L46,11 L57,5 L68,14 L82,3 L94,9 L105,6 L118,14 L130,1 L143,9 L154,13 L166,4 L179,11 L190,6 L202,15 L216,2 L228,9 L240,5 L254,14 L267,3 L279,11 L291,6 L304,15 L318,2 L330,10 L342,5 L356,14 L368,3 L380,11 L392,7 L405,15 L418,2 L430,10 L443,5 L456,14 L468,3 L481,11 L493,7 L506,15 L519,2 L532,10 L544,5 L557,14 L570,3 L582,11 L595,7 L608,15 L620,2 L633,10 L645,5 L658,14 L670,3 L683,11 L696,7 L709,15 L722,2 L734,10 L746,5 L759,13 L760,8 L760,18 L0,18 Z",
  "M0,9 L10,4 L17,12 L25,5 L34,13 L41,6 L50,14 L60,3 L68,9 L77,5 L87,13 L95,3 L105,11 L115,6 L126,14 L135,4 L146,10 L155,5 L163,13 L172,3 L181,10 L192,5 L202,14 L211,4 L221,10 L231,6 L241,14 L251,3 L262,10 L272,5 L282,14 L292,3 L302,11 L312,5 L322,14 L332,3 L342,10 L352,5 L362,14 L372,4 L382,11 L393,5 L403,14 L413,3 L423,10 L433,5 L443,14 L453,3 L463,10 L473,5 L483,14 L493,3 L503,10 L513,5 L523,14 L533,3 L543,10 L554,5 L564,14 L574,4 L584,11 L594,5 L604,14 L614,3 L624,10 L634,5 L644,13 L655,4 L665,11 L675,5 L685,13 L696,3 L706,10 L717,5 L727,13 L737,4 L747,11 L757,6 L760,9 L760,18 L0,18 Z",
  "M0,11 L20,3 L30,15 L44,2 L58,13 L68,4 L80,16 L96,1 L110,12 L122,5 L136,15 L148,2 L162,13 L174,6 L186,16 L202,2 L218,12 L230,5 L244,16 L256,1 L270,12 L284,6 L296,16 L308,2 L322,12 L336,5 L350,16 L362,2 L376,12 L388,5 L402,16 L418,1 L432,12 L444,5 L458,16 L470,2 L484,12 L496,5 L510,16 L524,1 L538,12 L550,5 L564,16 L576,2 L590,12 L602,5 L616,16 L628,2 L642,12 L654,5 L668,16 L680,2 L694,12 L706,5 L720,16 L732,2 L744,10 L756,5 L760,11 L760,18 L0,18 Z",
]

/* -------- Photo slot with 3D mouse-tilt hover -------- */
function PhotoSlot({ src, width, height, caption, style, rotation = 0 }) {
  const cardRef = useRef(null)
  const [hover, setHover] = useState({ active: false, rx: 0, ry: 0 })
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const onMouseMove = (e) => {
    if (reducedMotion.current) return
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
    setHover({ active: true, rx: -dy * 10, ry: dx * 10 })
  }

  const onMouseLeave = () => setHover({ active: false, rx: 0, ry: 0 })

  const transform = hover.active
    ? `perspective(700px) rotateX(${hover.rx}deg) rotateY(${hover.ry}deg) scale(1.04)`
    : `rotate(${rotation}deg)`

  return (
    <div
      ref={cardRef}
      style={{
        ...style,
        transform,
        transition: hover.active ? 'transform 0.08s linear' : 'transform 0.5s cubic-bezier(0.2, 0.65, 0.3, 1)',
        willChange: hover.active ? 'transform' : 'auto',
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div style={{
        width, height,
        border: '6px solid #FCF8F1',
        outline: '1px solid #E2CFA8',
        boxShadow: hover.active
          ? '0 28px 60px -18px rgba(158,27,50,0.50)'
          : '0 15px 40px -20px rgba(158,27,50,0.35)',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s ease',
        ...(!src && { background: 'linear-gradient(135deg, #D4C9B8 0%, #BFB3A2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }),
      }}>
        {src
          ? <img src={src} alt={caption} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <span style={{ ...MONO, fontSize: '10px', color: '#9E1B32', textAlign: 'center', padding: '8px', opacity: 0.5 }}>photo</span>
        }
      </div>
      <div style={{ ...MONO, fontSize: '11px', color: 'rgba(11,31,58,0.6)', marginTop: '8px', textAlign: 'center', textWrap: 'balance' }}>
        {caption}
      </div>
    </div>
  )
}

function PassportStamp({ city, idx }) {
  const label = city.toUpperCase()
  const topId = `sp-top-${idx}`
  const botId = `sp-bot-${idx}`
  return (
    <div style={{
      position: 'absolute', top: '-10px', right: '-10px',
      width: '190px', height: '190px',
      opacity: 0.15, pointerEvents: 'none', zIndex: 0,
      transform: 'rotate(-15deg)',
    }}>
      <svg viewBox="0 0 160 160" width="190" height="190">
        <circle cx="80" cy="80" r="74" fill="none" stroke="#9E1B32" strokeWidth="3" />
        <circle cx="80" cy="80" r="65" fill="none" stroke="#9E1B32" strokeWidth="1" />
        <path id={topId} d="M 22,80 A 58,58 0 0,1 138,80" fill="none" />
        <path id={botId} d="M 24,82 A 58,58 0 0,0 136,82" fill="none" />
        <text fontFamily="'JetBrains Mono',monospace" fontSize="14" letterSpacing="7" fill="#9E1B32">
          <textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">{label}</textPath>
        </text>
        <text fontFamily="'JetBrains Mono',monospace" fontSize="9" letterSpacing="3" fill="#9E1B32">
          <textPath href={`#${botId}`} startOffset="50%" textAnchor="middle">PORTUGAL · 2026</textPath>
        </text>
        <line x1="36" y1="80" x2="58" y2="80" stroke="#9E1B32" strokeWidth="1.5" />
        <line x1="102" y1="80" x2="124" y2="80" stroke="#9E1B32" strokeWidth="1.5" />
        <text x="80" y="84" textAnchor="middle" fontFamily="serif" fontSize="10" fill="#9E1B32">★  ★  ★</text>
      </svg>
    </div>
  )
}

function TornPaper({ variant = 0 }) {
  return (
    <div style={{ margin: '32px 0 0 0', lineHeight: 0, pointerEvents: 'none' }}>
      <svg viewBox="0 0 760 18" width="100%" height="18" preserveAspectRatio="none" style={{ display: 'block' }}>
        <path d={TORN_PATHS[variant % TORN_PATHS.length]} fill="#E2CFA8" opacity="0.65" />
      </svg>
    </div>
  )
}

function SectionKicker({ number, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
      <div style={{ width: '32px', height: '1px', background: '#9E1B32', opacity: 0.45, flexShrink: 0 }} />
      <div style={{ ...MONO, fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9E1B32' }}>
        {number}&nbsp;/&nbsp;{label}
      </div>
    </div>
  )
}

export function EvanPatterson() {
  const [activeIdx, setActiveIdx] = useState(-1)
  const [dotPositions, setDotPositions] = useState([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const entryRefs = useRef([])
  const outerRef = useRef(null)
  const heroImgRef = useRef(null)
  const polaroidRef = useRef(null)
  const goldRuleRef = useRef(null)

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

  /* Hero parallax + mobile scroll progress — single passive listener */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (heroImgRef.current) {
        heroImgRef.current.style.transform = `translateY(${scrollY * 0.12}px) scale(1.25)`
      }
      const total = document.documentElement.scrollHeight - document.documentElement.clientHeight
      if (total > 0) setScrollProgress((scrollY / total) * 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Polaroid entrance animation */
  useEffect(() => {
    if (!polaroidRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    polaroidRef.current.style.opacity = '0'
    polaroidRef.current.style.transform = 'rotate(-8deg) translateY(20px)'
    anime({
      targets: polaroidRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      rotate: [-8, -4],
      duration: 900,
      delay: 400,
      easing: 'easeOutCubic',
    })
  }, [])

  /* Gold rule grow-in animation */
  useEffect(() => {
    if (!goldRuleRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    goldRuleRef.current.style.width = '0px'
    anime({
      targets: goldRuleRef.current,
      width: '160px',
      duration: 700,
      delay: 1100,
      easing: 'easeOutCubic',
    })
  }, [])

  /* anime.js scroll-reveal — one-shot fade+slide per entry */
  useEffect(() => {
    const els = entryRefs.current.filter(Boolean)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(el => { el.style.opacity = '1' })
      return
    }
    els.forEach(el => { el.style.opacity = '0' })
    const io = new IntersectionObserver((observed) => {
      observed.forEach(en => {
        if (en.isIntersecting) {
          anime({ targets: en.target, translateY: [20, 0], opacity: [0, 1], duration: 700, easing: 'easeOutCubic' })
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
    }, { threshold: 0.2 })
    els.forEach(el => spy.observe(el))
    return () => spy.disconnect()
  }, [])

  /* Align rail dots to actual entry positions */
  useEffect(() => {
    const compute = () => {
      const outer = outerRef.current
      const els = entryRefs.current.filter(Boolean)
      if (!outer || !els.length) return
      const railStartPx = window.innerHeight * 0.88
      const railHeight = outer.scrollHeight - railStartPx
      setDotPositions(els.map(el => {
        const elTop = el.getBoundingClientRect().top + window.scrollY
        return Math.max(1, Math.min(97, (elTop - railStartPx) / railHeight * 100))
      }))
    }
    compute()
    const t = setTimeout(compute, 500)
    window.addEventListener('resize', compute)
    return () => { clearTimeout(t); window.removeEventListener('resize', compute) }
  }, [])

  const n = entries.length
  const tilt = 3

  return (
    <main ref={outerRef} style={{ background: '#FCF8F1', color: '#0B1F3A', position: 'relative', fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif", overflowX: 'hidden' }}>

      {/* Mobile scroll progress bar */}
      <div
        aria-hidden="true"
        className="lg:hidden"
        style={{
          position: 'fixed', top: 0, left: 0, height: '2px',
          background: '#9E1B32', width: `${scrollProgress}%`,
          zIndex: 100, pointerEvents: 'none',
          transition: 'width 0.1s linear',
        }}
      />

      {/* ── Trip-meter rail (desktop only) ── */}
      <div
        aria-hidden="true"
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
                top: dotPositions.length ? `${dotPositions[i]}%` : `${(i / (n - 1)) * 92 + 2}%`,
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: i <= activeIdx ? '#9E1B32' : '#FCF8F1',
                border: '2px solid #9E1B32',
                transition: 'background 0.3s ease, transform 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* ══ HERO ══ */}
      <header style={{ position: 'relative', height: '88vh', minHeight: '600px', overflow: 'hidden' }}>
        {me.heroPhoto
          ? <img
              ref={heroImgRef}
              src={me.heroPhoto}
              alt=""
              fetchPriority="high"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.25)', transformOrigin: 'center center', willChange: 'transform' }}
            />
          : <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #050D1B 0%, #0B1F3A 45%, #14304F 100%)' }} />
        }
        {/* Scrim */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,13,27,0.15) 0%, rgba(5,13,27,0.55) 78%, rgba(5,13,27,0.85) 100%)', pointerEvents: 'none' }} />

        {/* Top nav */}
        <div style={{ position: 'absolute', left: '8%', right: '8%', top: '8%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link
            to="/"
            style={{ ...MONO, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F7EFE1', textDecoration: 'none', border: '1px solid rgba(247,239,225,0.4)', borderRadius: '9999px', padding: '8px 16px', transition: 'border-color 0.2s ease, background 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(247,239,225,0.12)'; e.currentTarget.style.borderColor = 'rgba(247,239,225,0.7)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(247,239,225,0.4)' }}
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
          <div
            ref={polaroidRef}
            style={{ flexShrink: 0, width: '190px', padding: '14px 14px 44px', background: '#FCF8F1', boxShadow: '0 20px 45px -18px rgba(5,13,27,0.5)', transform: 'rotate(-4deg)' }}
          >
            <img src={me.photo} alt={me.name} style={{ width: '100%', height: '230px', objectFit: 'cover', display: 'block' }} />
          </div>

          {/* Name block */}
          <div>
            <div style={{ ...MONO, fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#EFE2C9', marginBottom: '14px' }}>
              UA MIS Portugal 2026 · {me.year} · {me.major}
            </div>
            <h1 style={{ ...DISPLAY, fontWeight: 500, fontStyle: 'italic', fontSize: 'clamp(40px,7vw,84px)', lineHeight: 1.02, color: '#FCF8F1', margin: 0, maxWidth: '820px', textWrap: 'balance' }}>
              {me.name}
            </h1>
            <p style={{ fontSize: '17px', color: '#F7EFE1', opacity: 0.9, maxWidth: '560px', margin: '18px 0 0 0', textWrap: 'pretty' }}>
              {me.tagline}
            </p>
            <div ref={goldRuleRef} style={{ height: '2px', width: '160px', background: '#D9A441', marginTop: '22px' }} />
          </div>
        </div>
      </header>

      {/* ══ SECTION 01: THREE THINGS ══ */}
      <section style={{ maxWidth: '1200px', margin: '0 auto' }} className="px-7 pt-[100px] pb-[60px] lg:px-[100px]">
        <SectionKicker number="01" label="Three things" />
        <h2 style={{ ...DISPLAY, fontWeight: 600, fontSize: 'clamp(26px,3.6vw,34px)', margin: '0 0 32px 0', color: '#0B1F3A', textWrap: 'balance' }}>
          A small list.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {threeThings.map((thing, i) => (
            <FadeIn key={thing.kicker} delay={i * 0.15}>
              <div style={{ background: '#F7EFE1', border: '1px solid #E2CFA8', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ ...MONO, fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9E1B32' }}>{thing.kicker}</div>
                <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#14304F', margin: 0, textWrap: 'pretty' }}>{thing.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══ SECTION 02: FIELD NOTES ══ */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }} className="px-7 pt-[80px] pb-5 lg:px-[100px]">
        <SectionKicker number="02" label="Field notes" />
        <h2 style={{ ...DISPLAY, fontWeight: 600, fontSize: 'clamp(28px,4vw,36px)', margin: '0 0 12px 0', color: '#0B1F3A', textWrap: 'balance' }}>
          The trip, written down in six parts.
        </h2>
        <p style={{ fontSize: '16px', color: '#14304F', opacity: 0.75, margin: '0 0 60px 0', textWrap: 'pretty' }}>
          I kept this journal the whole way through — scroll on for the whole thing.
        </p>

        {entries.map((entry, i) => (
          <section
            key={i}
            ref={el => { entryRefs.current[i] = el }}
            data-idx={String(i)}
            aria-labelledby={`entry-title-${i}`}
            style={{ marginBottom: '90px', position: 'relative' }}
          >
            {(i === 0 || entry.city !== entries[i - 1].city) && (
              <PassportStamp city={entry.city} idx={i} />
            )}
            {/* Entry meta */}
            <div style={{ ...MONO, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9E1B32', display: 'flex', gap: '14px', alignItems: 'baseline', marginBottom: '10px' }}>
              <span>Entry {String(i + 1).padStart(2, '0')}</span>
              <span style={{ color: '#E2CFA8' }}>/</span>
              <span style={{ color: '#0B1F3A' }}>{entry.city}</span>
            </div>

            <h3 id={`entry-title-${i}`} style={{ ...DISPLAY, fontWeight: 600, fontSize: 'clamp(28px,4vw,38px)', margin: '0 0 22px 0', color: '#0B1F3A', textWrap: 'balance' }}>
              {entry.title}
            </h3>

            {/* Float-left photo */}
            <PhotoSlot
              src={entry.photoA}
              width="260px"
              height="190px"
              caption={entry.captionA}
              rotation={i % 2 === 0 ? -tilt : tilt}
              style={{ float: 'left', width: '260px', margin: '4px 28px 14px 0' }}
            />

            {entry.paragraphs.map((text, p) => (
              <div key={p}>
                {/* Float-right photo injected before paragraph 2 */}
                {p === 2 && (
                  <PhotoSlot
                    src={entry.photoB}
                    width="230px"
                    height="290px"
                    caption={entry.captionB}
                    rotation={i % 2 === 0 ? tilt : -tilt}
                    style={{ float: 'right', width: '230px', margin: '10px 0 14px 28px' }}
                  />
                )}
                <p style={{ fontSize: '17px', lineHeight: 1.75, color: '#14304F', margin: '0 0 18px 0', textWrap: 'pretty' }}>{text}</p>
              </div>
            ))}

            <div style={{ clear: 'both' }} />
            {i < entries.length - 1 && <TornPaper variant={i} />}
          </section>
        ))}
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ borderTop: '1px solid #E2CFA8', padding: '80px 8% 80px 8%', textAlign: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '32px', right: '32px',
          padding: '8px 12px', border: '1.5px dashed rgba(158,27,50,0.55)',
          transform: 'rotate(5deg)', pointerEvents: 'none',
        }}>
          <div style={{ ...MONO, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E1B32', opacity: 0.65, textAlign: 'center', lineHeight: 1.8 }}>
            PORTUGAL<br />· 2026 ·
          </div>
        </div>
        <div style={{ ...MONO, fontSize: '13px', color: '#9E1B32', opacity: 0.35, letterSpacing: '0.3em', marginBottom: '28px' }}>
          ✦&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;✦
        </div>
        <div style={{ ...DISPLAY, fontStyle: 'italic', fontSize: '24px', color: '#9E1B32' }}>
          Obrigado, Portugal.
        </div>
        <div style={{ ...MONO, fontSize: '11px', color: '#14304F', opacity: 0.6, marginTop: '12px' }}>
          UA MIS Portugal 2026 · Evan's personal page
        </div>
        <Link
          to="/"
          style={{ display: 'inline-block', marginTop: '24px', ...MONO, fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9E1B32', textDecoration: 'none', border: '1px solid rgba(158,27,50,0.3)', borderRadius: '9999px', padding: '8px 16px', transition: 'border-color 0.2s ease, background 0.2s ease' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(158,27,50,0.06)'; e.currentTarget.style.borderColor = 'rgba(158,27,50,0.6)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(158,27,50,0.3)' }}
        >
          ← Back to the cohort
        </Link>
      </footer>
    </main>
  )
}

export default EvanPatterson
