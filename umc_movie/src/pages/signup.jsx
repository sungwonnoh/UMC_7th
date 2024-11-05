import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";

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
  align-items: center;
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
  background-color: #dc143c;
  color: white;
  margin: 10px;
  cursor: pointer;
`;
export default function SignUp() {
  const navigate = useNavigate();
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
    passwordCheck: yup
      .string()
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호 확인은 필수입니다."),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        email: data.email,
        password: data.password,
        passwordCheck: data.passwordCheck,
      });

      console.log(response.data); // 성공적인 응답 데이터 출력
      navigate("/login");
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      // 에러 발생 시 처리 (예: 사용자에게 알림)
    }
  };
  return (
    <>
      <Wrapper>
        <div>회원가입</div>
        <Container onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="email"
            placeholder=" 이메일을 입력해주세요"
            {...register("email", {
              required: { value: true, message: "required area" },
            })}
          ></InputField>
          {errors.email && <Error>{errors.email.message}</Error>}
          <InputField
            type="password"
            placeholder=" 비밀번호를 입력해주세요"
            {...register("password", {
              required: {
                value: true,
                message: " 비밀번호를 8자 이상이여야 합니다",
              },
            })}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
          <InputField
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            {...register("passwordCheck", {
              required: {
                value: true,
                message: "비밀번호 검증 또한 필수 입력요소입니다",
              },
            })}
          ></InputField>
          {errors.passwordCheck && (
            <Error>{errors.passwordCheck.message}</Error>
          )}
          <Button type="submit">제출</Button>
        </Container>
      </Wrapper>
    </>
  );
}
