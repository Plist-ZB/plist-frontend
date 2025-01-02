<<<<<<< HEAD
<<<<<<< HEAD
import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LogoIcon from "@/assets/logo.png";

export default function WelcomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    //3초 후 메인 화면(/main)으로 이동
    const timer = setTimeout(() => {
      navigate("/HomePage");
    }, 3000);

    //컴포넌트가 언마운트되면 타이머를 클리어
    return () => clearTimeout(timer);
  }, [navigate]);

=======
import React from "react";
=======
import React, { useEffect } from "react";
>>>>>>> c27ea22 (feat : HomePage로 페이지 이동)
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LogoIcon from "@/assets/logo.png";

export default function WelcomePage() {
<<<<<<< HEAD
>>>>>>> 0ee09b7 (feat : Welcome 페이지 JSX)
=======
  const navigate = useNavigate();

  useEffect(() => {
    // 3초 후 메인 화면(/main)으로 이동
    const timer = setTimeout(() => {
      navigate("/HomePage");
    }, 3000);

    // 컴포넌트가 언마운트되면 타이머를 클리어
    return () => clearTimeout(timer);
  }, [navigate]);

>>>>>>> c27ea22 (feat : HomePage로 페이지 이동)
  return (
    <Container>
      <LogoWrapper>
        <Logo src={LogoIcon} alt="Logo" />
        <LogoText>PLIST</LogoText>
      </LogoWrapper>
      <MessageWrapper>
        <WelcomeText>가입을 환영합니다!</WelcomeText>
        <SubText>플리스트와 함께 즐거운 음악을 공유해요!</SubText>
<<<<<<< HEAD
        <SubText1>3초뒤 자동으로 메인화면으로 이동합니다.</SubText1>
=======
>>>>>>> 0ee09b7 (feat : Welcome 페이지 JSX)
      </MessageWrapper>
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
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 8px;
`;

const LogoText = styled.h1`
  font-size: 24px;
  color: #4654a3;
  font-weight: bold;
  margin: 0;
`;

const MessageWrapper = styled.div`
  text-align: center;
`;

const WelcomeText = styled.h2`
  font-size: 30px;
  font-weight: bold;
  color: #333;
  margin: 0;
  margin-bottom: 8px;
`;

const SubText = styled.p`
  font-size: 20px;
  color: #666;
  margin: 0;
`;
<<<<<<< HEAD

const SubText1 = styled.p`
  font-size: 15px;
  color: #4654a3;
  margin: 10px;
`;
=======
>>>>>>> 2f7a5f0 (feat : Welcome 페이지 style)
