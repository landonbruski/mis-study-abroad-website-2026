import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const P = '/students/olivia-allen/pics'
const S = '/students/olivia-allen/stickers'
const V = '/students/olivia-allen/vids'
const MUSIC = '/students/olivia-allen/music/trace-me-onto-you.mp3'

/** Preset widths — fillers stay delicate; heroes read as real paper accents */
const STICKER_W = {
  filler: 72,
  doodle: 105,
  accent: 145,
  feature: 185,
  hero: 220,
}

/**
 * Hand-pasted sticker.
 * - size: filler | doodle | accent | feature | hero | number(px)
 * - layer: pin (on scrap corners) | gutter (page margins / white space)
 * Stickers may kiss torn edges; never bury captions or faces.
 */
function Sticker({
  name,
  size = 'accent',
  w,
  rotate = 0,
  flip = false,
  opacity = 0.95,
  layer = 'pin',
  className = '',
  style = {},
}) {
  const file =
    name === "don't-panic"
      ? 'don_t-panic-removebg-preview.png'
      : name === 'bang' || name === 'primary-eyes' || name === '3-discs'
        ? `${name}.png`
        : name === 'star-ladybug'
          ? 'Star_Ladybug_Sticker-removebg-preview.png'
          : name === 'converse'
            ? 'converse.png'
            : `${name}-removebg-preview.png`
  const width = w ?? (typeof size === 'number' ? size : STICKER_W[size] ?? STICKER_W.accent)
  const sizeKey = w ? 'custom' : typeof size === 'string' ? size : 'custom'

  return (
    <img
      src={`${S}/${file}`}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={[
        'oa-sticker',
        `oa-sticker--${sizeKey}`,
        layer === 'gutter' ? 'oa-sticker--gutter' : 'oa-sticker--pin',
        className,
      ].join(' ')}
      style={{
        width,
        opacity,
        transform: `rotate(${rotate}deg)${flip ? ' scaleX(-1)' : ''}`,
        ...style,
      }}
    />
  )
}

/** Locked End of Road still uses Deco({ w, ... }) */
function Deco(props) {
  return <Sticker {...props} />
}

/**
 * Top garland border.
 * Asset cord runs ~30° TL→BR with stars hanging "down" in the PNG.
 * rotate ≈ -30° flattens the cord so it reads as a top edge; stars dangle into the page.
 */
function StarLightBorder() {
  const strands = [
    { left: '-2%', top: -10, rotate: -30, w: 320 },
    { left: '14%', top: -4, rotate: -28, w: 330 },
    { left: '30%', top: 2, rotate: -31, w: 320 },
    { left: '46%', top: 4, rotate: -29, w: 330 },
    { left: '62%', top: 0, rotate: -32, w: 320 },
    { left: '78%', top: -6, rotate: -28, w: 310 },
    { left: '90%', top: -10, rotate: -30, w: 280 },
  ]

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-[40] hidden h-28 overflow-visible md:block"
      aria-hidden="true"
    >
      {strands.map((s, i) => (
        <img
          key={i}
          src={`${S}/string-star-lights-removebg-preview.png`}
          alt=""
          draggable={false}
          className="absolute select-none"
          style={{
            left: s.left,
            top: s.top,
            width: s.w,
            height: 'auto',
            opacity: 0.92,
            transform: `rotate(${s.rotate}deg)`,
            transformOrigin: 'left center',
            filter: 'drop-shadow(2px 3px 4px rgba(0, 0, 0, 0.15))',
          }}
        />
      ))}
    </div>
  )
}

/** Uniform scrap tile — children stickers pin to corners/edges only */
function UniformPic({ src, alt, className = '', children }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`oa-scrap relative w-full ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="relative z-10 h-auto w-full select-none"
        style={{ filter: 'drop-shadow(0 8px 16px rgba(40, 30, 20, 0.22))' }}
        draggable={false}
      />
      {children}
    </motion.figure>
  )
}

function Scrap({ src, alt, className = '', style = {}, children }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`oa-scrap absolute ${className}`}
      style={style}
    >
      <img
        src={src}
        alt={alt}
        className="relative z-10 h-auto w-full select-none"
        style={{ filter: 'drop-shadow(0 10px 20px rgba(40, 30, 20, 0.24))' }}
        draggable={false}
      />
      {children}
    </motion.figure>
  )
}

function SectionLabel({ kicker, title, tone = 'rust', children }) {
  return (
    <div className="oa-section-label relative z-20 mb-2">
      <span
        className="mb-1 block text-xs font-mono"
        style={{ color: tone === 'slate' ? 'var(--oa-slate)' : 'var(--oa-rust)' }}
      >
        {kicker}
      </span>
      <h2 className="font-typewriter text-2xl font-bold uppercase tracking-tight md:text-3xl">{title}</h2>
      {children}
    </div>
  )
}

/** Torn-paper journal note — fills white space like a taped scrap of writing */
function JournalNote({
  kicker,
  children,
  rotate = -2,
  tone = 'cream',
  className = '',
}) {
  const bg =
    tone === 'blush'
      ? 'rgba(232, 210, 190, 0.95)'
      : tone === 'slate'
        ? 'rgba(220, 228, 232, 0.92)'
        : 'rgba(244, 239, 230, 0.96)'

  return (
    <motion.aside
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`oa-note relative z-20 max-w-sm ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="oa-note-tape" aria-hidden="true" />
      <div className="oa-note-paper px-4 py-3 md:px-5 md:py-4" style={{ backgroundColor: bg }}>
        {kicker ? (
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--oa-rust)' }}>
            {kicker}
          </p>
        ) : null}
        <div className="font-mono text-sm leading-relaxed text-pretty md:text-[15px]" style={{ color: 'var(--oa-ink)' }}>
          {children}
        </div>
      </div>
    </motion.aside>
  )
}

/** Empty margin scrap — intentionally clipped by page overflow for a cut-off paper look */
function MarginScrap({
  side = 'left',
  rotate = -3,
  tone = 'cream',
  tall = false,
  className = '',
}) {
  const bg =
    tone === 'blush'
      ? 'rgba(232, 210, 190, 0.95)'
      : tone === 'slate'
        ? 'rgba(220, 228, 232, 0.92)'
        : 'rgba(244, 239, 230, 0.96)'

  const sideStyle =
    side === 'left'
      ? { left: 0, transform: `translateX(-48%) rotate(${rotate}deg)` }
      : { right: 0, transform: `translateX(48%) rotate(${rotate}deg)` }

  return (
    <div
      aria-hidden="true"
      className={`oa-note pointer-events-none absolute z-[12] hidden w-[210px] md:block ${className}`}
      style={sideStyle}
    >
      <div className="oa-note-tape" />
      <div
        className={`oa-note-paper px-4 ${tall ? 'h-40' : 'h-28'} py-3`}
        style={{ backgroundColor: bg }}
      >
        <div className="space-y-2.5 opacity-20">
          <div className="h-1.5 w-[78%] rounded-sm bg-[var(--oa-ink)]" />
          <div className="h-1.5 w-[62%] rounded-sm bg-[var(--oa-ink)]" />
          <div className="h-1.5 w-[70%] rounded-sm bg-[var(--oa-ink)]" />
          {tall ? (
            <>
              <div className="h-1.5 w-[55%] rounded-sm bg-[var(--oa-ink)]" />
              <div className="h-1.5 w-[66%] rounded-sm bg-[var(--oa-ink)]" />
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export function OliviaAllen() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.4
    // Try to start on load (works if navigation click still counts as a gesture)
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    const prevBg = document.body.style.background
    document.body.style.background = '#cbb08e'
    return () => {
      audio.pause()
      document.body.style.background = prevBg
    }
  }, [])

  async function toggleMusic() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }
    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }

  return (
    <div
      className="oa-journal relative flex min-h-screen w-full max-w-[100vw] flex-col pb-24 font-mono selection:bg-[#a85a45] selection:text-[#f4efe6]"
      style={{
        backgroundColor: '#cbb08e',
        backgroundImage:
          'radial-gradient(ellipse at 18% 8%, rgba(255, 236, 200, 0.32), transparent 52%), radial-gradient(ellipse at 85% 95%, rgba(100, 65, 35, 0.11), transparent 48%)',
        color: '#2a241e',
      }}
    >
      <style>{`
        .oa-journal {
          --oa-ink: #2a241e;
          --oa-rust: #a85a45;
          --oa-slate: #3f5f74;
          /* clip (not hidden) — avoids a second vertical scrollbar from overflow-x */
          overflow-x: clip;
          overflow-y: visible;
        }
        .oa-journal .font-typewriter {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          letter-spacing: -0.02em;
        }

        /* ——— sticker system ——— */
        .oa-sticker {
          pointer-events: none;
          position: absolute;
          height: auto;
          user-select: none;
          filter: drop-shadow(2px 3px 4px rgba(0, 0, 0, 0.15));
        }
        /* pins sit above scrap art but only at edges */
        .oa-sticker--pin { z-index: 30; }
        /* gutters fill page white-space — above bg, may peek into column gaps */
        .oa-sticker--gutter { z-index: 20; }
        .oa-scrap { isolation: isolate; }

        /* corner pin helpers — kiss the torn edge, clear of handwriting */
        .oa-pin-tl { top: -0.6rem; left: -1.6rem; }
        .oa-pin-tr { top: -0.6rem; right: -1.6rem; }
        .oa-pin-bl { bottom: -0.4rem; left: -1.6rem; }
        .oa-pin-br { bottom: -0.4rem; right: -1.6rem; }
        .oa-pin-tl-out { top: -0.85rem; left: -2.4rem; }
        .oa-pin-tr-out { top: -0.85rem; right: -2.4rem; }
        .oa-pin-bl-out { bottom: -0.6rem; left: -2.6rem; }
        .oa-pin-br-out { bottom: -0.6rem; right: -2.4rem; }
        .oa-pin-under { left: 10%; bottom: -2.1rem; }
        .oa-pin-above { left: 12%; top: -1.6rem; }

        /* page gutters */
        .oa-gutter-l { left: -1.75rem; }
        .oa-gutter-r { right: -1.75rem; }
        .oa-gutter-l-far { left: -2.25rem; }
        .oa-gutter-r-far { right: -2.25rem; }

        /* journal notes — taped scrap of paper */
        .oa-note-paper {
          border: 1px solid rgba(42, 36, 30, 0.12);
          box-shadow:
            2px 3px 0 rgba(42, 36, 30, 0.06),
            0 10px 22px -12px rgba(40, 30, 20, 0.35);
        }
        .oa-note-tape {
          position: absolute;
          top: -10px;
          left: 50%;
          z-index: 2;
          width: 72px;
          height: 18px;
          margin-left: -36px;
          background: linear-gradient(
            180deg,
            rgba(168, 90, 69, 0.35),
            rgba(168, 90, 69, 0.22)
          );
          border: 1px solid rgba(42, 36, 30, 0.1);
          transform: rotate(-2deg);
          box-shadow: 0 1px 2px rgba(40, 30, 20, 0.15);
        }
      `}</style>

      <audio ref={audioRef} src={MUSIC} loop preload="auto" />

      <button
        type="button"
        onClick={toggleMusic}
        aria-pressed={playing}
        aria-label={playing ? 'Pause Trace Me Onto You' : 'Play Trace Me Onto You'}
        className="fixed bottom-6 right-6 z-50 border border-[#2a241e]/40 bg-[#2a241e] px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#f4efe6] shadow-md transition-colors hover:border-[#a85a45] hover:text-[#a85a45]"
      >
        {playing ? '♪ Playing' : '▶ Play'} // Title Fight — Trace Me Onto You
      </button>

      {/* cut-off paper scraps in the page margins */}
      <MarginScrap side="left" rotate={-5} tone="cream" className="top-[18%]" />
      <MarginScrap side="right" rotate={4} tone="blush" className="top-[28%]" />
      <MarginScrap side="left" rotate={3} tone="slate" tall className="top-[42%]" />
      <MarginScrap side="right" rotate={-6} tone="cream" className="top-[52%]" />
      <MarginScrap side="left" rotate={-2} tone="blush" className="top-[64%]" />
      <MarginScrap side="right" rotate={5} tone="slate" tall className="top-[72%]" />
      <MarginScrap side="left" rotate={4} tone="cream" className="top-[84%]" />
      <MarginScrap side="right" rotate={-3} tone="blush" className="top-[92%]" />

      {/* --- HERO (music later) --- */}
      <header className="relative overflow-x-clip pt-24 pb-6 md:pt-28 md:pb-8">
        <StarLightBorder />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 md:flex-row md:items-start md:justify-between md:gap-6 md:px-8">
          <div className="max-w-3xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em]" style={{ color: 'var(--oa-slate)' }}>
              [ PORTUGAL SUMMER JOURNAL // 2026 ]
            </span>
            <h1 className="mt-3 font-typewriter text-5xl font-bold uppercase tracking-tighter md:text-7xl">
              Olivia Allen
            </h1>
            <p
              className="mt-4 max-w-lg border-l-2 pl-4 font-mono text-base leading-relaxed text-pretty italic"
              style={{ color: 'rgba(42, 36, 30, 0.78)', borderColor: 'var(--oa-rust)' }}
            >
              &ldquo;Torn paper, taped photos, and whatever made it into the journal.&rdquo;
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 border border-[#2a241e]/30 bg-[#f4efe6]/25 px-5 py-2 text-xs uppercase tracking-widest transition-colors hover:border-[#a85a45] hover:text-[#a85a45]"
              >
                &larr; Back to Main
              </Link>
              <span
                className="inline-flex items-center px-3 py-2 text-[10px] font-bold uppercase tracking-widest"
                style={{ backgroundColor: 'rgba(63, 95, 116, 0.12)', color: 'var(--oa-slate)' }}
              >
                Porto &middot; Lisbon
              </span>
            </div>
          </div>

          <div className="relative mt-16 ml-auto w-[300px] shrink-0 sm:mt-24 sm:w-[380px] md:mt-28 md:w-[440px]">
            <video
              className="w-full rotate-2 select-none"
              src={`${V}/cute-vid.mp4`}
              autoPlay
              muted
              loop
              playsInline
              aria-label="Cute vid"
            />
            <Sticker name="converse" size="feature" rotate={-8} className="-right-16 -bottom-10" />
          </div>
        </div>

        {/* big gutter stickers in hero white space */}
        <Sticker layer="gutter" name="cute-little-bunny" size={300} rotate={-8} className="left-[8%] top-[43%] hidden md:block" />
        <Sticker layer="gutter" name="brown-butterfly" size={280} rotate={-100} className="left-[38%] bottom-2 hidden lg:block" />
        <Sticker layer="gutter" name="trangular-stamp" size={300} rotate={6} className="left-[38%] -bottom-80 hidden lg:block" />
        <Sticker layer="gutter" name="yellow-star-doodle" size={260} rotate={-14} className="right-[8%] top-[18%] hidden md:block" />
      </header>

      {/* ========== JOURNAL SPREADS ========== */}
      <div className="mx-auto w-full max-w-7xl px-3 pb-6 sm:px-5 md:px-6">

        {/* ========== SPREAD 1: scenery ========== */}
        <section className="relative mb-5 px-1 sm:px-2 md:mb-6">
          <SectionLabel kicker="// VISUAL DIARY" title="Scenery & Space" />
          <Sticker name="music-disc" size="feature" rotate={-8} className="-left-4 -top-52 hidden sm:block md:-left-10 lg:-left-16" />

          <JournalNote kicker="field note // porto → lisbon" rotate={-2} className="mt-2 mb-1 sm:ml-2">
            So so much walking but equally worth it. The scenery was different from anything
            I had ever seen. Although I will say this trip made me scared the phrase "lets go up this hill"
          </JournalNote>

          <div className="relative z-10 mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-4">
            <UniformPic src={`${P}/spiritual-pressure-removebg-preview.png`} alt="Who's spiritual pressure is this??">
              <Sticker name="bw-eyeball" size={240} rotate={-6} className="-right-14 top-[28%] hidden sm:block" />
              <Sticker name="yellow-crescent-moon" size="hero" rotate={-12} className="-left-8 -bottom-6" />
              <Sticker name="bw-star" size="doodle" rotate={10} className="oa-pin-tl" />
            </UniformPic>
            <UniformPic src={`${P}/pena-palace-removebg-preview.png`} alt="Pena Palace — was very mystical">
              <Sticker name="bw-flower" size="accent" rotate={8} className="oa-pin-tr" />
              <Sticker name="eyes-in-star" size="feature" rotate={-8} className="-left-72 -bottom-2" />
              <Sticker name="bw-shooting-star" size={320} rotate={18} className="left-[28%] -top-64" />
            </UniformPic>
            <UniformPic src={`${P}/geronimos-monastary-removebg-preview.png`} alt="Jerónimos Monastery">
              <Sticker name="emphasis" size="hero" rotate={0} className="oa-pin-tl" />
              <Sticker name="vintage-eye" size="hero" rotate={-8} className="-left-14 -bottom-16" />
              <Sticker name="bw-star" size="doodle" rotate={12} className="oa-pin-tr" />
              <Sticker name="star-ladybug" size="feature" rotate={25} className="oa-pin-br" />
            </UniformPic>
            <UniformPic src={`${P}/up-high-removebg-preview.png`} alt="Up high in Porto">
              <Sticker name="funky-fish" size="feature" rotate={-10} flip className="oa-pin-br" />
              <Sticker name="shooting-star" size="feature" rotate={18} className="-right-16 -top-4" />
            </UniformPic>
          </div>

          <Sticker layer="gutter" name="bw-flower" size={280} rotate={-10} className="-right-2 top-[18%] hidden lg:block" />
          <Sticker layer="gutter" name="travel-stamp" size={300} rotate={14} className="left-[48%] top-[22%] hidden xl:block" />

          <JournalNote kicker="Monks and Monastaries" rotate={-2} className="my-3 sm:ml-8">
            Geronimos was so beautiful! We were able to get such good pictures. I will admit
            I was never super comfortable on camera, but I think I really stepped out of my shell
            in portugal.
          </JournalNote>

          <Sticker layer="gutter" name="bw-star-x5" size={300} rotate={180} className="-left-40 top-[40%] hidden md:block" />
          <Sticker layer="gutter" name="eyes-in-star" size={280} rotate={10} className="right-4 top-[40%] hidden lg:block" />
          <Sticker layer="gutter" name="funky-fish" size={300} rotate={-12} className="left-[42%] top-[72%] hidden xl:block" />

          <div className="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-4">
            <UniformPic src={`${P}/FDF3DB04-6DBA-49B2-B47E-75BB785B47F7-removebg-preview.png`} alt="Church of Saint Anthony">
              <Sticker name="brown-butterfly" size="hero" rotate={-8} className="oa-pin-bl" />
              <Sticker name="yellow-crescent-moon" size="hero" rotate={14} flip className="-right-40 -bottom-44" />
              <Sticker name="bw-star-doodle" size={280} rotate={-10} className="-right-12 -top-32" />
            </UniformPic>
            <div className="relative flex items-center justify-center sm:justify-start">
              <Sticker name="music-disc" size={220} rotate={10} className="left-[5%] -top-16" />
              <JournalNote kicker="Up in the Palace" rotate={3} tone="blush">
                Pena Palace was unreal fog really brought out a such a mysterious and magical vibe.
                Got great photos here! 
              </JournalNote>
              <Sticker layer="gutter" name="don't-panic" size={300} rotate={8} className="right-0 bottom-0 hidden sm:block" />
              <Sticker layer="gutter" name="bw-shooting-star" size={260} rotate={55} className="left-[50%] top-[80%] hidden md:block" />
            </div>
            <UniformPic src={`${P}/pics-im-proud-of-removebg-preview.png`} alt="Pics I'm lowkey proud I took">
              <Sticker name="blue-exclamatioin" size={300} rotate={-25} className="-left-40 top-[30%]" />
              <Sticker name="vintage-eye" size="hero" rotate={10} className="left-[20%] -bottom-28" />
              <Sticker name="yellow-double-emphasis" size="accent" rotate={14} className="oa-pin-tr" />
              <Sticker name="bw-star" size="filler" rotate={-8} className="oa-pin-tl" />
            </UniformPic>
            <div className="relative flex min-h-full flex-col items-center justify-end gap-3 pb-2 sm:items-end">
              <div className="relative z-30 mb-10 sm:mb-14">
                <video
                  className="w-[260px] rotate-3 select-none sm:w-[320px]"
                  src={`${V}/eye-conography.mp4`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label="Eye-conography clip"
                />
                <Sticker
                  name="three-bw-eyes"
                  size="feature"
                  rotate={8}
                  className="-right-28 top-[20%]"
                />
              </div>
              <div className="relative">
                <JournalNote kicker="I see you!" rotate={-3} tone="slate">
                  Portugal had this weird theme of eyes every where. From advertisements, street
                  art, and even some waiters tattoo. Once you notice them theyre everywhere!
                </JournalNote>
                <Sticker name="3-discs" size={300} rotate={-20} className="-left-28 -bottom-72" />
                <Sticker name="star-ladybug" size="feature" rotate={-35} className="-right-28 -bottom-44" />
              </div>
            </div>
            <UniformPic
              src={`${P}/photography-team-removebg-preview.png`}
              alt="My team of photographers"
              className="sm:col-span-2 sm:mx-auto sm:max-w-4xl"
            >
              <Sticker name="yellow-star-doodle" size="accent" rotate={8} className="right-[20%] top-[26%]" />
              <Sticker name="yellow-star-doodle" size="accent" rotate={-7} className="left-[22%] bottom-[14%]" />
              <Sticker name="man-peeking-thru-wall" size={340} rotate={0} className="-right-[14rem] -bottom-[260px]" />
              <Sticker name="travel-stamp" size={300} rotate={8} className="-right-24 top-[30%]" />
            </UniformPic>
          </div>

          <Sticker layer="gutter" name="bw-star-doodle" size={320} rotate={8} className="left-[6%] -bottom-4 hidden md:block" />
          <Sticker layer="gutter" name="three-bw-eyes" size={300} rotate={-6} className="-left-10 bottom-64 hidden lg:block" />
          <Sticker layer="gutter" name="bw-star-doodle" size={400} rotate={192} className="left-[26%] bottom-[38rem] hidden lg:block" />
        </section>

        {/* ========== SPREAD 2: the folks ========== */}
        <section className="relative mb-5 px-1 sm:px-2 md:mb-6">
          <Sticker name="music-disc" size="feature" rotate={-12} className="-left-4 -top-44 hidden sm:block md:-left-10 lg:-left-16" />
          <SectionLabel kicker="// CAST" title="The Folks" tone="slate" />

          <JournalNote kicker="Friends" rotate={2} tone="blush" className="mt-2 mb-1 sm:ml-2">
            The trip was the cities, but mostly it was these people.
            Thanks for hanging out and keeping me company. Couldn't have asked
            for cooler people. 
          </JournalNote>

          <div className="relative z-10 mt-3 grid grid-cols-1 items-start gap-3 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-4">
            <UniformPic src={`${P}/the-folks-removebg-preview.png`} alt="THE FOLKS!!!!!">
              <Sticker name="yellow-star-doodle" size={380} rotate={-8} className="-left-20 -bottom-72" />
              <Sticker name="blue-exclamatioin" size="feature" rotate={-8} className="-left-20 top-[-8%]" />
              <Sticker name="blue-exclamatioin" size="feature" rotate={12} className="-left-24 top-[16%]" />
              <Sticker name="blue-exclamatioin" size="feature" rotate={-4} flip className="-left-20 top-[42%]" />
              <Sticker name="blue-exclamatioin" size="feature" rotate={10} className="-right-16 top-[-6%]" />
              <Sticker name="blue-exclamatioin" size="feature" rotate={-12} flip className="-right-20 top-[18%]" />
              <Sticker name="blue-exclamatioin" size="feature" rotate={6} className="-right-16 top-[44%]" />
            </UniformPic>
            <UniformPic src={`${P}/cami-tami-olivia-removebg-preview.png`} alt="Cami, Tami and Olivia">
              <Sticker name="bw-flower" size={280} rotate={-8} className="left-[25%] -bottom-28" />
              <Sticker name="cute-little-bunny" size="hero" rotate={10} className="oa-pin-tr-out" />
              <Sticker name="bang" size={240} rotate={-14} className="-left-28 -top-80" />
              <Sticker name="bw-star" size={280} rotate={-12} className="left-[8%] -top-28" />
              <Sticker name="bw-star-x5" size={320} rotate={0} className="-right-40 top-[30%]" />
            </UniformPic>
          </div>

          <JournalNote kicker="cami + tami" rotate={3} className="my-3 sm:mx-auto">
            Special thanks to Cami and Tami for capturing every moment of the trip! 
            Even when I was camera shy.
          </JournalNote>

          <Sticker
            layer="gutter"
            name="shooting-star"
            size="feature"
            rotate={-20}
            className="left-2 top-[62%] hidden md:block"
          />
          <Sticker
            layer="gutter"
            name="trangular-stamp"
            size="feature"
            rotate={8}
            className="right-2 top-[70%] hidden md:block"
          />

          <div className="relative z-10 grid grid-cols-1 items-start gap-3 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-4">
            <UniformPic
              src={`${P}/chic-lady-removebg-preview.png`}
              alt="Lady in the subway who was just so chic"
              className="sm:-mt-1"
            >
              <Sticker name="3-discs" size={280} rotate={-8} className="-left-28 top-4" />
              <Sticker name="blue-exclamatioin" size="accent" rotate={12} className="oa-pin-tr" />
            </UniformPic>
            <UniformPic src={`${P}/tami-enough-removebg-preview.png`} alt="TAMI ENOUGHH">
              <Sticker name="brown-butterfly" size="hero" rotate={8} flip className="left-[20%] -bottom-28" />
              <Sticker name="bw-star-doodle" size={280} rotate={12} className="right-[5%] -bottom-14" />
              <Sticker name="lightning-hands" size="feature" rotate={-8} className="oa-pin-tr-out" />
            </UniformPic>
          </div>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-6">
            <div className="relative">
              <JournalNote kicker="side character of the day" rotate={-2}>
                Saw so many absolute characters in portugual. I wish 
                I had captured them all. The woman in yellow is my favorite.
              </JournalNote>
              <Sticker name="converse" size="feature" rotate={8} className="-right-14 -top-48" />
            </div>
            <div className="relative">
              <JournalNote kicker="Chef Olivia" rotate={2} tone="blush">
                Being a chef was fun... Well it was fun before we ate the food TToTT
              </JournalNote>
              <Sticker name="funky-fish" size={260} rotate={-10} flip className="-left-72 -bottom-12" />
            </div>
          </div>
        </section>

        {/* ========== SPREAD 3: bites & bits ========== */}
        <section className="relative mb-5 px-1 sm:px-2 md:mb-6">
          <SectionLabel kicker="// DETOURS" title="Bites & Bits" />

          <JournalNote kicker="eat everything" rotate={2} tone="blush" className="mt-2 mb-1 sm:ml-4">
            Rule of the trip: try every piri-piri sauce. Also accept that not every food adventure ends well.
          </JournalNote>

          <div className="relative z-10 mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-4">
            <UniformPic src={`${P}/fav-food-removebg-preview.png`} alt="Some of my favs — try every piri-piri sauce">
              <Sticker name="bw-flower" size="feature" rotate={-8} className="oa-pin-tl-out" />
              <Sticker name="bw-star" size="doodle" rotate={14} className="oa-pin-tr" />
              <Sticker name="yellow-double-emphasis" size="accent" rotate={10} className="oa-pin-br" />
              <Sticker name="primary-eyes" size={320} rotate={-6} className="-left-28 -bottom-72" />
            </UniformPic>
            <UniformPic src={`${P}/food-poisoning-removebg-preview.png`} alt="Moments before disaster ifykyk">
              <Sticker name="funky-fish" size="hero" rotate={12} flip className="-left-20 -bottom-10" />
              <Sticker name="don't-panic" size="hero" rotate={-6} className="oa-pin-tl" />
              <Sticker name="travel-stamp" size={300} rotate={-10} className="right-[10%] -top-28" />
            </UniformPic>
          </div>

          <JournalNote kicker="free day" rotate={-3} tone="slate" className="my-3 sm:ml-auto sm:mr-6">
           Spent my free day with Donovan! Went to the aquarium. It was actually 
           bigger and nicer than I thought. I loved all the super up close moments you could have with the sharks.
          </JournalNote>

          <Sticker
            layer="gutter"
            name="cute-little-bunny"
            size="feature"
            rotate={-8}
            className="left-4 top-[48%] hidden md:block"
          />

          <div className="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-4">
            <UniformPic src={`${P}/aquarium-removebg-preview.png`} alt="Aquarium free day with Donovan!">
              <Sticker name="bw-flower" size="hero" rotate={-7} className="-left-24 top-[30%]" />
              <Sticker name="funky-fish" size="feature" rotate={8} className="oa-pin-br-out" />
              <Sticker name="bw-star" size="filler" rotate={-10} className="oa-pin-tr" />
            </UniformPic>
            <UniformPic src={`${P}/looking-funny-removebg-preview.png`} alt="He was looking at me funny">
              <Sticker name="bw-eyeball" size="accent" rotate={8} className="oa-pin-br" />
              <Sticker name="blue-exclamatioin" size="accent" rotate={-8} className="oa-pin-tr" />
              <Sticker name="yellow-star-doodle" size="accent" rotate={12} className="oa-pin-tl" />
            </UniformPic>
            <UniformPic src={`${P}/silly-guy-removebg-preview.png`} alt="Silly guy has places to be!!">
              <Sticker name="blue-exclamatioin" size="accent" rotate={14} className="oa-pin-tr" />
              <Sticker name="emphasis" size="accent" rotate={0} className="oa-pin-br" />
              <Sticker name="lightning-hands" size={300} rotate={-8} className="-left-10 -bottom-52" />
            </UniformPic>
            <UniformPic src={`${P}/fire-removebg-preview.png`} alt="Benfica Stadium tour/game — it was fire">
              <Sticker name="travel-stamp" size={300} rotate={12} className="-right-12 -bottom-24" />
              <Sticker name="yellow-double-emphasis" size="accent" rotate={-12} className="oa-pin-tr" />
            </UniformPic>
          </div>

          <JournalNote kicker="benfica night" rotate={2} tone="blush" className="my-3 sm:mx-auto">
            Stadium tour + game. It was super cool for the first half. Then we almost got set on fire.
            This night definitly turned me in a lifelong SC Braga fan!
          </JournalNote>

          <div className="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-4">
            <UniformPic src={`${P}/fav-art-removebg-preview.png`} alt="Favorite street art">
              <Sticker name="funky-fish" size={260} rotate={-8} className="oa-pin-bl" />
              <Sticker name="emphasis" size="hero" rotate={-14} className="-left-2 -top-4" />
              <Sticker name="emphasis" size="hero" rotate={16} flip className="-right-2 -top-4" />
            </UniformPic>
            <div className="relative flex flex-col items-start justify-center gap-2">
              <JournalNote kicker="street art" rotate={-3} tone="slate">
                Portugal is just overflowing art. From the street art tour these were
                3 of my fav pieces. Absolutely gorgeous.
              </JournalNote>
              <Sticker layer="gutter" name="primary-eyes" size={340} rotate={8} className="-right-28 top-0 hidden sm:block" />
              <div className="relative h-24 w-full">
                <Sticker name="yellow-star-doodle" size={180} rotate={10} className="left-[10%] top-0" />
              </div>
            </div>
          </div>

          <div className="relative mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <JournalNote kicker="weather" rotate={2}>
              It was soooo cold. Guess who only packed tanks tops and not a single sweater? 
              Nevertheless I perservered!!
            </JournalNote>
            <Sticker layer="gutter" name="bang" size={300} rotate={-8} className="left-1/2 -top-44 hidden -translate-x-1/2 sm:block" />
            <div className="relative">
              <JournalNote kicker="pigeons of portugal" rotate={-2} tone="blush">
                The pigeons there are the cutest things ever. I couldn't
                help but snap 80 million pics everytime I saw one.
              </JournalNote>
              <Sticker name="converse" size="feature" rotate={-6} className="left-[20%] -bottom-56" />
            </div>
          </div>
        </section>

        {/* ========== SPREAD 4: end of the road ========== */}
        <section className="relative mb-2">
          <SectionLabel kicker="// EXIT MUSIC" title="End of the Road" tone="slate" />

          <JournalNote kicker="goodbye" rotate={-2} tone="blush" className="mt-2 mb-2 max-w-md sm:ml-2">
            Farewell dinner was my favorite night. It felt like the end of a sitcom. Jeff even took
            pics with us. I'll treasure this summer forever.
          </JournalNote>

          <Sticker layer="gutter" name="funky-fish" size={280} rotate={10} flip className="left-[42%] top-16 hidden lg:block" />

          <div className="flex flex-col gap-4 pt-2 md:hidden">
            <div className="relative mx-auto w-[94%]">
              <img src={`${P}/farewell-dinner-removebg-preview.png`} alt="farewell dinner" className="-rotate-1 drop-shadow-lg" />
              <Sticker name="bw-flower" size="hero" rotate={-8} className="oa-pin-bl" />
              <Sticker name="bw-star-doodle" size="hero" rotate={-12} className="-left-16 top-[15%]" />
              <Sticker name="yellow-crescent-moon" size="accent" rotate={10} flip className="-right-10 bottom-[10%]" />
            </div>
            <div className="relative mx-auto w-[75%]">
              <img src={`${P}/20-piece-mango-habanero-removebg-preview.png`} alt="mango habanero" className="rotate-2 drop-shadow-lg" />
              <Sticker name="brown-butterfly" size="accent" rotate={10} className="oa-pin-br" />
              <Sticker name="emphasis" size={260} rotate={48} className="-right-28 -top-28" />
            </div>
          </div>

          <div className="relative mx-auto mt-1 hidden h-[460px] md:block lg:h-[500px]">
            <Scrap
              src={`${P}/farewell-dinner-removebg-preview.png`}
              alt="Farewell dinner"
              className="left-[2%] top-0 z-[12] w-[58%] -rotate-1"
            >
              <Sticker name="bw-flower" size="hero" rotate={-8} className="oa-pin-bl" />
              <Sticker name="bw-star-doodle" size={300} rotate={-12} className="-left-48 top-[18%]" />
              <Sticker name="yellow-crescent-moon" size="accent" rotate={10} flip className="-right-10 bottom-[10%]" />
            </Scrap>
            <Scrap
              src={`${P}/20-piece-mango-habanero-removebg-preview.png`}
              alt="First meal back stateside"
              className="right-[3%] top-[10%] z-[14] w-[34%] rotate-2"
            >
              <Sticker name="brown-butterfly" size="accent" rotate={10} className="oa-pin-br" />
              <Sticker name="emphasis" size={260} rotate={48} className="-right-28 -top-28" />
            </Scrap>
            <Sticker name="bw-star" size="doodle" rotate={14} className="right-[42%] top-[8%]" />
            <JournalNote
              kicker="stateside"
              rotate={4}
              tone="slate"
              className="absolute bottom-4 right-[38%] z-20 max-w-[220px]"
            >
              First meal back. Mango habanero. No notes. Just vibes.
            </JournalNote>
          </div>
        </section>
      </div>

      <footer className="relative mt-auto border-t border-[#2a241e]/15 py-10" style={{ backgroundColor: '#cbb08e' }}>
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <p className="font-typewriter text-xl font-bold uppercase tracking-wider" style={{ color: 'var(--oa-rust)' }}>
            End of Record.
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest opacity-60">
            Trace Me Onto You &bull; Summer 2026
          </p>
        </div>
      </footer>
    </div>
  )
}

export default OliviaAllen
