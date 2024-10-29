import styled from "styled-components";
import Credit from "../component/Credit";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Wrapper = styled.div``;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
`;

const Contents = styled.div`
  position: relative;
  padding-left: 10px;
  margin-top: 5px;
  height: 60vh;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    z-index: 1;
  }
`;

const MovieInfo = styled.div`
  position: relative;
  z-index: 2;
`;

const InfoText = styled.div`
  color: white;
  padding: 10px;
  width: 60%;
`;

const Title = styled.h1``;

const Tagline = styled.p`
  font-size: 20px;
`;

const Rating = styled.div``;

const Overview = styled.div`
  margin-top: 10px;
`;

export default function Detail() {
  const { movie_id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    // 영화 세부 정보 가져오기
    const getMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie_id}?language=ko`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    getMovieDetails();
  }, [movie_id]);

  return (
    <div>
      <Wrapper>
        <Overlay />
        <Contents
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        >
          <MovieInfo>
            <InfoText>
              <Title>{movie.title}</Title>
              <Tagline>{movie.tagline}</Tagline>
              <Rating>평점: {movie.vote_average} / 10</Rating>
              <Overview>{movie.overview}</Overview>
            </InfoText>
          </MovieInfo>
        </Contents>
      </Wrapper>
      <Credit />
    </div>
  );
}