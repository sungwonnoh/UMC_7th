import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  position: relative;
  width: 220px;
  height: 130px;
  border-radius: 20px;
  background-color: cornflowerblue;
  cursor: pointer;
`;
const Title = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  border-radius: 10px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
`;
export default function Category({ text, path }) {
  const navigate = useNavigate();
  return (
    <Box onClick={() => navigate(path)}>
      <Title>{text}</Title>
    </Box>
  );
}
