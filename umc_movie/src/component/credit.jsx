import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid black;
`;
const Name = styled.div`
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
`;
export default function Credit() {
  const { movie_id } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getCredit = async () => {
      const temp = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        }
      );
      setMovies(temp.data.cast);
    };
    getCredit();
  }, [movie_id]);
  return (
    <div>
      <h1>감독/출연</h1>
      <div>
        <Wrapper>
          {movies.map((person) => (
            <Card key={person.id}>
              <Img
                src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                alt={person.name}
              />
              <Name>{person.name}</Name>
            </Card>
          ))}
        </Wrapper>
      </div>
    </div>
  );
}
