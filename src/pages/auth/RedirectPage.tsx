import React, { useEffect } from "react";
import styled from "styled-components";
import LogoIcon from "@/assets/svg/logo.svg";
import TextLogoIcon from "@/assets/svg/text-logo.svg";
import { ScaleLoader } from "react-spinners";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function RedirectPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 리다이렉트된 URL에서 토큰 처리
  useEffect(() => {
    const accessToken = searchParams.get("access");
    const isMember = searchParams.get("isMember");

    // access_token이 없으면 오류 처리
    if (!accessToken || isMember === null) {
      alert("로그인에 실패했습니다다. 다시 시도해주세요.");
      return;
    }

    // Access token을 localStorage에 저장
    localStorage.setItem("access_token", accessToken);

    // 사용자 상태에 따라 페이지 이동
    if (isMember === "true") {
      navigate("/"); // 홈페이지로 이동
    } else {
      navigate("/welcome"); // Welcome 페이지로 이동
    }
  }, [searchParams, navigate]);

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

const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoText = styled.h1`
  font-size: 24px;
  color: #4654a3;
  font-weight: bold;
  margin: 0;
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
