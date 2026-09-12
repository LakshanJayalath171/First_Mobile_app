export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
  },
};

export const fetchMovie = async ({ query }: { query: string }) => {
  const endPoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?api_key=${encodeURIComponent(TMDB_CONFIG.API_KEY ?? "")}&query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?api_key=${encodeURIComponent(TMDB_CONFIG.API_KEY ?? "")}&sort_by=popularity.desc`;

  if (!TMDB_CONFIG.API_KEY) {
    throw new Error("EXPO_PUBLIC_MOVIE_API_KEY is not configured");
  }

  const response = await fetch(endPoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies (${response.status})`);
  }
  const data = await response.json();
  return data.results;
};
