import MovieCard from './MovieCard';
import Skeleton from './Skeleton';
import '../styles/RecommendSection.css';

export default function RecommendSection({ movies, isLoading, likedCount, isLiked, onToggleLike, onMovieClick }) {
  return (
    <section className="recommend-section">
      <div className="recommend-header">
        <span className="recommend-icon">✦</span>
        <div>
          <h2>Recommended for you</h2>
          <p>Based on {likedCount} movie{likedCount !== 1 ? 's' : ''} you loved</p>
        </div>
      </div>

      <div className="movie-grid">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} className="card-skeleton" />)
          : movies.length
            ? movies.map((movie, i) => (
                <MovieCard
                  key={`rec-${movie.movieId}-${i}`}
                  movie={movie}
                  isLiked={isLiked}
                  onToggleLike={onToggleLike}
                  onClick={onMovieClick}
                />
              ))
            : (
              <div className="empty-state" style={{ gridColumn: '1/-1' }}>
                <div className="es-icon">🤔</div>
                <h3>Hmm, nothing found</h3>
                <p>Try liking more movies for better results</p>
              </div>
            )}
      </div>
    </section>
  );
}
