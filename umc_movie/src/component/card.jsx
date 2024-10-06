import { useState } from "react";
import styled from "styled-components";
import { MOVIES } from "../mocks/api";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
`;

const MovieCard = styled.div`
  position: relative;
  width: 130px;
  cursor: pointer;
  transition: transform 0.3s;
`;

const Overlay = styled.div`
  position: absolute;
  width: 130px;
  height: 200px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const MovieImage = styled.img`
  width: 130px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const MovieTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
  text-align: center;
`;

const MovieDate = styled.div`
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-top: 5px;
`;

export default function Card() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const onMouseEnter = (movie) => {
    setSelectedMovie(movie);
  };

  const onMouseLeave = () => {
    setSelectedMovie(null);
  };

  return (
    <Wrapper>
      {MOVIES.results.map((movie, i) => (
        <MovieCard
          key={i}
          onMouseEnter={() => onMouseEnter(movie)}
          onMouseLeave={onMouseLeave}
        >
          <div>
            {selectedMovie === movie ? <Overlay /> : null}
            <MovieImage
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            />
          </div>
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieDate>{movie.release_date}</MovieDate>
        </MovieCard>
      ))}
    </Wrapper>
  );
}
