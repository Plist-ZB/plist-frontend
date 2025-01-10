import React, { useState } from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import StreamList from "@/common/components/StreamList";

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
          <StreamList />
        ) : (
          <ResultText>검색 결과가 없습니다.</ResultText>
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
