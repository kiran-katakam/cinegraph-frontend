import '../styles/LikedSidebar.css';

export default function LikedSidebar({ open, likedMovies, onClose, onRemove, onRecommend, onMovieClick }) {
  return (
    <aside className={`liked-sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-header">
        <span className="sidebar-title">Your picks</span>
        <button className="sidebar-close" onClick={onClose}>✕</button>
      </div>

      <div className="liked-list">
        {likedMovies.size === 0 ? (
          <div className="empty-state">
            <div className="es-icon">🎬</div>
            <h3>Nothing yet</h3>
            <p>Click ♥ on movies you love</p>
          </div>
        ) : (
          [...likedMovies.values()].map(movie => (
            <LikedItem
              key={movie.movieId}
              movie={movie}
              onRemove={onRemove}
              onClick={onMovieClick}
            />
          ))
        )}
      </div>

      <div className="sidebar-footer">
        <button
          className="btn-recommend"
          disabled={likedMovies.size === 0}
          onClick={onRecommend}
        >
          ✦ Get Recommendations
        </button>
      </div>
    </aside>
  );
}

function LikedItem({ movie, onRemove, onClick }) {
  return (
    <div className="liked-item" onClick={() => onClick(movie.movieId)}>
      {movie.posterPath
        ? <img className="liked-item-img" src={movie.posterPath} alt="" />
        : <div className="liked-item-img liked-item-placeholder">🎬</div>}
      <span className="liked-item-title">{movie.title}</span>
      <button
        className="liked-item-remove"
        title="Remove"
        onClick={e => { e.stopPropagation(); onRemove(movie); }}
      >
        ✕
      </button>
    </div>
  );
}
