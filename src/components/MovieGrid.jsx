import MovieCard from './MovieCard';
import Skeleton from './Skeleton';
import '../styles/MovieGrid.css';

export default function MovieGrid({
  movies, isLoading, isLiked, onToggleLike, onMovieClick,
  onLoadMore, hasMore, skeletonCount = 40,
}) {
  if (isLoading) {
    return (
      <div className="movie-grid">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <Skeleton key={i} className="card-skeleton" />
        ))}
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="movie-grid">
        <div className="empty-state">
          <div className="es-icon">🎬</div>
          <h3>No movies found</h3>
          <p>Try a different search or genre</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="movie-grid">
        {movies.map((movie, i) => (
          <MovieCard
            key={`${movie.movieId}-${i}`}
            movie={movie}
            isLiked={isLiked}
            onToggleLike={onToggleLike}
            onClick={onMovieClick}
          />
        ))}
      </div>
      {hasMore && (
        <div className="load-more-wrap">
          <button className="btn-load-more" onClick={onLoadMore}>Load more</button>
        </div>
      )}
    </>
  );
}
