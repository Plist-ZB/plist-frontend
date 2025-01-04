import React from "react";
import styled from "styled-components";
import Header from "../../layout/Header";
import FooterNavBar from "../../layout/FooterNavBar";
import { IoIosSearch } from "react-icons/io";

export default function SearchPage() {
  return (
    <Container>
      <Header />
      <MainContent>
        <SearchBarContainer>
          <SearchInput placeholder="검색창" />
          <IoIosSearch size={20} color="#888787" />
        </SearchBarContainer>
        <Line />
        <ResultText>검색 결과가 없습니다.</ResultText>
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

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
`;

const ResultText = styled.p`
  margin-top: 30px;
  font-size: 15px;
  color: #888;
  display: flex;
  justify-content: center;
  align-items: center;
`;
