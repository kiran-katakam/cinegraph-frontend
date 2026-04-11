import { useState } from 'react';

export function useLikedMovies(showToast) {
  const [likedMovies, setLikedMovies] = useState(new Map());

  const toggleLike = (movie) => {
    setLikedMovies(prev => {
      const next = new Map(prev);
      if (next.has(movie.movieId)) {
        next.delete(movie.movieId);
        showToast(`Removed "${movie.title}"`);
      } else {
        next.set(movie.movieId, movie);
        showToast(`Added "${movie.title}" to picks`);
      }
      return next;
    });
  };

  const isLiked = (movieId) => likedMovies.has(movieId);

  return { likedMovies, toggleLike, isLiked };
}
