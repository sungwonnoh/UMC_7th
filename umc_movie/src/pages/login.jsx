import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext"; // AuthContext에서 useAuth 가져오기

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 20px;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  width: 370px;
  height: 50px;
  border-radius: 10px;
  border: 1px black solid;
  margin: 10px;
`;

const Error = styled.div`
  color: red;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 380px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => (props.disabled ? "gray" : "#dc143c")};
  color: white;
  margin: 10px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // login 함수 가져오기

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("유효한 이메일 주소를 입력하세요")
      .required("이메일은 필수입니다."),
    password: yup
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 최대 16자 이하이어야 합니다.")
      .required("비밀번호는 필수입니다."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: data.email,
        password: data.password,
      });
      const { accessToken, refreshToken } = response.data;

      // AuthContext에 로그인 상태 업데이트
      login(data.email); // 사용자 이메일로 로그인 상태 설정

      // 로컬스토리지에 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <Wrapper>
        <div>로그인 페이지</div>
        <Container onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="email"
            placeholder=" 이메일을 입력해주세요"
            {...register("email")}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
          <InputField
            type="password"
            placeholder=" 비밀번호를 입력해주세요"
            {...register("password")}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
          <Button type="submit" disabled={!isValid}>
            로그인
          </Button>
        </Container>
      </Wrapper>
    </>
  );
}
