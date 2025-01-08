import React, { useEffect } from "react";
import styled from "styled-components";
import LogoIcon from "@/assets/svg/logo.svg";
import TextLogoIcon from "@/assets/svg/text-logo.svg";
import { ScaleLoader } from "react-spinners";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { instance } from "@/services/api/instance";

// React Query Client 생성
const queryClient = new QueryClient();

// API 호출 함수 (유저 정보 가져오기)
const fetchUserData = async (accessToken: string) => {
  const response = await instance.get("/users/1", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// 유저 정보를 가져오는 React Query 훅
function useUserData(accessToken: string) {
  return useQuery(["userData", accessToken], () => fetchUserData(accessToken), {
    enabled: !!accessToken, // accessToken이 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 유효
  });
}

export default function RedirectPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URL에서 accessToken 및 isMember 가져오기
  const accessToken = searchParams.get("access-token");
  const isMember = searchParams.get("is-Member");

  // React Query를 사용하여 유저 데이터 가져오기
  const { data: user, isLoading, isError } = useUserData(accessToken || "");

  useEffect(() => {
    if (!accessToken || !isMember) {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      return;
    }

    // Access token을 localStorage에 저장
    localStorage.setItem("access_token", accessToken);
  }, [accessToken, isMember]);

  useEffect(() => {
    // 유저 데이터가 성공적으로 로드된 후 페이지 이동
    if (user) {
      if (isMember === "true") {
        navigate("/"); // 홈페이지로 이동
      } else {
        navigate("/auth/welcome"); // Welcome 페이지로 이동
      }
    }
  }, [user, isMember, navigate]);

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <Container>
        <LogoWrapper>
          <LogoIcon />
          <TextLogoIcon />
        </LogoWrapper>
        <Spinners>
          <ScaleLoader
            color="#4654A3"
            height={40}
            margin={2}
            radius={0}
            speedMultiplier={0.7}
            width={6}
          />
        </Spinners>
      </Container>
    );
  }

  // 에러 처리
  if (isError) {
    alert("사용자 정보를 가져오는 데 실패했습니다. 다시 시도해주세요.");
    return null;
  }

  return null;
}

// 앱 전체에 React Query Provider 적용
export function AppWithQueryProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <RedirectPage />
    </QueryClientProvider>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Spinners = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  position: relative;
`;
