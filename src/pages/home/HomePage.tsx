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
  const [isFetching] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null); // 무한 스크롤 감지 ref

  //streams 데이터를 받아오는 API 호출
  const isFetchingRef = useRef(false);

  const fetchStreams = useCallback(
    async (reset = false) => {
      if (isFetchingRef.current) return;

      isFetchingRef.current = true;
      try {
        const params: { cursorId: number | null; limit: number; cursorPopular?: number | null } = {
          cursorId: reset ? null : cursorId,
          limit: 20, // 항상 20개씩 가져옴
        };
        if (currentCategory === "popular") {
          params.cursorPopular = reset ? null : cursorPopular;
        }

        const response = await instance.get(
          currentCategory === "recent" ? "/channels" : "/channels/popular",
          { params }
        );

        const newStreams = response.data.content;

        setStreams((prevStreams) => [...prevStreams, ...newStreams]); // 이전 데이터 유지하면서 새로운 데이터 추가

        if (newStreams.length > 0) {
          setCursorId(newStreams[newStreams.length - 1].channelId); // 마지막 채널 ID를 cursorId로 저장
          setCursorPopular(newStreams[newStreams.length - 1].channelParticipantCount);
        }

        setHasNext(response.data.hasNext);
      } catch (error) {
        console.error("Error fetching streams:", error);
      } finally {
        isFetchingRef.current = false;
      }
    },
    [currentCategory, cursorId, cursorPopular]
  );

  useEffect(() => {
    if (cursorId !== null) {
      fetchStreams();
    }
  }, [cursorId]);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!observerRef.current || observer.current) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext) {
          fetchStreams();
        }
      },
      { threshold: 1.0 }
    );

    observer.current.observe(observerRef.current);

    return () => {
      observer.current?.disconnect();
      observer.current = null;
    };
  }, [hasNext, fetchStreams]);

  // 카테고리 변경 시 데이터 초기화 및 새로 요청
  useEffect(() => {
    setStreams([]);
    setCursorId(null);
    setCursorPopular(null);
    setHasNext(true);
  }, [currentCategory]);

  useEffect(() => {
    fetchStreams(true);
  }, [fetchStreams]);

  // Intersection Observer를 활용한 무한 스크롤
  useEffect(() => {
    if (!observerRef.current) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext) {
          fetchStreams();
        }
      },
      { threshold: 1.0 }
    );

    observer.current.observe(observerRef.current);

    return () => {
      observer.current?.disconnect();
      observer.current = null; // 🔥 다음 useEffect에서 다시 등록될 수 있도록 초기화
    };
  }, [hasNext, fetchStreams]);

  // 스크롤 이벤트 처리 (호스트 버튼 숨김)
  const [showHostButton, setShowHostButton] = useState(true);
  const mouseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowHostButton(false);
      if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
      mouseTimeoutRef.current = setTimeout(() => setShowHostButton(true), 3000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
    };
  }, []);

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
