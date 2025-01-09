import styled from "styled-components";
import StreamList from "@/common/components/StreamList";
import { Headphones } from "lucide-react";
import { overlay } from "overlay-kit";
import HostAdd from "./components/HostAdd";

export default function HomePage() {
  return (
    <Container>
      <MainContent>
        <CategoryButtons>
          <CategoryButton>최근</CategoryButton>
          <CategoryButton>인기</CategoryButton>
        </CategoryButtons>
        <StreamList />
      </MainContent>
      <HostButton
        onClick={() =>
          overlay.open(({ isOpen, unmount }) => <HostAdd isOpen={isOpen} onClose={unmount} />)
        }
      >
        <Headphones />
        <HostText>호스트</HostText>
      </HostButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 16px;
`;

const CategoryButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  color: var(--color-gray-dark);
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: var(--color-white);
  cursor: pointer;
`;
<<<<<<< HEAD

const HostButton = styled.button`
  position: fixed; /* 화면 기준으로 설정 */
  bottom: calc(20px + var(--height-fnb));
  right: 12px;
  padding: 0;
  width: 64px;
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--color-gray-dark);
  background-color: #ffffff;
  z-index: 10; /* 다른 콘텐츠 위로 표시 */

  @media screen and (min-width: 768px) {
    right: calc(((100% - 768px) / 2) + 12px);
  }
`;

const HostText = styled.span`
  font-size: 14px;
  color: #000;
`;
=======
>>>>>>> main
