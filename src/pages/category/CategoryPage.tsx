import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Category 데이터를 가져오는 API 함수
const fetchCategories = async () => {
  const response = await fetch("/api/categories");
  if (!response.ok) {
    throw new Error("Categories 데이터를 가져오는 데 실패했습니다.");
  }
  return response.json(); // 서버에서 반환하는 데이터 포맷에 맞게 수정
};

export default function CategoryPage() {
  const navigate = useNavigate();

  // React Query로 categories 데이터 가져오기
  const { data: categories, isLoading, isError } = useQuery(["categories"], fetchCategories);

  // 카테고리 클릭 시 페이지 이동
  const handleCategoryClick = (category: string) => {
    navigate(`/category/${category}`);
  };

  // 로딩 상태 처리
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 에러 상태 처리
  if (isError) {
    return <div>카테고리 데이터를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <Container>
      {categories.map((category: string, index: number) => (
        <CategoryButton key={index} onClick={() => handleCategoryClick(category)}>
          {category}
        </CategoryButton>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 20px;
`;

const CategoryButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 32px;
  font-size: 16px;
  cursor: pointer;
  transition: border 0.3s ease;

  &:hover {
    border-color: var(--color-primary);
  }
`;
