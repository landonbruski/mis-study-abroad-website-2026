import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { students, faculty } from '../../data/cohort'

const links = [
  { href: '#cities', label: 'The cities' },
  { href: '#itinerary', label: 'Itinerary' },
  { href: '#experiences', label: 'The days' },
]

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)
  const triggerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined

    function onKey(event) {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    function onClick(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !triggerRef.current?.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  function jumpTo(slug) {
    setOpen(false)
    navigate(`/students/${slug}`)
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 bg-crimson-600 text-cream-50 transition-shadow duration-300',
        scrolled && 'shadow-[0_8px_30px_-10px_rgba(11,31,58,0.25)]',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-10">
        <Link to="/" className="group flex items-center gap-3">
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-cream-50 text-crimson-600">
            <span className="font-display text-lg leading-none">A</span>
            <span className="absolute inset-0 rounded-full ring-1 ring-cream-50/40" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base text-cream-50">Portugal 2026</span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-cream-50/75">
              UA MIS Cohort
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              to={`/${link.href}`}
              className="group relative text-sm font-medium text-cream-50/85 transition-colors hover:text-cream-50"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-cream-50 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          <div className="relative">
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-haspopup="true"
              className={cn(
                'group relative inline-flex items-center gap-1.5 text-sm font-medium transition-colors',
                open ? 'text-cream-50' : 'text-cream-50/85 hover:text-cream-50',
              )}
            >
              The cohort
              <motion.span
                aria-hidden="true"
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="inline-block text-xs leading-none"
              >
                &#9662;
              </motion.span>
              <span
                className={cn(
                  'absolute -bottom-1 left-0 h-px bg-cream-50 transition-all duration-300',
                  open ? 'w-full' : 'w-0 group-hover:w-full',
                )}
              />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  ref={dropdownRef}
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.2, 0.65, 0.3, 1] }}
                  role="menu"
                  className="absolute right-0 top-[calc(100%+14px)] w-[min(92vw,640px)] origin-top-right overflow-hidden rounded-2xl border border-navy-700/10 bg-cream-50 shadow-deep"
                >
                  <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-[auto_1fr]">
                    <div className="sm:min-w-45">
                      <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-crimson-600">
                        Faculty
                      </p>
                      <ul className="mt-3 flex flex-col gap-1.5">
                        {faculty.map((person) => (
                          <li key={person.slug}>
                            <button
                              type="button"
                              onClick={() => jumpTo(person.slug)}
                              className="group flex w-full items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-left text-sm text-navy-700 transition-colors hover:bg-cream-100"
                              role="menuitem"
                            >
                              <span className="font-medium">{person.name}</span>
                              <span className="text-[9px] uppercase tracking-[0.22em] text-navy-700/45 transition-colors group-hover:text-crimson-600">
                                {person.role.split(' ')[0]}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-crimson-600">
                          Students
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-navy-700/45">
                          {students.length}
                        </p>
                      </div>
                      <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1">
                        {students.map((person, i) => (
                          <li key={person.slug}>
                            <button
                              type="button"
                              onClick={() => jumpTo(person.slug)}
                              className="group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-navy-700 transition-colors hover:bg-cream-100"
                              role="menuitem"
                            >
                              <span className="w-6 text-[10px] tabular-nums text-navy-700/40 transition-colors group-hover:text-crimson-600">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <span className="truncate">{person.name}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-navy-700/10 bg-cream-100 px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-navy-700/55">
                    <span>Click a name to open their page</span>
                    <Link
                      to="/#cohort"
                      onClick={() => setOpen(false)}
                      className="font-medium text-crimson-600 hover:text-crimson-700"
                    >
                      See the full grid &rarr;
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </nav>

        <Link
          to="/#cohort"
          className="hidden rounded-full border border-cream-50/40 bg-cream-50/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-cream-50 transition-all hover:bg-cream-50/20 sm:inline-block md:hidden"
        >
          Cohort
        </Link>
      </div>
    </motion.header>
  )
}
