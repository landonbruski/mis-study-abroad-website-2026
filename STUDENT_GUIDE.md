# Student guide

Walkthrough for building your personal page.

Everyone on the cohort builds one page. The homepage links to all of them from the polaroid grid. The point is that clicking any polaroid takes you to that person's trip, told the way they want to tell it.

This guide has the setup, where to put things, and some notes on the shared brand if you want to lean on it. You're not required to match the homepage style. Do what feels right for your page.

---

## 1. Getting set up

If you haven't already:

```bash
git clone <this-repo-url>
cd study-abroad
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and leave it running. It hot-reloads as you save.

---

## 2. Your file

Every student page is a single JSX file under `src/students/`. Your filename should match the slug in [`src/data/cohort.js`](src/data/cohort.js) (most of them are just `first-last`, all lowercase, hyphenated).

```bash
cp src/students/_template.jsx src/students/<your-slug>.jsx
```

For example: `src/students/landon-bruski.jsx`.

Open it up and rename the exported component to your name in CamelCase:

```jsx
// before
export function StudentTemplate() { ... }
export default StudentTemplate

// after
export function LandonBruski() { ... }
export default LandonBruski
```

**Keep the `export default`.** The site finds your page automatically based on the filename, but it uses the default export to render it. If you remove that line the route will not load.

Once you save, your page is live at `/students/<your-slug>` in the dev server. Open that URL to see it. The homepage polaroid, the footer name list, and the header dropdown already link there — nothing else to wire up.

---

## 3. What to fill in

The template has a few data blocks at the top of the file. Edit those.

- **`me`** — your name, year, major, hometown, a one-sentence intro, and the path to your photo.
- **`favoriteDay`** — the day on the trip you want front and center. A few sentences. Be specific.
- **`threeThings`** — three small cards. Suggested: the best thing you ate, something you didn't expect, and one thing you're bringing home. You can rename these if you want.
- **`entries`** — optional journal entries. As many or as few as you want.

The JSX under those blocks is a starting layout. You don't have to keep it. If you want a totally different page, rip it out and write your own.

---

## 4. Your photo

Drop a photo into `public/students/<your-slug>.jpg`. Portrait (4:5) or square works best. Keep it under ~500 KB if you can.

In your JSX file, set `me.photo` to the path starting with `/students/` (not `public/`):

```js
photo: '/students/<your-slug>.jpg'
```

If you don't have a photo yet, leave the placeholder path and swap it later. The page still builds.

### Getting your photo on the homepage polaroid

By default your polaroid card on the homepage shows your initials. To show your photo there too, open [`src/data/cohort.js`](src/data/cohort.js) and add a `photo` field to your entry in the `roster` array:

```js
{ name: 'Your Name', photo: '/students/<your-slug>.jpg' },
```

Students without a `photo` field keep the initials card. Add this at the same time as your student page PR.

---

## 5. The shared vibe (if you want to use it)

The homepage uses a small set of colors and two fonts. You don't have to use them, but they're there if you want your page to feel like part of the same site.

### Colors

| Token          | Hex       | What it is                                |
| -------------- | --------- | ----------------------------------------- |
| `crimson-600`  | `#9E1B32` | The brand red. Accents and kickers.       |
| `crimson-800`  | `#560B1A` | Deep crimson. The homepage footer.        |
| `cream-50`     | `#FCF8F1` | The default page background.              |
| `cream-100`    | `#F7EFE1` | Slightly warmer background for variety.   |
| `navy-700`     | `#0B1F3A` | Body text and headings on cream.          |
| `gold-400`     | `#D9A441` | Warm accent. Nice on crimson or navy.     |
| `azulejo-500`  | `#3F7AA3` | Porto accent blue. Use sparingly.         |

All of these are available as Tailwind utilities (`bg-crimson-600`, `text-navy-700`, etc.) and also exported from [`src/brand.js`](src/brand.js) if you want them as JS values.

### Fonts

- **Fraunces** for display (headings, big type). `font-display` in Tailwind.
- **Inter** for everything else. `font-sans`.

Both load from Google Fonts via `index.html`.

### Tools already set up

- **Tailwind CSS 4** for styling.
- **Framer Motion** for animations.
- **FadeIn** (`src/components/ui/FadeIn.jsx`) and **SectionHeader** (`src/components/ui/SectionHeader.jsx`) are little helpers the homepage uses. You're welcome to use them or skip them entirely.

Use any of this or none of it. Your page can be as stripped down or as built-out as you want.

---

## 6. A note on the writing

The homepage is written in first-person plural ("we went," "our cohort"). Your page is yours, so first-person singular makes sense there. Beyond that: whatever sounds like you. Short sentences are fine. So are long ones.

---

## 7. Submitting

This is a student-led project. Nobody is grading your PR. The flow is: branch, push, open a PR, wait for CI to go green, merge it yourself.

You have push access as a collaborator. You can't push to `main` directly, only through a PR.

```bash
git checkout -b student/<your-slug>
git add src/students/<your-slug>.jsx public/students/<your-slug>.jpg
git commit -m "add <your name> student page"
git push origin student/<your-slug>
```

Open a PR against `main` on GitHub.

Before you push, sanity-check locally:

- `npm run build` runs without errors.
- `npm run lint` runs without errors.
- Your filename slug matches the one in `src/data/cohort.js`.
- Your photo loads at `/students/<your-slug>.jpg` in the dev server.
- Your page loads at `/students/<your-slug>` in the dev server.
- Your file has `export default <YourName>` at the bottom.

### What happens after you open the PR

- A GitHub Actions check runs `npm ci`, `npm run lint`, and `npm run build`. If any of those fail, the merge button is blocked. Read the log, fix locally, push again to the same branch, and the check reruns automatically.
- Once the check is green, hit **Squash and merge** on your own PR.
- The merge triggers the deploy. Your page goes live shortly after.

### Keep your PR to your own files

Touch only:

- `src/students/<your-slug>.jsx`
- `public/students/<your-slug>.jpg` (or whatever extension your photo uses)

If you genuinely need to change a shared file (`src/components/`, `src/data/cohort.js`, etc.), drop a note in the group chat first so we don't end up with twenty conflicting takes on the homepage.

If you added a new npm package, commit `package.json` and `package-lock.json` with your PR. Mention it in the PR description so the rest of the cohort knows their `npm install` will pick up something new.

---

## 8. If something breaks

**Broken image.** Check that the photo is in `public/students/` (not `src/`), that the filename matches, and that `me.photo` in your file starts with `/students/`.

**Tailwind class not applying.** Save the file and make sure the dev server is running. If a utility like `bg-crimson-600` doesn't work, check for a typo against the palette table above.

**Build fails.** Run `npm run build` and read the error. Usually it's a missing comma, an unclosed JSX tag, or a typo in an import. If you can't figure it out, push the branch anyway and ask the group chat.

---

## 9. Questions

Ping the group chat or open a GitHub issue. If the same question comes up twice it probably belongs in this guide, so feel free to open a PR against it.
