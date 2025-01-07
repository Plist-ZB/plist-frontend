import React from "react";
import styled from "styled-components";
import LogoIcon from "@/assets/logo.png";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {

  return (
    <Container>
      <LogoWrapper>
        <Logo src={LogoIcon} alt="Logo" />
        <Title>PLIST</Title>
      </LogoWrapper>
      <ButtonWrapper>
            <FaGoogle />
          </Icon>
          Google 로그인하기
        </LoginButton>
      </ButtonWrapper>
    </Container>
  );
}

// Styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #4a4a4a;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 80%;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background-color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: #f9f9f9;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const Icon = styled.span`
  font-size: 18px;
`;
