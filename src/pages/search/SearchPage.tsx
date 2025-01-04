import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../layout/Header";
import FooterNavBar from "../../layout/FooterNavBar";
import { IoIosSearch } from "react-icons/io";

interface SearchResult {
  id: number;
  name: string;
  description: string;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return; // 빈 입력 방지
    setLoading(true);
    try {
      // API 호출 (가상 API로 대체)
      const response = await fetch(`https://api.example.com/search?query=${searchQuery}`);
      const data: SearchResult[] = await response.json();
      setResults(data);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header />
      <MainContent>
        <SearchBarContainer>
          <SearchInput
            placeholder="채널명, 카테고리를 검색해주세요."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IoIosSearch onClick={handleSearch} size={20} color="#888787" />
        </SearchBarContainer>
        <Line />
        {/* 검색 결과 */}
        {loading ? (
          <LoadingText>검색 중...</LoadingText>
        ) : results === null ? null : results.length > 0 ? ( // 검색을 수행하지 않았을 경우 아무것도 표시하지 않음
          <StreamList>
            {streams.map((stream, index) => (
              <StreamCard key={index}>
                <Thumbnail>
                  <LiveBadge>Live</LiveBadge>
                  썸네일
                </Thumbnail>
                <StreamDetails>
                  <Title>
                    <b>{stream.title}</b>
                  </Title>
                  <Info>{stream.host}</Info>
                  <Info>카테고리: {stream.category}</Info>
                  <Info>스트리밍 시간: {stream.duration}</Info>
                </StreamDetails>
              </StreamCard>
            ))}
          </StreamList>
        ) : (
          <ResultText>검색 결과가 없습니다.</ResultText>
        )}
      </MainContent>
      <FooterNavBar />
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

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 20px 35px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin-top: 35px;
`;

const LoadingText = styled.p`
  margin-top: 30px;
  font-size: 15px;
  color: #888;
  text-align: center;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 4px;
`;

const ResultText = styled.p`
  margin-top: 30px;
  font-size: 15px;
  color: #888;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 채널 리스트
const streams = [
  {
    title: "발라드 추천 좀 해주세요~",
    host: "노지훈",
    category: "발라드, 가을",
    duration: "1시간 27분",
  },
  {
    title: "데이식스 전곡 듣기",
    host: "송유나",
    category: "밴드",
    duration: "1시간 27분",
  },
];

const StreamList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 8px;
`;

const StreamCard = styled.div`
  display: flex;
  gap: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
`;

const LiveBadge = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  background: red;
  color: white;
  padding: 2px 4px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: regule;
`;

const Thumbnail = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  background: var(--color-primary-50);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 14px;
  color: black;
`;

const StreamDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-size: 16px;
  margin: 0;
`;

const Info = styled.p`
  margin: 4px 0;
  font-size: 14px;
  color: #555;
`;
