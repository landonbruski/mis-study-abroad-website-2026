import { NavBar } from '../components/home/NavBar'
import { Hero } from '../components/home/Hero'
import { Cities } from '../components/home/Cities'
import { Itinerary } from '../components/home/Itinerary'
import { Experiences } from '../components/home/Experiences'
import { Cohort } from '../components/home/Cohort'
import { Footer } from '../components/home/Footer'

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-navy-700 focus:px-4 focus:py-2 focus:text-sm focus:text-cream-50"
      >
        Skip to main content
      </a>
      <NavBar />
      <main id="main" className="flex flex-col">
        <Hero />
        <Cities />
        <Itinerary />
        <Experiences />
        <Cohort />
      </main>
      <Footer />
    </>
  )
}
