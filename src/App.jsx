import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import StudentPage from './pages/StudentPage'

export default function App() {
  return (
    <div className="relative flex min-h-screen flex-col bg-cream-50 text-navy-700">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students/:slug" element={<StudentPage />} />
        <Route path="*" element={<StudentPage />} />
      </Routes>
    </div>
  )
}
