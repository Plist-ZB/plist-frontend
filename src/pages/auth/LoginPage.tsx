import React from "react";
import styled from "styled-components";
import LogoIcon from "@/assets/svg/logo.svg";
import TextLogoIcon from "@/assets/svg/text-logo.svg";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {

  return (
    <Container>
      <LogoWrapper>
        <LogoIcon />
        <TextLogoIcon />
      </LogoWrapper>
      <ButtonWrapper>
            <FaGoogle />
          </Icon>
          <Text>google 로그인</Text>
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 80%;
`;

const Text = styled.div`
  color: #4854a2;
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
