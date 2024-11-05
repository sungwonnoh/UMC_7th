// src/context/AuthContext.js
import { createContext, useContext, useState } from "react";

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트 만들기
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // 사용자 상태 관리

  // 로그인 함수
  const login = (email) => {
    setUser(email); // 로그인 시 이메일을 사용자로 설정
    localStorage.setItem("AccessToken", "access_token_example"); // AccessToken 저장
    localStorage.setItem("RefreshToken", "refresh_token_example"); // RefreshToken 저장
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null); // 사용자 정보 초기화
    localStorage.removeItem("AccessToken"); // 로컬스토리지에서 토큰 제거
    localStorage.removeItem("RefreshToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// AuthContext를 사용하는 커스텀 훅
export function useAuth() {
  return useContext(AuthContext);
}
