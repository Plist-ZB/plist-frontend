import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../layout/Header";
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
      <Header />
      <MainContent>
        <CategoryButtons>
          <CategoryButton>최근</CategoryButton>
          <CategoryButton>인기</CategoryButton>
          <CategoryButtonRight onClick={toggleBar}>
            카테고리
            {/* 토글바 */}
            <ToggleBar isOpen={isOpen}>
              <p>여기에 카테고리 관련 내용을 넣을 수 있습니다.</p>
            </ToggleBar>
          </CategoryButtonRight>
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

const CategoryButtonRight = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: var(--color-white);
  cursor: pointer;
  margin-left: auto;
  position: relative; /* 토글바가 버튼 외부에서 나오도록 상대적 위치 지정 */
`;

// 토글바 스타일
const ToggleBar = styled.div`
  position: absolute;
  top: 110%; /* 버튼 바로 아래에 위치 */
  right: 0; /* 토글바 오른쪽 열림 */
  width: 500px;
  height: 200px;
  background-color: #f4f4f4;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-height: ${(props) => (props.isOpen ? "300px" : "0")}; /* isOpen 상태에 따라 높이 설정 */
  overflow: hidden; /* 내용이 넘치지 않게 숨김 */
  transition: max-height 0.3s ease-in-out; /* 부드러운 애니메이션 */
`;
