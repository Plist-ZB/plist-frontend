import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../layout/Header";
import FooterNavBar from "../../layout/FooterNavBar";

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
        <StreamList>
          {streams.map((stream, index) => (
            <StreamCard key={index}>
              <Thumbnail>
                <LiveBadge>Live</LiveBadge>
                썸네일
              </Thumbnail>
              <StreamDetails>
                <Title>
                  <b>{stream.title}</b>
                </Title>
                <Info>{stream.host}</Info>
                <Info>카테고리: {stream.category}</Info>
                <Info>스트리밍 시간: {stream.duration}</Info>
              </StreamDetails>
            </StreamCard>
          ))}
        </StreamList>
      </MainContent>
      <FooterNavBar />
    </Container>
  );
}

const streams = [
  {
    title: "발라드 추천 좀 해주세요~",
    host: "노지훈",
    category: "발라드, 가을",
    duration: "1시간 27분",
  },
  {
    title: "데이식스 전곡 듣기",
    host: "송유나",
    category: "밴드",
    duration: "1시간 27분",
  },
];

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

const StreamList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 8px;
`;

const StreamCard = styled.div`
  display: flex;
  gap: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
`;

//Live 뱃지
const LiveBadge = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  background: red;
  color: white;
  padding: 2px 4px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: regule;
`;

const Thumbnail = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  background: var(--color-primary-50);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 14px;
  color: black;
`;

const StreamDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-size: 16px;
  margin: 0;
`;

const Info = styled.p`
  margin: 4px 0;
  font-size: 14px;
  color: #555;
`;
