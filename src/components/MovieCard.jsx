import { useState } from 'react';
import Icon from './Icon';
import { formatTitle, yearOf } from '../utils/format';
import '../styles/MovieCard.css';

export default function MovieCard({ movie, isLiked, onToggleLike, onClick }) {
  const [imgFailed, setImgFailed] = useState(false);
  const liked = isLiked(movie.movieId);
  const title = formatTitle(movie.title);
  const year = yearOf(movie);
  const genre = (movie.genres || []).filter(Boolean)[0];

  return (
    <article className={`box ${liked ? 'liked' : ''}`}>
      <button className="box-open" onClick={() => onClick(movie.movieId)}>
        <span className="box-poster">
          {movie.posterPath && !imgFailed ? (
            <img src={movie.posterPath} alt="" loading="lazy" onError={() => setImgFailed(true)} />
          ) : (
            <span className="box-blank">{title}</span>
          )}
          <span className="box-num">#{movie.movieId}</span>
        </span>
        <span className="box-title">{title}</span>
        <span className="box-meta">
          {[year, genre].filter(Boolean).join(' · ')}
          {movie.rating ? <span className="box-rating">{movie.rating.toFixed(1)}</span> : null}
        </span>
      </button>

      <button
        className="sticker"
        aria-pressed={liked}
        aria-label={liked ? `Remove ${title} from your stack` : `Add ${title} to your stack`}
        onClick={() => onToggleLike(movie)}
      >
        <Icon name={liked ? 'check' : 'plus'} size={18} />
      </button>
    </article>
  );
}
