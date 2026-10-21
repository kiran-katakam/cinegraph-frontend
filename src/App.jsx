import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import GenreChips from './components/GenreChips';
import MovieGrid from './components/MovieGrid';
import RecommendSection from './components/RecommendSection';
import LikedSidebar from './components/LikedSidebar';
import MovieModal from './components/MovieModal';
import Toast from './components/Toast';
import { useToast } from './hooks/useToast';
import { useLikedMovies } from './hooks/useLikedMovies';
import { fetchMovies, fetchRecommendations, fetchMovie, fetchGenres } from './utils/api';
import './styles/global.css';

const PAGE_SIZE = 40;
const OFFLINE_MSG = "Can't reach the CineGraph server. Check the backend is running, then try again.";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [recommendations, setRecs] = useState([]);
  const [activeGenre, setActiveGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSkip, setCurrentSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);
  const [showRecs, setShowRecs] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalMovie, setModalMovie] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const { toast, showToast } = useToast();
  const { likedMovies, toggleLike, isLiked } = useLikedMovies(showToast);

  useEffect(() => {
    fetchGenres().then(setGenres).catch(console.error);
  }, []);

  // ── Load movies (reset or append) ──
  const loadMovies = useCallback(async (reset = false) => {
    if (isLoading) return;
    setIsLoading(true);
    const skip = reset ? 0 : currentSkip;

    try {
      const data = await fetchMovies({ query: searchQuery, genre: activeGenre, skip, limit: PAGE_SIZE });
      setMovies(prev => reset ? data : [...prev, ...data]);
      setHasMore(data.length === PAGE_SIZE);
      setCurrentSkip(skip + data.length);
    } catch (err) {
      if (err.isBackendDown) showToast(OFFLINE_MSG);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, activeGenre, currentSkip, isLoading]);

  // ── Reset on filter change ──
  useEffect(() => { loadMovies(true); }, [searchQuery, activeGenre]); // eslint-disable-line

  // ── Recommendations ──
  const getRecommendations = async () => {
    if (!likedMovies.size) return;
    setShowRecs(true);
    setIsLoadingRecs(true);
    setSidebarOpen(false);
    requestAnimationFrame(() => document.getElementById('picks')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));

    try {
      const ids = [...likedMovies.keys()];
      const data = await fetchRecommendations(ids);
      setRecs(data);
    } catch (err) {
      if (err.isBackendDown) showToast(OFFLINE_MSG);
      console.error(err);
      setRecs([]);
    } finally {
      setIsLoadingRecs(false);
    }
  };

  // ── Modal ──
  const openModal = async (movieId) => {
    setModalMovie(null);
    setModalLoading(true);
    try {
      const data = await fetchMovie(movieId);
      setModalMovie(data);
    } catch (err) {
      if (err.isBackendDown) showToast(OFFLINE_MSG);
      console.error(err);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = useCallback(() => { setModalMovie(null); setModalLoading(false); }, []);

  const activeCount = genres.find(g => g.name === activeGenre)?.count;
  const browseTitle = activeGenre || (searchQuery ? `Results for “${searchQuery}”` : 'Top rated');
  const browseSub = activeGenre && activeCount
    ? `${activeCount.toLocaleString()} movies, best rated first`
    : searchQuery ? null : 'Best rated across the whole catalog';

  return (
    <>
      <Header onSearch={setSearchQuery} likedCount={likedMovies.size} />

      <GenreChips genres={genres} activeGenre={activeGenre} onSelect={setActiveGenre} />

      <div className="floor">
        <main className="wall">
          {showRecs && (
            <RecommendSection
              movies={recommendations}
              isLoading={isLoadingRecs}
              likedCount={likedMovies.size}
              isLiked={isLiked}
              onToggleLike={toggleLike}
              onMovieClick={openModal}
              onClose={() => setShowRecs(false)}
            />
          )}

          <section aria-labelledby="wall-title">
            <div className="sign-head">
              <h2 id="wall-title" className="sign-title">{browseTitle}</h2>
              {browseSub && <span className="sign-sub">{browseSub}</span>}
            </div>

            <MovieGrid
              movies={movies}
              isLoading={isLoading && movies.length === 0}
              isLoadingMore={isLoading && movies.length > 0}
              isLiked={isLiked}
              onToggleLike={toggleLike}
              onMovieClick={openModal}
              onLoadMore={() => loadMovies(false)}
              hasMore={hasMore}
              skeletonCount={PAGE_SIZE}
              pageSize={PAGE_SIZE}
            />
          </section>
        </main>

        <LikedSidebar
          open={sidebarOpen}
          likedMovies={likedMovies}
          onToggle={() => setSidebarOpen(o => !o)}
          onRemove={toggleLike}
          onRecommend={getRecommendations}
          onMovieClick={openModal}
        />
      </div>

      {(modalLoading || modalMovie) && (
        <MovieModal
          movie={modalMovie}
          loading={modalLoading}
          isLiked={modalMovie ? isLiked(modalMovie.movieId) : false}
          onToggleLike={toggleLike}
          onClose={closeModal}
        />
      )}

      <Toast message={toast} />
    </>
  );
}
