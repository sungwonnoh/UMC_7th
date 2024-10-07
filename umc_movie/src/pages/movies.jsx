import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";
import Category from "../component/category";

const MovieWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const moviesData = [
  {
    text: "현재 상영중인",
    path: "/movies/now-playing",
  },
  {
    text: "인기있는",
    path: "/movies/popular",
  },
  {
    text: "높은 평가를 받은",
    path: "/movies/top-rated",
  },
  {
    text: "개봉 예정중인",
    path: "/movies/up-coming",
  },
];

export default function Movies() {
  const location = useLocation(); // 현재 경로를 가져옴

  // 현재 경로가 '/movies'이면 카테고리 목록을 렌더링하고, 하위 경로이면 카테고리 목록을 숨김
  const isCategoryPage = location.pathname === "/movies";

  return (
    <div>
      {isCategoryPage && (
        <>
          <h1>카테고리</h1>
          <MovieWrapper>
            {moviesData.map((movie, index) => (
              <Category key={index} text={movie.text} path={movie.path} />
            ))}
          </MovieWrapper>
        </>
      )}
      {/* 하위 경로에서 영화 리스트를 렌더링 */}
      <Outlet />
    </div>
  );
}
