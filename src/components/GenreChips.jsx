import { aisleColor } from '../utils/format';
import '../styles/GenreChips.css';

export default function GenreChips({ genres, activeGenre, onSelect }) {
  // "(no genres listed)" is a MovieLens placeholder, not an aisle.
  const aisles = genres.filter(g => !g.name.startsWith('('));

  return (
    <nav className="aisles" aria-label="Genres">
      <Aisle name="All" active={!activeGenre} onClick={() => onSelect(null)} />
      {aisles.map(g => (
        <Aisle key={g.name} name={g.name} active={activeGenre === g.name} onClick={() => onSelect(g.name)} />
      ))}
    </nav>
  );
}

function Aisle({ name, active, onClick }) {
  const { bg, fg } = name === 'All' ? { bg: '#15181E', fg: '#FFFFFF' } : aisleColor(name);
  return (
    <button
      className={`aisle ${active ? 'active' : ''}`}
      style={{ '--aisle-bg': bg, '--aisle-fg': fg }}
      aria-pressed={active}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
