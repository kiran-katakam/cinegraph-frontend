import { useState } from 'react';
import '../styles/MovieCard.css';

export default function MovieCard({ movie, isLiked, onToggleLike, onClick }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const liked = isLiked(movie.movieId);

  const rating = movie.rating ? movie.rating.toFixed(1) : '—';
  const genres = (movie.genres || []).slice(0, 2).join(' · ');

  return (
    <div
      className={`movie-card ${liked ? 'liked' : ''}`}
      onClick={() => onClick(movie.movieId)}
    >
      {movie.posterPath ? (
        <img
          className={`card-img ${imgLoaded ? 'loaded' : 'loading'}`}
          src={movie.posterPath}
          alt={movie.title}
          onLoad={() => setImgLoaded(true)}
          onError={e => { e.target.style.display = 'none'; }}
        />
      ) : (
        <NoPoster title={movie.title} />
      )}

      <div className="card-overlay">
        <div className="overlay-title">{movie.title}</div>
        <div className="overlay-meta">
          <span className="overlay-rating">★ {rating}</span>
          {movie.releaseYear && <span>{movie.releaseYear}</span>}
          {genres && <span>{genres}</span>}
        </div>
      </div>

      <button
        className="card-like-btn"
        title="Add to picks"
        onClick={e => { e.stopPropagation(); onToggleLike(movie); }}
      >
        <span className="heart-icon">♥</span>
      </button>
    </div>
  );
}

function NoPoster({ title }) {
  return (
    <div className="card-no-poster">
      <div className="np-icon">🎬</div>
      <div className="np-title">{title}</div>
    </div>
  );
}
