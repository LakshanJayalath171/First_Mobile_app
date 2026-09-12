export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3/authentication",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovie = async ({ query }: { query: string }) => {
  const endPoint = query
    ? `${TMDB_CONFIG.BASE_URL}/discover/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endPoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return data.results;
};

const url = "https://api.themoviedb.org/3/authentication";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTBiMDE1ZmFiMjVjMzg5ZmJmNzAzYmQwZWRhYzRiMSIsIm5iZiI6MTc0NjM1MTAyMS4zNCwic3ViIjoiNjgxNzMzYWRmM2IzMDkzZDA2NTdjODQyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.DiQvFJufkGEu5ZKtpRRSPnz85QhMjZqC62W1rsTZxtQ",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error(err));
