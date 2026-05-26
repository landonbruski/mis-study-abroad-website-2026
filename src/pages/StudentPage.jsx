import { lazy, Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import { students, faculty } from '../data/cohort'

const pageModules = import.meta.glob('../students/*.jsx')

const lazyPagesBySlug = Object.fromEntries(
  Object.entries(pageModules)
    .map(([path, loader]) => {
      const match = path.match(/\/([^/]+)\.jsx$/)
      const slug = match ? match[1] : null
      return [slug, loader]
    })
    .filter(([slug]) => slug && !slug.startsWith('_'))
    .map(([slug, loader]) => [slug, lazy(loader)]),
)

export default function StudentPage() {
  const { slug } = useParams()
  const LazyPage = slug ? lazyPagesBySlug[slug] : null
  const person = [...students, ...faculty].find((p) => p.slug === slug) ?? null

  if (!LazyPage) {
    return <MissingPage slug={slug} person={person} />
  }

  return (
    <Suspense fallback={<PageSpinner />}>
      <LazyPage />
    </Suspense>
  )
}

function PageSpinner() {
  return (
    <div className="grid min-h-screen place-items-center bg-cream-50 text-navy-700/70">
      <p className="text-[11px] uppercase tracking-[0.28em]">Loading</p>
    </div>
  )
}

function MissingPage({ slug, person }) {
  const name = person?.name ?? 'This cohort member'
  return (
    <div className="grid min-h-screen place-items-center bg-cream-50 px-5 text-center text-navy-700">
      <div className="max-w-lg">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-crimson-600">
          Coming soon
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight md:text-5xl">
          {name} has not posted their page yet.
        </h1>
        <p className="mt-5 text-navy-700/75">
          Every cohort member is building their own trip page. {name}&apos;s will live
          at this URL once it is pushed.
        </p>
        {slug && (
          <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-navy-700/45">
            /students/{slug}
          </p>
        )}
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy-700 px-5 py-2.5 text-sm font-medium text-cream-50 shadow-deep transition-transform hover:-translate-y-0.5"
        >
          &larr; Back to the cohort
        </Link>
      </div>
    </div>
  )
}
