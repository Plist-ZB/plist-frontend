import styled from "styled-components";
import StreamCard from "@/common/components/StreamCard";
import { Headphones } from "lucide-react";
import { overlay } from "overlay-kit";
import HostAdd from "./components/HostAdd";
import { useState, useEffect, useRef, useCallback } from "react";
import { instance } from "@/services/api/instance";

export default function HomePage() {
  const [currentCategory, setCurrentCategory] = useState<"recent" | "popular">("recent");
  const [streams, setStreams] = useState<IChannel[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [cursorPopular, setCursorPopular] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null); // 무한 스크롤 감지 ref

  // 📌 streams 데이터를 받아오는 API 호출
  const fetchStreams = useCallback(
    async (reset = false) => {
      if (isFetching || (!hasNext && !reset)) return; // 중복 요청 방지

      setIsFetching(true);
      try {
        let response;
        if (currentCategory === "recent") {
          response = await instance.get("/channels", {
            params: { cursorId: reset ? null : cursorId },
          });
        } else {
          response = await instance.get("/channels/popular", {
            params: {
              cursorId: reset ? null : cursorId,
              cursorPopular: reset ? null : cursorPopular,
            },
          });
        }

        const newStreams = response.data.content;
        setStreams((prevStreams) => (reset ? newStreams : [...prevStreams, ...newStreams]));

        if (newStreams.length > 0) {
          setCursorId(newStreams[newStreams.length - 1].channelId);
          setCursorPopular(newStreams[newStreams.length - 1].channelParticipantCount);
        } else {
          setCursorId(null);
          setCursorPopular(null);
        }
        setHasNext(response.data.hasNext);
      } catch (error) {
        console.error("Error fetching streams:", error);
      } finally {
        setIsFetching(false);
      }
    },
    [currentCategory, cursorId, cursorPopular, hasNext, isFetching]
  );

  // 📌 카테고리 변경 시 데이터 초기화 및 새로 요청
  useEffect(() => {
    setStreams([]);
    setCursorId(null);
    setCursorPopular(null);
    setHasNext(true);
    fetchStreams(true); // 새 데이터 요청
  }, [currentCategory, fetchStreams]);

  // 📌 Intersection Observer를 활용한 무한 스크롤
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchStreams();
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [currentCategory, cursorId, cursorPopular, hasNext, fetchStreams]);

  // 📌 스크롤 이벤트 처리 (호스트 버튼 숨김)
  const [showHostButton, setShowHostButton] = useState(true);
  const [mouseTimeout, setMouseTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowHostButton(false);
      if (mouseTimeout) clearTimeout(mouseTimeout);
      const timeout = setTimeout(() => setShowHostButton(true), 3000);
      setMouseTimeout(timeout);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (mouseTimeout) clearTimeout(mouseTimeout);
    };
  }, [mouseTimeout]);

  return (
    <Container>
      <MainContent>
        <CategoryButtons>
          <CategoryButton
            onClick={() => setCurrentCategory("recent")}
            $isActive={currentCategory === "recent"}
          >
            최근
          </CategoryButton>
          <CategoryButton
            onClick={() => setCurrentCategory("popular")}
            $isActive={currentCategory === "popular"}
          >
            인기
          </CategoryButton>
        </CategoryButtons>

        {streams.length > 0 ? (
          streams.map((stream) => <StreamCard key={stream.channelId} item={stream} />)
        ) : (
          <NoStreamsMessage>라이브중인 방송이 없습니다.</NoStreamsMessage>
        )}

        {/* 마지막 요소를 감지하기 위한 div */}
        <ObserverDiv ref={observerRef} />

        {isFetching && <LoadingMessage>로딩 중...</LoadingMessage>}
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

// 스타일 정의
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

const CategoryButton = styled.button<{ $isActive?: boolean }>`
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: ${({ $isActive }) => ($isActive ? "#adbfe3" : "#ffffff")};
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#000")};
  cursor: pointer;
`;

const NoStreamsMessage = styled.p`
  text-align: center;
  color: #888;
  font-size: 16px;
  margin-top: 20px;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #555;
  font-size: 14px;
  margin-top: 10px;
`;

const ObserverDiv = styled.div`
  height: 10px;
`;

const HostButton = styled.button`
  position: fixed;
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
  z-index: 10;

  @media screen and (min-width: 768px) {
    right: calc(((100% - 768px) / 2) + 12px);
  }
`;

const HostText = styled.span`
  font-size: 14px;
  color: #000;
`;
