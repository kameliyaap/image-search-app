const FAVORITES_KEY = 'favorites';

export function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function isFavorite(photoId) {
  return getFavorites().some((p) => p.id === photoId);
}

export function toggleFavorite(photo) {
  const favorites = getFavorites();
  const exists = favorites.some((p) => p.id === photo.id);

  const updated = exists
    ? favorites.filter((p) => p.id !== photo.id)
    : [...favorites, photo];

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}