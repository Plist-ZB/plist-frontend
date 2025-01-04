import React from "react";
import Header from "../../layout/Header";
import FooterNavBar from "../../layout/FooterNavBar";

export default function SearchPage() {
  return (
    <Container>
      <Header />
      <MainContent>
        <SearchBarContainer>
          <SearchInput placeholder="검색창" />
        </SearchBarContainer>
        <Line />
        <ResultText>검색 결과가 없습니다.</ResultText>
      </MainContent>
      <FooterNavBar />
    </Container>
  );
}
