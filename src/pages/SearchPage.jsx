import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../auth/auth';
import { searchPhotos } from '../api/unsplash';
import { translateToEnglish } from '../api/translate';
import { getFavorites } from '../favorites/favorites';
import { useLanguage } from '../i18n/LanguageContext';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import ImageGrid from '../components/ImageGrid';
import LanguageSwitch from '../components/LanguageSwitch';
import Loading from '../components/states/Loading';
import ErrorState from '../components/states/ErrorState';
import EmptyState from '../components/states/EmptyState';
import InitialState from '../components/states/InitialState';
import ImageModal from '../components/ImageModal';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [retry, setRetry] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [translation, setTranslation] = useState(null);

  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const [orientation, setOrientation] = useState('');
  const [color, setColor] = useState('');
  const [orderBy, setOrderBy] = useState('relevant');

  const navigate = useNavigate();
  const { t } = useLanguage();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  function toggleFavoritesView() {
    if (!showFavorites) {
      setFavorites(getFavorites());
    }
    setShowFavorites(!showFavorites);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    setPage(1);
    setSearched(true);
    setRetry(retry + 1);
  }

  function handleCategoryClick(category) {
    setQuery(category);
    setPage(1);
    setSearched(true);
    setRetry(retry + 1);
  }

  function clearFilters() {
    setOrientation('');
    setColor('');
    setOrderBy('relevant');
    setPage(1);
  }

  function refreshFavorites() {
    setFavorites(getFavorites());
  }

  useEffect(() => {
    if (!query) return;

    async function run() {
      setLoading(true);
      setError('');

      try {
        const { text: searchQuery, translated, original } = await translateToEnglish(query);
        setTranslation(translated ? { from: original, to: searchQuery } : null);

        const result = await searchPhotos(searchQuery, { orientation, color, orderBy }, page);

        if (page === 1) {
          setPhotos(result.photos);
        } else {
          setPhotos((prev) => [...prev, ...result.photos]);
        }

        setTotalPages(result.totalPages);
      } catch (err) {
        if (!navigator.onLine) {
          setError(t.offline);
        } else if (err.message === '403') {
          setError(t.rateLimit);
        } else {
          setError(t.genericError);
        }
        setPhotos([]);
      } finally {
        setLoading(false);
      }
    }

    run();
  }, [orientation, color, orderBy, retry, page]);

  return (
    <div>
      <div className="header">
        <div className="header__brand">
          <span className="header__logo">IS</span>
          ImageSearch
        </div>
        <div className="header__actions">
          <button className="header__favorite" onClick={toggleFavoritesView}>
            {showFavorites ? t.search : t.saved}
          </button>
          <LanguageSwitch />
          <button className="header__logout" onClick={handleLogout}>{t.logoutBtn}</button>
        </div>
      </div>

      <div className="page">
        {showFavorites ? (
          favorites.length > 0 ? (
            <ImageGrid photos={favorites} onPhotoClick={setSelectedPhoto} />
          ) : (
            <div className="empty-state">
              <h2 className="state__title">{t.noFavoritesTitle}</h2>
              <p className="state__text">{t.noFavoritesText}</p>
            </div>
          )
        ) : !searched ? (
          <InitialState
            query={query}
            setQuery={setQuery}
            onSubmit={handleSubmit}
            onCategoryClick={handleCategoryClick}
          />
        ) : (
          <>
            <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} />

            <Filters
              orientation={orientation}
              setOrientation={setOrientation}
              color={color}
              setColor={setColor}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
            />

            {translation && !loading && !error && (
              <p className="translation-note">
                Резултати за "{translation.to}" (преведено от "{translation.from}")
              </p>
            )}

            {loading && page === 1 && <Loading />}

            {error && <ErrorState message={error} onRetry={() => setRetry(retry + 1)} />}

            {!loading && !error && photos.length === 0 && (
              <EmptyState query={query} onClearFilters={clearFilters} />
            )}

            {!error && photos.length > 0 && (
              <ImageGrid photos={photos} onPhotoClick={setSelectedPhoto} />
            )}

            {!error && photos.length > 0 && page < totalPages && (
              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <button
                  className="state__action"
                  onClick={() => setPage(page + 1)}
                  disabled={loading}
                >
                  {loading ? t.loadingText : t.loadMore}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedPhoto && (
        <ImageModal
         photo={selectedPhoto}
         onClose={() => setSelectedPhoto(null)}
         onFavoriteChange={refreshFavorites}
        />
)}
    </div>
  );
}

export default SearchPage;