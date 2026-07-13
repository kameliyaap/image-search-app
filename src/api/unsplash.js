const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const BASE_URL = 'https://api.unsplash.com/search/photos';

export async function searchPhotos(query, filters = {}, page = 1) {
  const params = new URLSearchParams({
    query,
    page,
    per_page: 20,
  });

  if (filters.orientation) params.append('orientation', filters.orientation);
  if (filters.color) params.append('color', filters.color);
  if (filters.orderBy) params.append('order_by', filters.orderBy);

  const response = await fetch(`${BASE_URL}?${params}`, {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  const data = await response.json();

  return {
    photos: data.results,
    total: data.total,
    totalPages: data.total_pages,
  };
}