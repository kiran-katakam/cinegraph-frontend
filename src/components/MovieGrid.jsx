import MovieCard from './MovieCard';
import Skeleton from './Skeleton';
import '../styles/MovieGrid.css';

export default function MovieGrid({
  movies, isLoading, isLoadingMore, isLiked, onToggleLike, onMovieClick,
  onLoadMore, hasMore, skeletonCount = 40, pageSize = 40,
}) {
  if (isLoading) {
    return (
      <div className="movie-grid" aria-busy="true">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <Skeleton key={i} className="card-skeleton" />
        ))}
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="empty-state">
        <h3>No movies on this shelf</h3>
        <p>Try a shorter title, check the spelling, or pick a different genre.</p>
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
          <button className="btn btn-outline" onClick={onLoadMore} disabled={isLoadingMore}>
            {isLoadingMore ? 'Loading…' : `Load ${pageSize} more`}
          </button>
        </div>
      )}
    </>
  );
}
