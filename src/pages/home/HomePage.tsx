import styled from "styled-components";
import StreamCard from "@/common/components/StreamCard";
import { Headphones } from "lucide-react";
import { overlay } from "overlay-kit";
import HostAdd from "./components/HostAdd";
import { useState, useEffect } from "react";
import { instance } from "@/services/api/instance";

export default function HomePage() {
  const [currentCategory, setCurrentCategory] = useState<"recent" | "popular">("recent");
  const [streams, setStreams] = useState<IChannel[]>([]);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const endpoint = currentCategory === "recent" ? "/channels" : "/channels/popular";
        const response = await instance.get(endpoint);
        setStreams(response.data);
      } catch (error) {
        console.error("Error fetching streams:", error);
      }
    };

    fetchStreams();
  }, [currentCategory]);

  return (
    <Container>
      <MainContent>
        <CategoryButtons>
          <CategoryButton
            onClick={() => setCurrentCategory("recent")}
            isActive={currentCategory === "recent"}
          >
            최근
          </CategoryButton>
          <CategoryButton
            onClick={() => setCurrentCategory("popular")}
            isActive={currentCategory === "popular"}
          >
            인기
          </CategoryButton>
        </CategoryButtons>
        {streams.map((stream) => (
          <StreamCard key={stream.channelId} item={stream} />
        ))}
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

const CategoryButton = styled.button<{ isActive?: boolean }>`
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: ${({ isActive }) => (isActive ? "#adbfe3" : "#ffffff")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#000")};
  cursor: pointer;
`;

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
