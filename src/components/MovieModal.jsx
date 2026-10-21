import { useEffect, useRef } from 'react';
import Icon from './Icon';
import { formatTitle, yearOf, aisleColor } from '../utils/format';
import '../styles/MovieModal.css';

export default function MovieModal({ movie, loading, isLiked, onToggleLike, onClose }) {
  const boxRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    const prevFocus = document.activeElement;
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    boxRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prevFocus?.focus?.();
    };
  }, [onClose]);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdrop}>
      <div className="modal-box" role="dialog" aria-modal="true" aria-label={movie ? formatTitle(movie.title) : 'Loading movie'}
        tabIndex={-1} ref={boxRef}>
        <button className="icon-btn modal-close" aria-label="Close" onClick={onClose}>
          <Icon name="close" />
        </button>

        {loading || !movie ? (
          <div className="modal-loading" aria-busy="true">
            <div className="skeleton modal-sk-poster" />
            <div className="modal-sk-lines">
              <div className="skeleton" style={{ height: 36, width: '70%' }} />
              <div className="skeleton" style={{ height: 16, width: '35%' }} />
              <div className="skeleton" style={{ height: 80 }} />
            </div>
          </div>
        ) : (
          <ModalContent movie={movie} isLiked={isLiked} onToggleLike={onToggleLike} />
        )}
      </div>
    </div>
  );
}

function ModalContent({ movie, isLiked, onToggleLike }) {
  const title  = formatTitle(movie.title);
  const year   = yearOf(movie);
  const rating = movie.rating ? movie.rating.toFixed(1) : null;
  const genres = (movie.genres    || []).filter(Boolean);
  const actors = (movie.actors    || []).filter(Boolean);
  const dirs   = (movie.directors || []).filter(Boolean);

  return (
    <>
      <div className="modal-hero">
        <div className="modal-poster">
          {movie.posterPath
            ? <img src={movie.posterPath} alt="" />
            : <span className="box-blank">{title}</span>}
        </div>
        <div className="modal-info">
          <h2 className="modal-title">{title}</h2>
          <p className="modal-meta">
            {year && <span>{year}</span>}
            {rating && <span><b>{rating}</b> / 10 TMDb</span>}
            <span className="modal-num">#{movie.movieId}</span>
          </p>
          {genres.length > 0 && (
            <ul className="modal-genres" aria-label="Genres">
              {genres.map(g => {
                const { bg, fg } = aisleColor(g);
                return <li key={g} style={{ background: bg, color: fg }}>{g}</li>;
              })}
            </ul>
          )}
          <p className="modal-overview">
            {movie.overview || 'No synopsis on file for this movie.'}
          </p>

          {dirs.length > 0 && (
            <div className="modal-people">
              <h3>Directed by</h3>
              <p>{dirs.join(', ')}</p>
            </div>
          )}
          {actors.length > 0 && (
            <div className="modal-people">
              <h3>Cast</h3>
              <p>{actors.join(', ')}</p>
            </div>
          )}

          <button
            className={`btn ${isLiked ? 'btn-primary' : 'btn-outline'} modal-like`}
            aria-pressed={isLiked}
            onClick={() => onToggleLike(movie)}
          >
            <Icon name={isLiked ? 'check' : 'plus'} size={18} />
            {isLiked ? 'In your stack' : 'Add to your stack'}
          </button>
        </div>
      </div>
    </>
  );
}
