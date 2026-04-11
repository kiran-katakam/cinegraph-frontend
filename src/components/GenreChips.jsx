import { useEffect, useState } from 'react';
import { fetchGenres } from '../utils/api';
import '../styles/GenreChips.css';

export default function GenreChips({ activeGenre, onSelect }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres().then(setGenres).catch(console.error);
  }, []);

  return (
    <div className="genre-scroll">
      <button
        className={`chip ${!activeGenre ? 'active' : ''}`}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {genres.map(g => (
        <button
          key={g.name}
          className={`chip ${activeGenre === g.name ? 'active' : ''}`}
          onClick={() => onSelect(g.name)}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
}
