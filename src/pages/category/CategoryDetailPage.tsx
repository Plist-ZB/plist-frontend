import styled from "styled-components";
import TopBar from "@/layout/TopBar"; // Adjust the import path as necessary
import StreamCard from "@/common/components/StreamCard";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { instance } from "@/services/api/instance";

export default function CategoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const state = useLocation().state as { categoryName?: string };
  const categoryName = state?.categoryName;

  const [streams, setStreams] = useState<ChannelList>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreamsByCategoryId = async () => {
      try {
        setLoading(true);
        const response = await instance.get<ChannelList>(`/channels/category/${id}`);
        setStreams(response.data); // 반환된 데이터를 상태에 저장
      } catch (error) {
        console.error("Failed to fetch streams:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStreamsByCategoryId();
    }
  }, [id]);

  return (
    <Container>
      <TopBar title={categoryName || "Default Title"} backURL="/category" />
      <MainContent>
        {loading ? (
          <p>Loading streams...</p>
        ) : streams.length > 0 ? (
          streams.map((stream) => <StreamCard key={stream.channelId} item={stream} />)
        ) : (
          <NoStreamsMessage>현재 라이브 방송 중에 선택된 카테고리가 없습니다.</NoStreamsMessage>
        )}
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
  overflow-y: auto;
`;

const NoStreamsMessage = styled.p`
  text-align: center;
  color: #888;
  font-size: 16px;
  margin-top: 20px;
`;
