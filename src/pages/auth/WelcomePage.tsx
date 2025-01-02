import React from "react";
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
