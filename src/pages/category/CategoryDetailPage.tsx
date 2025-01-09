import styled from "styled-components";
import TopBar from "@/layout/TopBar"; // Adjust the import path as necessary
import StreamCard from "@/common/components/StreamCard";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { instance } from "@/services/api/instance";

export default function CategoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const state = useLocation().state;
  const categoryName = state?.categoryName;

  const [streams, setStreams] = useState<ChannelList>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreamsByCategoryId = async () => {
      try {
        setLoading(true);
        const response = await instance.get(`/streams?categoryId=${id}`);
        setStreams(response.data); // categoryId에 해당하는 스트림 리스트 설정
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
        ) : (
          streams.map((stream) => <StreamCard key={stream.channelId} item={stream} />)
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
