import React from "react";
import styled from "styled-components";
import LogoIcon from "@/assets/logo.png";

export default function WelcomePage() {
  return (
    <Container>
      <LogoWrapper>
        <Logo src={LogoIcon} alt="Logo" />
        <LogoText>PLIST</LogoText>
      </LogoWrapper>
      <MessageWrapper>
        <WelcomeText>가입을 환영합니다!</WelcomeText>
        <SubText>플리스트와 함께 즐거운 음악을 공유해요!</SubText>
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
