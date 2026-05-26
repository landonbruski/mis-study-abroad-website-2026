import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useState } from 'react'

export function ClickableImage({
  src,
  alt,
  className,
  loading,
  frameClassName = '',
}) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 180,
    damping: 18,
  })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 180,
    damping: 18,
  })
  const lift = useSpring(0, { stiffness: 260, damping: 20 })

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

  function onMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    mx.set((event.clientX - rect.left) / rect.width - 0.5)
    my.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  function onEnter() {
    setHovered(true)
    lift.set(-8)
  }

  function onLeave() {
    setHovered(false)
    mx.set(0)
    my.set(0)
    lift.set(0)
  }

  return (
    <>
      <div className="w-full py-2" style={{ perspective: 1000 }}>
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          onMouseMove={onMove}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className={`block w-full cursor-zoom-in overflow-hidden rounded-xl border border-navy-700/10 bg-cream-100 text-left ${frameClassName}`.trim()}
          style={{
            rotateX: rx,
            rotateY: ry,
            y: lift,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            boxShadow: hovered
              ? '0 26px 48px -10px rgba(11, 31, 58, 0.38), 0 10px 20px -6px rgba(11, 31, 58, 0.14)'
              : '0 4px 14px -4px rgba(11, 31, 58, 0.1)',
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          aria-label={`View larger: ${alt}`}
        >
          <img src={src} alt={alt} className={className} loading={loading} />
        </motion.button>
      </div>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-700/90 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full border border-cream-50/30 px-3 py-1.5 text-sm font-medium text-cream-50 transition-colors hover:border-cream-50"
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
