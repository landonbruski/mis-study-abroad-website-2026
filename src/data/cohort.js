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
  { name: 'Jaimee Douglas' },
  { name: 'Jaxon Dunlevy' },
  { name: 'James Nguyen', photo: '/students/james-nguyen/james-nguyen.JPG' },
  { name: 'Landon Bruski' },
  { name: 'Lucas Brown' },
  { name: 'Malyk Hayden', photo: '/students/malyk-hayden/malyk-headshot.jpg' },
  { name: 'Molly Waldron' },
  { name: 'Olivia Allen' },
  { name: 'Sarah Jane Davis' },
  { name: 'Sofia Balsamo' },
  { name: 'Sofia Rayon' },
  { name: 'Soledad (Soli) Davis' },
  { name: 'Sydney March' },
  { name: 'Tamilore Olaniyan' },
]

export const students = roster.map(({ name, photo }) => ({
  name,
  slug: slugify(name),
  photo: photo ?? null,
  pageReady: false,
}))

export const faculty = [
  { name: 'Jeff Lucas', role: 'Faculty Lead', slug: 'jeff-lucas' },
  { name: 'Craig Fulda', role: 'Faculty', slug: 'craig-fulda' },
]
