function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const roster = [
  { name: 'Anna Hill' },
  { name: 'Caroline Randall' },
  { name: 'Donovan Nguyen' },
  { name: 'EJ Jones' },
  { name: 'Emily Garcia' },
  { name: 'Evan Patterson' },
  { name: 'Jaimee Douglas', photo: '/students/jaimee-douglas/jaimee-headshot.png', cardPlay: true },
  { name: 'Jaxon Dunlevy' },
  { name: 'James Nguyen', photo: '/students/james-nguyen/james-nguyen.JPG' },
  { name: 'Landon Bruski' },
  { name: 'Lucas Brown' },
  { name: 'Malyk Hayden', photo: '/students/malyk-hayden/malyk-headshot.jpg' },
  { name: 'Molly Waldron', photo: '/students/waldron-molly/pfp.jpeg'},
  { name: 'Olivia Allen' },
  { name: 'Sarah Jane Davis' },
  { name: 'Sofia Balsamo' },
  { name: 'Sofia Rayon', photo: '/students/sofia-rayon/sofia-rayon.jpg' },
  { name: 'Soledad (Soli) Davis' },
  { name: 'Sydney March' },
  { name: 'Tamilore Olaniyan', photo: '/students/tamilore-olaniyan/tamilore-olaniyan.jpg' },
]

export const students = roster.map(({ name, photo, cardPlay }) => ({
  name,
  slug: slugify(name),
  photo: photo ?? null,
  cardPlay: cardPlay ?? false,
  pageReady: false,
}))

export const faculty = [
  { name: 'Jeff Lucas', role: 'Faculty Lead', slug: 'jeff-lucas' },
  { name: 'Craig Fulda', role: 'Faculty', slug: 'craig-fulda' },
]
