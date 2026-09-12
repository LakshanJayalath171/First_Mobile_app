//fetchMovies

import { useEffect, useState } from "react";

// fetchMovieDetails

// useFetch(fetchMovies)

const useFetch = <T>(fetchFunction: () => Promise<T>, autofetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    if (autofetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, fetchData, reset };
  export default useFetch;
};
