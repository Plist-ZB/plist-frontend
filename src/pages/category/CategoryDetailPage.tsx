import styled from "styled-components";
import TopBar from "@/layout/TopBar";
import StreamList from "@/common/components/StreamList";
import { useParams } from "react-router-dom";

export default function CategoryDetailPage() {
  const { name } = useParams();

  return (
    <Container>
      <TopBar title={name as string} backURL="/category" />
      <MainContent>
        <StreamList />
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
