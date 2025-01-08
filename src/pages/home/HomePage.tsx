import styled from "styled-components";
import StreamList from "@/common/components/StreamList";
import { FaHeadphones } from "react-icons/fa";

export default function HomePage() {
  return (
    <Container>
      <MainContent>
        <CategoryButtons>
          <CategoryButton>최근</CategoryButton>
          <CategoryButton>인기</CategoryButton>
        </CategoryButtons>
        <StreamList />
        <HostButton>
          <FaHeadphones />
          <HostText>호스트</HostText>
        </HostButton>
      </MainContent>
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
  overflow-y: auto; /* 스크롤 가능 설정 */
  position: relative; /* HostButton이 MainContent 기준으로 움직임 */
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

const HostButton = styled.div`
  position: absolute; /* MainContent의 상대적 위치로 설정 */
  bottom: 16px;
  right: 16px;
  width: 65px;
  height: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid #888787;
  background-color: #ffffff;
  cursor: pointer;
  z-index: 10; /* 다른 콘텐츠 위로 표시 */
`;

const HostText = styled.span`
  margin-top: 4px;
  font-size: 14px;
  color: #000;
`;
