import styled from "styled-components";
import LogoIcon from "@/assets/svg/logo.svg";
import TextLogoIcon from "@/assets/svg/text-logo.svg";
import { FcGoogle } from "react-icons/fc";

const LOGIN_URL = import.meta.env.VITE_API_SERVER_DOMAIN + "/login/oauth2/code/google";

export default function LoginPage() {
  return (
    <Container>
      {/* 로고 */}
      <LogoWrapper>
        <LogoIcon className="mr-1" />
        <TextLogoIcon />
      </LogoWrapper>

      {/* 구글 스타일 로그인 버튼 */}
      <StyledGoogleButton href={LOGIN_URL} target="_self">
        <GoogleIcon>
          <FcGoogle />
        </GoogleIcon>
        <ButtonText>Google 계정으로 로그인</ButtonText>
      </StyledGoogleButton>
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

const StyledGoogleButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 280px;
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #4285f4;
  border: 1px solid #dcdcdc;
  text-decoration: none;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #357ae8;
  }
`;

const GoogleIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background-color: #fff;
  border-radius: 2px;
  margin-right: 12px;

  svg {
    font-size: 24px;
  }
`;

const ButtonText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;
