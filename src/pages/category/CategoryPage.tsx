import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "@/services/api/instance";

// API 호출 함수 (목 데이터 JSON 파일에서 카테고리 가져오기)
const fetchCategories = async () => {
  const response = await instance.get("/categories");
  return response.data; // categories 배열을 그대로 반환
};

export default function CategoryPage() {
  const navigate = useNavigate();

  // React Query로 categories 데이터 가져오기
  const { data: categories, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // 카테고리 클릭 시 페이지 이동
  const handleCategoryClick = (categoryId: number, categoryName: string) => () => {
    navigate(`/category/${categoryId}`, { state: { categoryName: categoryName } });
  };

  // 에러 상태 처리
  if (isError) {
    return <div>카테고리 데이터를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <Container>
      {Array.isArray(categories) &&
        categories.map((category) => (
          <CategoryButton
            key={category.id}
            onClick={handleCategoryClick(category.id, category.name)}
          >
            {category.name} {/* 이름만 표시 */}
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
