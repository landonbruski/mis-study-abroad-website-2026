import { useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import StudentPage from './pages/StudentPage'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  useLayoutEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 112
        window.scrollTo({ top: Math.max(0, top), behavior: 'instant' })
      }
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <div className="relative flex min-h-screen flex-col bg-cream-50 text-navy-700">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students/:slug" element={<StudentPage />} />
        <Route path="*" element={<StudentPage />} />
      </Routes>
    </div>
  )
}
