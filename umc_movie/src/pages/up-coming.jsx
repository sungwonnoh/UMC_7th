import { useEffect, useState } from "react";
import Card from "../component/card";
import axios from "axios";

export default function Upcoming() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?language=ko&page=1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        }
      );
      setMovies(response.data.results);
    };
    getMovies();
  }, []);

  return <Card movies={movies} />;
}
