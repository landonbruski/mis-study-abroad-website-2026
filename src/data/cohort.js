function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const names = [
  'Anna Hill',
  'Caroline Randall',
  'Donovan Nguyen',
  'EJ Jones',
  'Emily Garcia',
  'Evan Patterson',
  'Jaimee Douglas',
  'Jaxon Dunlevy',
  'James Nguyen',
  'Landon Bruski',
  'Lucas Brown',
  'Malyk Hayden',
  'Molly Waldron',
  'Olivia Allen',
  'Sarah Jane Davis',
  'Sofia Balsamo',
  'Sofia Rayon',
  'Soledad (Soli) Davis',
  'Sydney March',
  'Tamilore Olaniyan',
]

export const students = names.map((name) => ({
  name,
  slug: slugify(name),
  pageReady: false,
}))

export const faculty = [
  { name: 'Jeff Lucas', role: 'Faculty Lead', slug: 'jeff-lucas' },
  { name: 'Craig Fulda', role: 'Faculty', slug: 'craig-fulda' },
]
