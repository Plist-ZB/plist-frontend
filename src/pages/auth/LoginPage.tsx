import styled from "styled-components";
import LogoIcon from "@/assets/svg/logo.svg";
import TextLogoIcon from "@/assets/svg/text-logo.svg";
import { FaGoogle } from "react-icons/fa";

const LOGIN_URL = import.meta.env.VITE_API_SERVER_DOMAIN + "/login/oauth2/code/google";

export default function LoginPage() {
  return (
    <Container>
      <LogoWrapper>
        <LogoIcon className="mr-1" />
        <TextLogoIcon />
      </LogoWrapper>
      <ButtonWrapper>
        <LoginButton href={LOGIN_URL} target="_self">
          <Icon>
            <FaGoogle />
          </Icon>
          <Text>Google 로그인</Text>
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
  color: #333333;
`;

const LoginButton = styled.a`
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
  color: #333333;

  &:hover {
    background-color: #f9f9f9;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const Icon = styled.span`
  font-size: 18px;
  color: #333333;
`;
