import MovieCard from './MovieCard';
import Skeleton from './Skeleton';
import Icon from './Icon';
import '../styles/RecommendSection.css';

export default function RecommendSection({ movies, isLoading, likedCount, isLiked, onToggleLike, onMovieClick, onClose }) {
  return (
    <section className="picks" id="picks" aria-labelledby="picks-title" aria-busy={isLoading}>
      <div className="picks-sign">
        <div>
          <h2 id="picks-title">Picked for your stack</h2>
          <p>
            {isLoading
              ? `Finding movies that go with your stack of ${likedCount}…`
              : `From the ${likedCount} movie${likedCount !== 1 ? 's' : ''} in your stack`}
          </p>
        </div>
        <button className="icon-btn" aria-label="Hide picks" onClick={onClose}>
          <Icon name="close" />
        </button>
      </div>

      {isLoading ? (
        <div className="movie-grid">
          {Array.from({ length: 14 }).map((_, i) => <Skeleton key={i} className="card-skeleton" />)}
        </div>
      ) : movies.length ? (
        <div className="movie-grid">
          {movies.map((movie, i) => (
            <MovieCard
              key={`rec-${movie.movieId}-${i}`}
              movie={movie}
              isLiked={isLiked}
              onToggleLike={onToggleLike}
              onClick={onMovieClick}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No picks for this stack yet</h3>
          <p>Add a few more movies, ideally from different genres, and ask again.</p>
        </div>
      )}
    </section>
  );
}
