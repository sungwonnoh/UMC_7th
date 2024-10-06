import { CiSearch } from "react-icons/ci";
import { MdMovie } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 250px;
  height: 100%;
  position: fixed;
  left: 0;
  background-color: salmon;
`;
const SideItems = styled.div`
  gap: 20px;
  flex-grow: 1;
`;
const SideItem = styled.div`
  color: white;
  cursor: pointer;
  padding: 15px;
`;
export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <>
      <Wrapper>
        <SideItems>
          <SideItem onClick={() => navigate("/search")}>
            <CiSearch /> 검색
          </SideItem>
          <SideItem onClick={() => navigate("/movies")}>
            <MdMovie /> 영화
          </SideItem>
        </SideItems>
      </Wrapper>
    </>
  );
}
