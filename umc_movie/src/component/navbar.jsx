import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: lightcoral;
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
export default function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <Nav>
        <Logo onClick={() => navigate("/")}>NETFLIX</Logo>
        <NavItems>
          <NavItem onClick={() => navigate("/login")}>로그인</NavItem>
          <NavItem onClick={() => navigate("/signup")}>회원가입</NavItem>
        </NavItems>
      </Nav>
    </>
  );
}
