import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import SearchMovieList from "../component/Movie/search-movie";

const Wrapper = styled.div`
  margin-top: 20px;
`;
const SearchLine = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
`;
const Input = styled.input`
  width: 800px;
  height: 30px;
  border-radius: 5px;
`;
const Button = styled.button`
  background-color: #dc143c;
  color: white;
  border: none;
  border-radius: 5px;
  width: 60px;
  height: 35px;
  cursor: pointer;
`;

export default function Search() {
  const [searchMovie, setSearchMovie] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const mq = searchParams.get("mq") || ""; // mq에서 검색어를 가져옴
  const navigate = useNavigate();

  const onChangeSearchMovie = (e) => {
    setSearchMovie(e.target.value);
  };

  const handleSearchMovie = () => {
    if (mq === searchMovie) return;
    console.log("검색어:", searchMovie);
    setSearchParams({ mq: searchMovie }); // 쿼리 파라미터 업데이트
    navigate(`/search?mq=${searchMovie}`);
  };

  const handleSearchMovieWithKeyboard = (e) => {
    if (e.key === "Enter") {
      handleSearchMovie();
    }
  };

  return (
    <Wrapper>
      <SearchLine>
        <Input
          placeholder="영화 제목을 입력해주세요"
          value={searchMovie}
          onChange={onChangeSearchMovie}
          onKeyPress={handleSearchMovieWithKeyboard}
        />
        <Button type="submit" onClick={handleSearchMovie}>
          검색
        </Button>
      </SearchLine>
      <SearchMovieList searchMovie={searchMovie} />
    </Wrapper>
  );
}
