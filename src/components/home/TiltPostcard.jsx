import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'

const imageUrl =
  'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80'

export function TiltPostcard() {
  const [flipped, setFlipped] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), {
    stiffness: 160,
    damping: 18,
  })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), {
    stiffness: 160,
    damping: 18,
  })
  const glareX = useTransform(mx, [-0.5, 0.5], ['10%', '90%'])
  const glareY = useTransform(my, [-0.5, 0.5], ['10%', '90%'])

  function onMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    mx.set(px)
    my.set(py)
  }
  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <div className="flex h-full items-center justify-center">
      <motion.div
        className="relative animate-float-slow"
        style={{ perspective: 1400 }}
        animate={{ y: [0, -6, 0] }}
      >
        <motion.button
          type="button"
          onClick={() => setFlipped((v) => !v)}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          aria-label={flipped ? 'Show postcard photo' : 'Flip postcard to read the note'}
          className="relative h-80 w-full max-w-115 cursor-pointer sm:h-90 sm:w-135 md:h-110 md:w-165"
          style={{
            rotateX: rx,
            rotateY: ry,
            transformStyle: 'preserve-3d',
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="absolute inset-0 rounded-[20px] shadow-deep"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.9, ease: [0.2, 0.65, 0.3, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              className="absolute inset-0 overflow-hidden rounded-[20px] border border-cream-50/60 bg-navy-700"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <img
                src={imageUrl}
                alt="Porto, Portugal"
                className="h-full w-full object-cover"
                draggable="false"
              />
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: useTransform(
                    [glareX, glareY],
                    ([x, y]) =>
                      `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.55), transparent 45%)`,
                  ),
                  mixBlendMode: 'overlay',
                }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy-900/70 via-transparent to-transparent" />

              <div className="absolute right-5 top-5 rotate-[8deg] rounded-md border-2 border-crimson-500/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-crimson-500">
                Par Avion
              </div>

              <div className="absolute left-7 bottom-7 right-7 flex items-end justify-between text-cream-50">
                <div>
                  <p className="font-display text-[11px] uppercase tracking-[0.28em] text-cream-50/85">
                    Postcard &middot; From the archive
                  </p>
                  <p className="mt-2 font-display text-5xl leading-none tracking-tight md:text-6xl">
                    Olá from Porto.
                  </p>
                </div>
                <div className="hidden text-right text-[10px] uppercase tracking-[0.22em] text-cream-50/80 md:block">
                  <p>Flip me</p>
                  <p className="mt-1">&darr;</p>
                </div>
              </div>
            </div>

            <div
              className="absolute inset-0 grid grid-cols-2 rounded-[20px] border border-navy-700/10 bg-cream-50 p-5 text-navy-700 md:p-6"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="flex flex-col justify-between pr-4">
                <p className="font-display text-sm italic leading-snug tracking-tight text-navy-700/90">
                  Hi from Portugal,
                </p>
                <p className="font-display text-base leading-relaxed text-navy-700/85 md:text-lg">
                  Twenty of us. Two weeks. Lisbon and Porto. We ate too many pastéis,
                  took the long way home almost every time, and made a trip&apos;s worth
                  of memories that are hard to fit on a postcard. So here&apos;s a whole
                  website.
                </p>
                <p className="font-display text-sm italic leading-snug tracking-tight text-navy-700/80">
                  Com saudades,<br />
                  The cohort
                </p>
              </div>

              <div className="relative flex flex-col items-end gap-4 border-l border-dashed border-navy-700/20 pl-4">
                <div className="relative h-16 w-16 rotate-6 border-2 border-crimson-600 bg-cream-100 p-1 text-[9px] font-bold uppercase leading-tight tracking-widest text-crimson-700">
                  <div className="grid h-full w-full place-items-center rounded-sm border border-crimson-600/40 bg-crimson-600 text-center text-cream-50">
                    <span>
                      UA<br />MIS<br />2026
                    </span>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-2 text-[11px] uppercase tracking-[0.2em] text-navy-700/60">
                  <div className="h-px bg-navy-700/20" />
                  <div className="h-px bg-navy-700/20" />
                  <div className="h-px bg-navy-700/20" />
                  <div className="h-px bg-navy-700/20" />
                </div>

                <div className="mt-auto rotate-[-4deg] rounded-full border border-navy-700/20 px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-navy-700/60">
                  Lisboa &middot; 06.05.2026
                </div>
              </div>
            </div>
          </motion.div>
        </motion.button>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-8 right-8 -bottom-6 h-8 rounded-full bg-navy-900/20 blur-xl"
        />
      </motion.div>
    </div>
  )
}
