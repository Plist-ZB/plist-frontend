import styled from "styled-components";
import LogoIcon from "@/assets/svg/logo.svg";
import TextLogoIcon from "@/assets/svg/text-logo.svg";
import { FcGoogle } from "react-icons/fc";
import LogoKakao from "@/assets/logo/kakao/logo-kakao.svg";
import LogoNaver from "@/assets/logo/naver/logo-naver.svg";

const LOGIN_URL = import.meta.env.VITE_API_SERVER_DOMAIN + "/oauth2/authorization";

export default function LoginPage() {
  return (
    <StyledContainer>
      <StyledLogoWrapper>
        <LogoIcon className="mr-1" />
        <TextLogoIcon />
      </StyledLogoWrapper>
      <GoogleLoginButton />
      <KakaoLoginButton />
      <NaverLoginButton />
    </StyledContainer>
  );
}

function GoogleLoginButton() {
  return (
    <StyledGoogleButton href={`${LOGIN_URL}/google`} target="_self">
      <StyledGoogleIcon>
        <FcGoogle />
      </StyledGoogleIcon>
      <StyledButtonText>Google 계정으로 로그인</StyledButtonText>
    </StyledGoogleButton>
  );
}

function KakaoLoginButton() {
  return (
    <StyledKakaoButton href={`${LOGIN_URL}/kakao`} target="_self">
      <StyledKakaoIcon>
        <LogoKakao />
      </StyledKakaoIcon>
      <StyledKakaoText>Kakao 계정으로 로그인</StyledKakaoText>
    </StyledKakaoButton>
  );
}

function NaverLoginButton() {
  return (
    <StyledNaverButton href={`${LOGIN_URL}/naver`} target="_self">
      <StyledNaverIcon>
        <LogoNaver />
      </StyledNaverIcon>
      <StyledButtonText>Naver 계정으로 로그인</StyledButtonText>
    </StyledNaverButton>
  );
}

// Styled-components
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
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

/* 카카오 */
const StyledKakaoButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 230px;
  height: 45px;
  background-color: #fee500;
  text-decoration: none;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #fee500;
  }
`;

const StyledKakaoIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background-color: #fee500;
  border-radius: 2px;
  margin-right: 12px;
  border: 1.5px solid #fee500;

  svg {
    font-size: 23px;
  }
`;

const StyledKakaoText = styled(StyledButtonText)`
  color: #000;
`;

/* 네이버 */
const StyledNaverButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 230px;
  height: 45px;
  background-color: #03c75a;
  text-decoration: none;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #03c75a;
  }
`;

const StyledNaverIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background-color: #03c75a;
  border-radius: 2px;
  margin-right: 12px;
  border: 1.5px solid #03c75a;

  svg {
    width: 40px;
    height: 40px;
  }
`;
