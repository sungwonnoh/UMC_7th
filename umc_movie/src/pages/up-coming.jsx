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
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjMyOTgyMWRmMDg1YmRmZTY3ZmNlN2Y4Nzc5ZTY0NCIsIm5iZiI6MTcyODE5NTU0MC44MzIwMzIsInN1YiI6IjY2MmQyYWViMDI4ZjE0MDEyMjY4ODI5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GxYapB6_nEqcdBLQDfXB1TCLvm1Z0pA9m7StOANdie0",
          },
        }
      );
      setMovies(response.data.results);
    };
    getMovies();
  }, []);

  return <Card movies={movies} />;
}
