import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../component/card";

const API_KEY = "1f329821df085bdfe67fce7f8779e644";

export default function Popular() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&watch_region=KR&language=ko&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    getMovies();
  }, []);

  return <Card movies={movies} />;
}
