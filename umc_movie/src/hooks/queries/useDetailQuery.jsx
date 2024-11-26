import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCustomDetail(movie_id) {
  const fetchMovieDetails = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}?language=ko`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      }
    );
    return response.data;
  };

  // useQuery로 데이터를 불러오고, 자동으로 loading, error 상태를 관리
  const {
    data: movie,
    isLoading: loading,
    error,
  } = useQuery(["movieDetail", movie_id], fetchMovieDetails);

  return { movie, loading, error };
}
