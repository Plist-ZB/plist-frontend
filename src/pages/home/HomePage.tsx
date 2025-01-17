import styled from "styled-components";
import StreamCard from "@/common/components/StreamCard";
import { Headphones } from "lucide-react";
import { overlay } from "overlay-kit";
import HostAdd from "./components/HostAdd";
import { useState, useEffect } from "react";
import { instance } from "@/services/api/instance";

export default function HomePage() {
  const [currentCategory, setCurrentCategory] = useState<"recent" | "popular">("recent");
  interface Stream {
    channelId: string;
    channelName: string;
    channelCategoryName: string;
    channelThumbnail: string;
    channelStreamingTime: string;
  }

  const [streams, setStreams] = useState<Stream[]>([]); // 초기값을 빈 배열로 설정

  // streams 데이터를 받아오는 API 호출
  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const endpoint = currentCategory === "recent" ? "/channels" : "/channels/popular";
        const response = await instance.get(endpoint); // API에서 데이터를 받아옴
        setStreams(response.data); // 받아온 데이터로 streams 상태를 업데이트
      } catch (error) {
        console.error("Error fetching streams:", error); // 오류 처리
      }
    };

    fetchStreams();
  }, [currentCategory]); // currentCategory가 변경될 때마다 API 호출

  // 호스트 버튼 노출 관련
  const [showHostButton, setShowHostButton] = useState(true);
  const [mouseTimeout, setMouseTimeout] = useState<NodeJS.Timeout | null>(null);

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      setShowHostButton(false); // 스크롤 시 버튼 숨기기

      // 3초 후 버튼 다시 표시
      if (mouseTimeout) clearTimeout(mouseTimeout);
      const timeout = setTimeout(() => setShowHostButton(true), 3000);
      setMouseTimeout(timeout);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (mouseTimeout) clearTimeout(mouseTimeout); // 컴포넌트 언마운트 시 타이머 제거
    };
  }, [mouseTimeout]);

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
        {streams.length > 0 ? (
          streams.map((stream) => (
            <StreamCard key={stream.channelId} item={stream} /> // 받은 스트림 데이터로 StreamCard 렌더링
          ))
        ) : (
          <NoStreamsMessage>라이브 방송이이 없습니다.</NoStreamsMessage> // 데이터가 없을 경우 표시할 메시지
        )}
      </MainContent>
      {showHostButton && (
        <HostButton
          onClick={() =>
            overlay.open(({ isOpen, unmount }) => <HostAdd isOpen={isOpen} onClose={unmount} />)
          }
        >
          <Headphones />
          <HostText>호스트</HostText>
        </HostButton>
      )}
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

const NoStreamsMessage = styled.p`
  text-align: center;
  color: #888;
  font-size: 16px;
  margin-top: 20px;
`;
