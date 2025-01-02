import styled, { keyframes } from "styled-components";
import LogoIcon from "@/assets/logo.png";
import { ScaleLoader } from "react-spinners";

export default function RedirectPage() {
  return <div>RedirectPage</div>;
  return (
    <Container>
      <LogoWrapper>
        <Logo src={LogoIcon} alt="Logo" />
        <LogoText>PLIST</LogoText>
      </LogoWrapper>
      <Spinners>
        <ScaleLoader
          color="#4654A3"
          height={40}
          margin={2}
          radius={0}
          speedMultiplier={0.7}
          width={6}
        />
      </Spinners>
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

const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoText = styled.h1`
  font-size: 24px;
  color: #4654a3;
  font-weight: bold;
  margin: 0;
`;

const Spinners = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  position: relative;
`;
