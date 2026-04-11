const BASE = import.meta.env.VITE_API_URL;

async function apiFetch(path, options) {
  let res;

  try {
    res = await fetch(`${BASE}${path}`, options);
  } catch (err) {
    // Network failure — backend is down / unreachable
    throw new BackendDownError();
  }

  if (res.status === 503) {
    throw new BackendDownError('Service temporarily unavailable (503). Try again in a moment.');
  }

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

// Custom error class so callers can distinguish backend-down from other errors
export class BackendDownError extends Error {
  constructor(msg = 'Cannot reach the server. Make sure the backend is running on port 3001.') {
    super(msg);
    this.name = 'BackendDownError';
    this.isBackendDown = true;
  }
}

export async function fetchMovies({ query = '', genre = null, skip = 0, limit = 40 }) {
  if (genre) {
    const { movies } = await apiFetch(`/genre/${encodeURIComponent(genre)}?limit=${limit}&skip=${skip}`);
    return movies;
  }
  const { movies } = await apiFetch(`/movies/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`);
  return movies;
}

export async function fetchGenres() {
  const { genres } = await apiFetch('/genres');
  return genres;
}

export async function fetchMovie(movieId) {
  return apiFetch(`/movies/${movieId}`);
}

export async function fetchRecommendations(movieIds) {
  const { movies } = await apiFetch('/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ movieIds }),
  });
  return movies;
}