import React, { useEffect } from "react";
import styled from "styled-components";
import LogoIcon from "@/assets/svg/logo.svg";
import TextLogoIcon from "@/assets/svg/text-logo.svg";
import { ScaleLoader } from "react-spinners";
import { useNavigate, useSearchParams } from "react-router-dom";
import { instance } from "@/services/api/instance";

export default function RedirectPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 리다이렉트된 URL에서 토큰 처리
  useEffect(() => {
    const accessToken = searchParams.get("access-token");
    const isMember = searchParams.get("is-Member");
    console.log("isMember:", isMember);

    // access_token이 없으면 오류 처리
    if (!accessToken || !isMember) {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      return;
    }

    // Access token을 localStorage에 저장
    localStorage.setItem("access_token", accessToken);

    // 사용자 정보를 가져오는 API 요청
    const fetchUserData = async () => {
      try {
        // mock API 호출
        const response = await instance.get("/users/1");
        const user = response.data;

        // user 데이터가 없으면 사용자 정보를 가져오는 데 실패한 것으로 간주
        if (!user) {
          alert("사용자 정보를 가져오는 데 실패했습니다.");
          return;
        }

        console.log("User data:", user);

        // 사용자 상태에 따라 페이지 이동
        if (isMember === "true") {
          navigate("/"); // 홈페이지로 이동
        } else {
          navigate("/auth/welcome"); // Welcome 페이지로 이동
        }
      } catch (error) {
        // axios 요청에서 오류가 발생하면 여기로 이동
        console.error("Error fetching user data:", error);
        alert("사용자 정보를 가져오는 데 실패했습니다. 다시 시도해주세요.");
      }
    };

    fetchUserData();
  }, [searchParams, navigate]); // 의존성 배열에서 불필요한 상태 제거

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
