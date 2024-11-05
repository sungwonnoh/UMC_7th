import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext"; // AuthContext에서 로그인 상태 가져오기

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #00043b;
  height: 50px;
  padding: 5px 20px;
`;

const Logo = styled.div`
  color: crimson;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

const NavItems = styled.div`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.div`
  color: white;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  display: inline-block;
  &:hover {
    background-color: crimson;
  }
`;
const Greeting = styled.div`
  color: white;
  padding: 5px;
`;
export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // AuthContext에서 로그인 상태와 logout 함수 가져오기

  return (
    <Nav>
      <Logo onClick={() => navigate("/")}>NETFLIX</Logo>
      <NavItems>
        {user ? (
          <>
            <Greeting>{user.split("@")[0]}님, 안녕하세요!</Greeting>
            <NavItem onClick={logout}>로그아웃</NavItem>
          </>
        ) : (
          <>
            <NavItem onClick={() => navigate("/login")}>로그인</NavItem>
            <NavItem onClick={() => navigate("/signup")}>회원가입</NavItem>
          </>
        )}
      </NavItems>
    </Nav>
  );
}
