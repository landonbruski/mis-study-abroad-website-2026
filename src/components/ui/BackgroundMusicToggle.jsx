import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const AT_TOP_THRESHOLD = 120

export function BackgroundMusicToggle({
  audioSrc,
  videoSrc,
  label = 'Open violin audio and video options',
  description,
  videoTitle = 'Violin at Porto Cathedral Treasury Museum',
}) {
  const audioRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.35
    return () => {
      audio.pause()
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY <= AT_TOP_THRESHOLD
      setAtTop(top)
      if (!top) setMenuOpen(false)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen && !videoOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setVideoOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen, videoOpen])

  function closeAll() {
    setMenuOpen(false)
    setVideoOpen(false)
  }

  async function playBackgroundAudio() {
    const audio = audioRef.current
    if (!audio) return
    closeAll()
    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }

  function pauseAudio() {
    audioRef.current?.pause()
    setPlaying(false)
    setMenuOpen(false)
  }

  function openVideo() {
    pauseAudio()
    setMenuOpen(false)
    setVideoOpen(true)
  }

  function handleIconClick() {
    if (playing) {
      pauseAudio()
      return
    }
    setMenuOpen((open) => !open)
  }

  const showControls = !videoOpen && (playing || atTop)

  return (
    <>
      <audio ref={audioRef} src={audioSrc} loop preload="metadata" />

      <AnimatePresence>
        {showControls && (
          <motion.div
            key={playing ? 'playing' : 'idle'}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-5 right-5 z-50 flex max-w-[calc(100vw-2.5rem)] items-start gap-2.5 sm:max-w-md"
          >
          <AnimatePresence mode="popLayout">
            {!playing && description && (
              <motion.div
                key="ambience-panel"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="min-w-0 flex-1 overflow-hidden rounded-xl border border-navy-700/10 bg-cream-50/95 px-3 py-2.5 shadow-sm backdrop-blur-sm"
              >
                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-crimson-600/85">
                  Optional ambience
                </p>
                <p className="mt-1 text-[11px] leading-snug text-navy-700/75">{description}</p>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 flex flex-col gap-2 border-t border-navy-700/10 pt-3">
                        <button
                          type="button"
                          onClick={playBackgroundAudio}
                          className="rounded-lg border border-navy-700/15 bg-cream-100 px-3 py-2 text-left text-[11px] font-medium text-navy-700 transition-colors hover:border-crimson-600 hover:text-crimson-600"
                        >
                          Play audio in the background
                        </button>
                        {videoSrc && (
                          <button
                            type="button"
                            onClick={openVideo}
                            className="rounded-lg border border-navy-700/15 bg-cream-100 px-3 py-2 text-left text-[11px] font-medium text-navy-700 transition-colors hover:border-crimson-600 hover:text-crimson-600"
                          >
                            Watch the video
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setMenuOpen(false)}
                          className="text-[10px] font-medium uppercase tracking-[0.18em] text-navy-700/50 transition-colors hover:text-navy-700"
                        >
                          Not now
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={handleIconClick}
            layout
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            aria-label={playing ? 'Pause background music' : label}
            aria-expanded={menuOpen}
            aria-pressed={playing}
            title={playing ? 'Pause music' : label}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border shadow-deep backdrop-blur transition-colors ${
              playing || menuOpen
                ? 'border-crimson-600 bg-crimson-600 text-cream-50'
                : 'border-navy-700/15 bg-cream-50/90 text-navy-700 hover:border-crimson-600 hover:text-crimson-600'
            }`}
          >
            {playing ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
              </svg>
            )}
          </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && !playing && atTop && (
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-navy-700/10"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {videoOpen && videoSrc && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={videoTitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-700/90 p-4 backdrop-blur-sm"
            onClick={closeAll}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full border border-cream-50/30 px-3 py-1.5 text-sm font-medium text-cream-50 transition-colors hover:border-cream-50"
              onClick={closeAll}
              aria-label="Close video"
            >
              Close
            </button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="w-full max-w-3xl overflow-hidden rounded-2xl border border-cream-50/20 bg-navy-700 shadow-deep"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="border-b border-cream-50/10 px-4 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-cream-50/80">
                {videoTitle}
              </p>
              <video
                src={videoSrc}
                controls
                autoPlay
                playsInline
                className="max-h-[70vh] w-full bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
