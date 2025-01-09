import styled from "styled-components";
import TopBar from "@/layout/TopBar";
import StreamList from "@/common/components/StreamList";
import { useParams } from "react-router-dom";

export default function CategoryDetailPage() {
  const { name } = useParams();
  const category = { name }; // 카테고리 이름을 받아와서 객체로 만들기

  return (
    <Container>
      <TopBar title={category?.name || "Default Title"} backURL="/category" />
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
