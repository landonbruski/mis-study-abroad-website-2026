# UA MIS Portugal 2026

Hey. This is the site we're using to put our Portugal trip in one place.

The homepage is the shared front door: the cities, the itinerary, the experiences, and the cohort grid. Each of us has our own page linked from that grid, so anyone can click through from the homepage to one person's version of the trip.

There's a template to copy and a guide to help you do it. You don't have to match the homepage's exact style if you don't want to. Do your thing.

## Getting it running

You'll need [Node](https://nodejs.org) installed. Anything recent works.

```bash
git clone <this-repo-url>
cd study-abroad
npm install
npm run dev
```

That starts the dev server at [http://localhost:5173](http://localhost:5173). It reloads when you save.

When you're done, `npm run build` bundles everything into `dist/` for deployment.

## Where things live

```text
.
├── README.md              ← this file
├── STUDENT_GUIDE.md       ← walkthrough for building your page
├── src/
│   ├── App.jsx            ← homepage (you don't usually edit this)
│   ├── brand.js           ← colors, fonts, and other tokens
│   ├── components/
│   │   ├── home/          ← the homepage sections
│   │   └── ui/            ← shared little pieces
│   ├── data/              ← homepage copy (itinerary, cities, cohort, etc.)
│   └── students/
│       └── _template.jsx  ← copy this when you build your page
└── public/
    └── students/          ← drop your photo here as <your-slug>.jpg
```

## Building your page

1. Copy `src/students/_template.jsx` to `src/students/<your-slug>.jsx`. Use the same slug as yours in `src/data/cohort.js`.
2. Fill in the blocks at the top of the file (your intro, favorite day, a few small things, and journal entries if you want).
3. Drop a photo into `public/students/<your-slug>.jpg`.
4. Commit, push, open a PR.

Your page lives at `/students/<your-slug>`. The homepage polaroid, the footer name list, and the header dropdown all already link there, so you don't need to wire up any routing. Once your file is in place the links just start working.

Longer version with all the details is in [STUDENT_GUIDE.md](STUDENT_GUIDE.md).

## The stack we're using

Just so you know what's already here:

- **React 19 + Vite** for the app.
- **Tailwind CSS 4** for styling. Brand tokens are defined in `src/index.css` (the `@theme` block) and mirrored in `src/brand.js` if you want to import them in JS.
- **Framer Motion** for the little animations on the homepage.
- **clsx** for conditional classes.

You don't have to use any of this for your page. If you want a page with zero animation, or you want to bring in a different library, or you want to write plain CSS instead of Tailwind, go ahead. The only real ask is that `npm run build` still works when you push.

## A few small things

- Keep your filename slug matching the one in `src/data/cohort.js`. The homepage polaroids and footer roll both link based on that slug.
- The shared colors and fonts live in `src/brand.js` if you want to match the homepage vibe. But if you want your page to look like yours, not like everyone else's, that's fine too.
- If you're adding a new npm package, just commit the `package.json` and `package-lock.json` changes with your PR.