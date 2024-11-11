import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../card";

export default function SearchMovieList({ searchMovie }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&include_adult=false&language=ko&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        const movieResults = response.data.results || [];
        setMovies(Array.isArray(movieResults) ? movieResults : []); // 배열이 아니면 빈 배열로 설정
      } catch (error) {
        console.error("API 요청 중 오류가 발생했습니다:", error);
        setMovies([]); // 오류가 발생하면 빈 배열로 설정
      }
    };

    if (searchMovie) {
      getMovies();
    }
  }, [searchMovie]);

  return (
    <>
      {Array.isArray(movies) && movies.length > 0 ? (
        <Card movies={movies} />
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </>
  );
}
