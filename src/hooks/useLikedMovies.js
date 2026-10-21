import { useState } from 'react';
import { formatTitle } from '../utils/format';

export function useLikedMovies(showToast) {
  const [likedMovies, setLikedMovies] = useState(new Map());

  const toggleLike = (movie) => {
    setLikedMovies(prev => {
      const next = new Map(prev);
      if (next.has(movie.movieId)) {
        next.delete(movie.movieId);
        showToast(`Removed ${formatTitle(movie.title)} from your stack`);
      } else {
        next.set(movie.movieId, movie);
        showToast(`Added ${formatTitle(movie.title)} to your stack`);
      }
      return next;
    });
  };

  const isLiked = (movieId) => likedMovies.has(movieId);

  return { likedMovies, toggleLike, isLiked };
}
