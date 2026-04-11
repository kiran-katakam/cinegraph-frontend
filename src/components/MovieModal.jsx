import { useEffect } from 'react';
import '../styles/MovieModal.css';

export default function MovieModal({ movie, loading, isLiked, onToggleLike, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdrop}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>

        {loading || !movie ? (
          <div className="modal-loading">Loading…</div>
        ) : (
          <ModalContent movie={movie} isLiked={isLiked} onToggleLike={onToggleLike} />
        )}
      </div>
    </div>
  );
}

function ModalContent({ movie, isLiked, onToggleLike }) {
  const rating  = movie.rating ? movie.rating.toFixed(1) : null;
  const genres  = (movie.genres   || []).filter(Boolean);
  const actors  = (movie.actors   || []).filter(Boolean);
  const dirs    = (movie.directors || []).filter(Boolean);

  return (
    <>
      <div className="modal-hero">
        <div className="modal-poster">
          {movie.posterPath
            ? <img src={movie.posterPath} alt={movie.title} />
            : <div className="modal-poster-placeholder">🎬</div>}
        </div>
        <div className="modal-info">
          <div className="modal-title">{movie.title}</div>
          <div className="modal-year-rating">
            {movie.releaseYear && <span>{movie.releaseYear}</span>}
            {rating && <span className="rating-badge">★ {rating}</span>}
          </div>
          {genres.length > 0 && (
            <div className="modal-genres">
              {genres.map(g => <span key={g} className="genre-badge">{g}</span>)}
            </div>
          )}
          <p className="modal-overview">
            {movie.overview || <em>No overview available.</em>}
          </p>
        </div>
      </div>

      {(actors.length > 0 || dirs.length > 0) && (
        <div className="modal-cast">
          {dirs.length > 0 && (
            <>
              <h4>Director</h4>
              <div className="cast-list">
                {dirs.map(d => <span key={d} className="cast-tag">🎬 {d}</span>)}
              </div>
            </>
          )}
          {actors.length > 0 && (
            <>
              <h4>Cast</h4>
              <div className="cast-list">
                {actors.map(a => <span key={a} className="cast-tag">{a}</span>)}
              </div>
            </>
          )}
        </div>
      )}

      <div className="modal-actions">
        <button
          className={`btn-modal-like ${isLiked ? 'active' : ''}`}
          onClick={() => onToggleLike(movie)}
        >
          {isLiked ? '♥ In your picks' : '♥ Add to picks'}
        </button>
      </div>
    </>
  );
}
