import styled from "styled-components";
import TopBar from "@/layout/TopBar";
import StreamList from "@/common/components/StreamList";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function CategoryDetailPage() {
  const { id } = useParams();
  const state = useLocation().state;
  const categoryName = state?.categoryName;

  useEffect(() => {
    // TODO: id로 데이터 페칭하는 로직
    //
  }, [id]);

  return (
    <Container>
      <TopBar title={categoryName || "Default Title"} backURL="/category" />
      <MainContent>
        {/* TODO: 아래 StreamList 컴포넌트에 페칭해온 데이터 전달해줘야함 */}
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
