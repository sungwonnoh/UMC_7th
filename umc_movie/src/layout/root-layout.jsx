import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar";
import Sidebar from "../component/sidebar";
import styled from "styled-components";
const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;
const MainLayout = styled.div`
  display: flex;
  margin-top: 60px;
  height: calc(100vh - 60px);
  margin-left: 250px;
  //background-color: lightslategray;
`;

const OutletWrapper = styled.div`
  flex: 1;
  //padding: 20px;
`;
export default function RootLayout() {
  return (
    <>
      <Header>
        <Navbar />
      </Header>
      <Sidebar />
      <MainLayout>
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </MainLayout>
    </>
  );
}
