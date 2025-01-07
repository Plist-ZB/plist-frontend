import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface UserInfo {
  user_id: string;
}

export default function HeaderButton() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가

  // accessToken 확인 및 userInfo 가져오기
  useEffect(() => {
    const token = localStorage.getItem("access_token"); // LocalStorage에서 토큰 가져오기
    setAccessToken(token);

    if (token) {
      // 사용자 정보 가져오는 비동기 함수 호출
      fetchUserInfo(token);
    } else {
      setLoading(false); // 토큰이 없으면 바로 로딩 완료
    }
  }, []);

  // 사용자 정보 가져오는 함수 (예시)
  const fetchUserInfo = async (token: string) => {
    try {
      const response = await fetch("http://localhost:5000", {
        // 정확한 API 경로로 수정
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data); // userInfo 업데이트
        setLoading(false); // 로딩 완료
      } else {
        throw new Error("Failed to fetch user info.");
      }
    } catch (error) {
      setError("사용자 정보를 불러오는데 실패했습니다.");
      setLoading(false); // 로딩 완료
    }
  };

  // 버튼 클릭 핸들러
  const handleClick = () => {
    if (!accessToken) {
      // 로그인 페이지로 이동
      window.location.href = "/auth/login";
    } else {
      alert("사용자 정보: " + userInfo?.user_id); // user_id 출력
    }
  };

  return (
    <StyledButton onClick={handleClick}>
      {loading
        ? "로딩 중..."
        : error
        ? error
        : accessToken
        ? userInfo?.user_id || "정보 없음"
        : "로그인"}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: 1px solid black; /* border-black */
`;
