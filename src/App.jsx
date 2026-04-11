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
import { fetchMovies, fetchRecommendations, fetchMovie } from './utils/api';
import './styles/global.css';
import { BackendDownError } from './utils/api';

const PAGE_SIZE = 40;

export default function App() {
  const [movies, setMovies] = useState([]);
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
      if (err.isBackendDown) {
        showToast('⚠️ Server is offline. Try again later.');
      }
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

    try {
      const ids = [...likedMovies.keys()];
      const data = await fetchRecommendations(ids);
      setRecs(data);
    } catch (err) {
      if (err.isBackendDown) {
        showToast('⚠️ Server is offline. Try again later.');
      }
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
      if (err.isBackendDown) {
        showToast('⚠️ Server is offline. Try again later.');
      }
      console.error(err);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => { setModalMovie(null); setModalLoading(false); };

  const browseTitle = activeGenre || (searchQuery ? `"${searchQuery}"` : 'Top Rated');

  return (
    <>
      <Header
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        likedCount={likedMovies.size}
        onSidebarToggle={() => setSidebarOpen(o => !o)}
        onRecommend={getRecommendations}
      />

      <LikedSidebar
        open={sidebarOpen}
        likedMovies={likedMovies}
        onClose={() => setSidebarOpen(false)}
        onRemove={toggleLike}
        onRecommend={() => { getRecommendations(); setSidebarOpen(false); }}
        onMovieClick={openModal}
      />

      <main className="main-content">
        <GenreChips activeGenre={activeGenre} onSelect={setActiveGenre} />

        {showRecs && (
          <RecommendSection
            movies={recommendations}
            isLoading={isLoadingRecs}
            likedCount={likedMovies.size}
            isLiked={isLiked}
            onToggleLike={toggleLike}
            onMovieClick={openModal}
          />
        )}

        <div className="section-header">
          <span className="section-title">{browseTitle}</span>
          <span className="section-sub">Click a movie to learn more · ♥ to add to your picks</span>
        </div>

        <MovieGrid
          movies={movies}
          isLoading={isLoading && movies.length === 0}
          isLiked={isLiked}
          onToggleLike={toggleLike}
          onMovieClick={openModal}
          onLoadMore={() => loadMovies(false)}
          hasMore={hasMore}
          skeletonCount={PAGE_SIZE}
        />
      </main>

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
