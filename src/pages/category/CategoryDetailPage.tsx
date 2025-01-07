import styled from "styled-components";
import TopBar from "@/layout/TopBar";
import StreamList from "@/common/components/StreamList";

export default function CategoryDetailPage() {
  return (
    <Container>
      <TopBar title="공부" />
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
