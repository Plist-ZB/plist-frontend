import React from "react";
import Header from "../../layout/Header";
import FooterNavBar from "../../layout/FooterNavBar";
import HeaderButton from "../../layout/HeaderButton";

export default function HomePage() {
  return (
    <Container>
      <Header />
      <MainContent>
        <CategoryButtons>
          <CategoryButton>최근</CategoryButton>
          <CategoryButton>인기</CategoryButton>
          <CategoryButtonRight>카테고리</CategoryButtonRight>
        </CategoryButtons>
        <StreamList>
          {streams.map((stream, index) => (
            <StreamCard key={index}>
              <LiveBadge>Live</LiveBadge>
              <Thumbnail>썸네일</Thumbnail>
              <StreamDetails>
                <Title>{stream.title}</Title>
                <Info>{stream.host}</Info>
                <Info>카테고리: {stream.category}</Info>
                <Info>스트리밍 시간: {stream.duration}</Info>
              </StreamDetails>
            </StreamCard>
          ))}
        </StreamList>
      </MainContent>
      <FooterNavBar />
    </Container>
  );
}
