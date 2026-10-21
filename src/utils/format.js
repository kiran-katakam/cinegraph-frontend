// MovieLens titles look like "Shawshank Redemption, The (1994)": drop the year, move the article back to the front.
export function formatTitle(raw = '') {
  const noYear = raw.replace(/\s*\(\d{4}(?:[–-]\d{0,4})?\)\s*$/, '');
  const m = noYear.match(/^(.*?), (The|A|An|Les|La|Le|L'|Il|El|Das|Der|Die)( \(.*\))?$/);
  return m ? `${m[2]}${m[2].endsWith("'") ? '' : ' '}${m[1]}${m[3] || ''}` : noYear;
}

export function yearOf(movie) {
  if (movie.releaseYear) return movie.releaseYear;
  const m = (movie.title || '').match(/\((\d{4})\)\s*$/);
  return m ? Number(m[1]) : null;
}

// Aisle-sign colours. fg is picked per hue to keep 4.5:1 on the sign text.
const INK = '#15181E';
const WHITE = '#FFFFFF';
const AISLES = {
  Drama:       ['#1F4FB8', WHITE],
  Comedy:      ['#F2B705', INK],
  Thriller:    ['#3B3F46', WHITE],
  Action:      ['#C62A17', WHITE],
  Romance:     ['#B8164F', WHITE],
  Adventure:   ['#E87722', INK],
  Crime:       ['#6D2E1F', WHITE],
  'Sci-Fi':    ['#5B2A86', WHITE],
  Horror:      ['#1E1E22', WHITE],
  Fantasy:     ['#9A7FD6', INK],
  Children:    ['#FF9DBA', INK],
  Animation:   ['#14A3B8', INK],
  Mystery:     ['#2E4057', WHITE],
  Documentary: ['#C9C2A3', INK],
  War:         ['#4B5320', WHITE],
  Musical:     ['#EE5FB0', INK],
  Western:     ['#9A4A26', WHITE],
  IMAX:        ['#A9C4DB', INK],
  'Film-Noir': ['#000000', WHITE],
};

export function aisleColor(name) {
  const [bg, fg] = AISLES[name] || ['#5A6070', WHITE];
  return { bg, fg };
}
