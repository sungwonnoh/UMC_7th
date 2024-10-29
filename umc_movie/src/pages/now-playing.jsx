import { useEffect, useState } from "react";
import Card from "../component/card";
import axios from "axios";

export default function NowPlaying() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        }
      );
      setMovies(response.data.results); // 올바른 응답 구조로 변경
    };
    getMovies();
  }, []);

  return <Card movies={movies} />;
}
