import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface UserInfo {
  nickname: string;
}

export default function HeaderButton() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null); // nickname 상태 추가
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가

  // accessToken 확인 및 nickname 가져오기
  useEffect(() => {
    const token = localStorage.getItem("access_token"); // LocalStorage에서 토큰 가져오기
    setAccessToken(token);

    if (token) {
      // 사용자 정보 가져오는 비동기 함수 호출
      fetchNickname(token);
    } else {
      setLoading(false); // 토큰이 없으면 바로 로딩 완료
    }
  }, []);

  // nickname 가져오는 함수
  const fetchNickname = async (token: string) => {
    try {
      const response = await fetch("https://your-api-endpoint.com/api/user/nickname", {
        // 실제 백엔드 API 경로로 수정
        method: "GET", // GET 요청을 보냅니다.
        headers: {
          Authorization: `Bearer ${token}`, // Authorization 헤더에 accessToken 추가
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNickname(data.nickname); // 닉네임 업데이트
        setLoading(false); // 로딩 완료
      } else {
        throw new Error("Failed to fetch nickname.");
      }
    } catch (error) {
      setError("닉네임을 불러오는데 실패했습니다.");
      setLoading(false); // 로딩 완료
    }
  };

  // 버튼 클릭 핸들러
  const handleClick = () => {
    if (!accessToken) {
      // 로그인 페이지로 이동
      window.location.href = "/auth/login";
    } else {
      alert("사용자 닉네임: " + nickname); // 닉네임 출력
    }
  };

  return (
    <StyledButton onClick={handleClick}>
      {loading ? "로딩 중..." : error ? error : accessToken ? nickname : "로그인"}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: 1px solid black; /* border-black */
`;
