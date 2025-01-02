import React from "react";

export default function LoginPage() {
  return (
    <Container>
      <LogoWrapper>
        <Logo src={LogoIcon} alt="Logo" />
        <Title>PLIST</Title>
      </LogoWrapper>
      <ButtonWrapper>
        <LoginButton>
          <Icon>🔒</Icon>
          Google 로그인하기
        </LoginButton>
        {/*<LoginButton>
          <Icon>🔒</Icon>
          카카오 로그인하기
        </LoginButton>*/}
      </ButtonWrapper>
    </Container>
  );
}
