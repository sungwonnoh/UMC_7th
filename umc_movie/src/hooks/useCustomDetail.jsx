import { useState, useEffect } from "react";
import axios from "axios";

export default function useCustomDetail(movie_id) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie_id}?language=ko`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        setMovie(response.data);
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movie_id]);

  return { movie, loading, error };
}
