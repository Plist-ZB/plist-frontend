import styled from "styled-components";
import LogoIcon from "@/assets/svg/logo.svg";
import TextLogoIcon from "@/assets/svg/text-logo.svg";
import { FcGoogle } from "react-icons/fc";

const LOGIN_URL = import.meta.env.VITE_API_SERVER_DOMAIN + "/login/oauth2/code/google";

export default function LoginPage() {
  return (
    <StyledContainer>
      <StyledLogoWrapper>
        <LogoIcon className="mr-1" />
        <TextLogoIcon />
      </StyledLogoWrapper>
      <GoogleLoginButton href={LOGIN_URL} />
    </StyledContainer>
  );
}

function GoogleLoginButton({ href }: { href: string }) {
  return (
    <StyledGoogleButton href={href} target="_self">
      <StyledGoogleIcon>
        <FcGoogle />
      </StyledGoogleIcon>
      <StyledButtonText>Google 계정으로 로그인</StyledButtonText>
    </StyledGoogleButton>
  );
}

// Styled-components
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
`;

const StyledLogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const StyledGoogleButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 230px;
  height: 45px;
  background-color: #4285f4;
  text-decoration: none;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #115dd7;
  }
`;

const StyledGoogleIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background-color: #fff;
  border-radius: 2px;
  margin-right: 12px;
  border: 1.5px solid #4285f4;

  svg {
    font-size: 23px;
  }
`;

const StyledButtonText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;
