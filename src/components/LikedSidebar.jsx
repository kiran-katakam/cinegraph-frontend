import Icon from './Icon';
import { formatTitle, yearOf } from '../utils/format';
import '../styles/LikedSidebar.css';

export default function LikedSidebar({ open, likedMovies, onToggle, onRemove, onRecommend, onMovieClick }) {
  const count = likedMovies.size;

  return (
    <aside className={`counter ${open ? 'open' : ''}`} aria-label="Your stack">
      <div className="counter-head">
        <h2>Your stack <span className="counter-count">{count}</span></h2>
        <button className="counter-toggle icon-btn" aria-expanded={open} aria-controls="stack-list"
          aria-label={open ? 'Collapse your stack' : 'Expand your stack'} onClick={onToggle}>
          <Icon name="chevron" />
        </button>
      </div>

      <ul className="counter-list" id="stack-list">
        {count === 0 ? (
          <li className="counter-empty">
            <b>Your stack is empty</b>
            Press <span className="mini-sticker" aria-hidden="true"><Icon name="plus" size={12} /></span> on
            any poster to add it. Three to five movies give the best picks.
          </li>
        ) : (
          [...likedMovies.values()].map(movie => (
            <LikedItem key={movie.movieId} movie={movie} onRemove={onRemove} onClick={onMovieClick} />
          ))
        )}
      </ul>

      <div className="counter-foot">
        <button className="btn btn-primary" disabled={count === 0} onClick={onRecommend}>
          Get picks
        </button>
      </div>
    </aside>
  );
}

function LikedItem({ movie, onRemove, onClick }) {
  const title = formatTitle(movie.title);
  const meta = [yearOf(movie), (movie.genres || []).filter(Boolean).slice(0, 2).join(', ')].filter(Boolean).join(' · ');
  return (
    <li className="stack-item">
      <button className="stack-open" onClick={() => onClick(movie.movieId)}>
        {movie.posterPath
          ? <img src={movie.posterPath} alt="" />
          : <span className="stack-blank" />}
        <span>
          <b>{title}</b>
          <small>{meta}</small>
        </span>
      </button>
      <button className="icon-btn stack-remove" aria-label={`Remove ${title}`} onClick={() => onRemove(movie)}>
        <Icon name="close" size={16} />
      </button>
    </li>
  );
}
