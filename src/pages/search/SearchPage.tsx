import React, { useState } from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import StreamList from "@/common/components/StreamList";
import { instance } from "@/services/api/instance";

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
      // API 호출: instance 사용
      const response = await instance.get<SearchResult[]>("/search", {
        params: { query: searchQuery }, // 쿼리 파라미터 전달
      });
      setResults(response.data);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(); // Enter 키로 검색 실행
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
            onKeyDown={handleKeyDown} // Enter 키 이벤트 핸들러 추가
          />
          <SearchIcon onClick={handleSearch}>
            <IoIosSearch onClick={handleSearch} size={20} color="#888787" />
          </SearchIcon>
        </SearchBarContainer>
        <Line />
        {/* 검색 결과 */}
        {loading ? null : results === null ? null : results.length > 0 ? (
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

const SearchIcon = styled.div`
  cursor: pointer; // 마우스 커서를 포인터로 변경
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin-top: 35px;
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
