import React, { useEffect } from "react";
import styled from "styled-components";
import LogoIcon from "@/assets/logo.png";
import { ScaleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // URL에서 인가코드 가져오기
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get("code");

        if (!authorizationCode) {
          throw new Error("Authorization code not found.");
        }

        // 로그인 API 호출
        const response = await axios.post("/api/login", {
          code: authorizationCode,
        });

        const { member_type } = response.data;

        if (!member_type) {
          throw new Error("Member type not found in API response.");
        }

        // member_type에 따라 WelcomePage로 이동
        navigate("/WelcomePage", { state: { memberType: member_type } });
      } catch (error) {
        console.error("Error during login process:", error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    };

    handleRedirect();
  }, [navigate]);

  return (
    <Container>
      <LogoWrapper>
        <Logo src={LogoIcon} alt="Logo" />
        <LogoText>PLIST</LogoText>
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
