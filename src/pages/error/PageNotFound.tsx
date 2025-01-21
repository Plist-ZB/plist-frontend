import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import TextLogoIcon from "@/assets/svg/text-logo.svg";
// import LogoIcon from "@/assets/svg/logo.svg";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <Container>
      {/* <LogoWrapper>
        <LogoIcon className="mr-1" />
        <TextLogoIcon />
      </LogoWrapper> */}
      <Not>404</Not>
      <Message>페이지를 찾을 수 없습니다.</Message>
      <Button onClick={handleHomeRedirect}>홈으로 가기</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  font-family: "Arial", sans-serif;
`;

// const LogoWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: 40px;
// `;

const Not = styled.div`
  font-size: 50px;
  color: var(--color-primary);
  text-align: center;
`;

const Message = styled.div`
  font-size: 24px;
  color: var(--color-primary);
  margin-bottom: 24px;
  text-align: center;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  color: var(--color-primary);
  border: 1px solid #4a4a4a;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f4f4f4;
  }
`;

export default PageNotFound;
