import React, { useState } from "react";
import styled from "styled-components";
import FooterNavBar from "../../layout/FooterNavBar";
import StreamList from "@/common/components/StreamList";

export default function HomePage() {
  // 카테고리 토글바 구현현
  const [isOpen, setIsOpen] = useState(false);

  // 토글바 열기/닫기
  const toggleBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <MainContent>
        <CategoryButtons>
          <CategoryButton>최근</CategoryButton>
          <CategoryButton>인기</CategoryButton>
        </CategoryButtons>
        <StreamList />
      </MainContent>
      <FooterNavBar />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

const CategoryButtons = styled.div`
  display: flex;
  gap: 8px;
  margin: 16px 0;
  color: var(--color-gray-dark);
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: var(--color-white);
  cursor: pointer;
`;
