import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function CategoryPage() {
  const categories = [
    "공부",
    "힙합",
    "K-POP",
    "POP",
    "봄",
    "여름",
    "가을",
    "겨울",
    "공부",
    "힙합",
    "K-POP",
    "POP",
    "봄",
    "여름",
    "가을",
    "겨울",
    "공부",
    "힙합",
    "K-POP",
    "POP",
  ];
  const navigate = useNavigate(); // React Router의 useNavigate 사용

  const handleCategoryClick = (category: string) => {
    navigate(`/category/${category}`); // 경로 변경
  };

  return (
    <Container>
      {categories.map((category, index) => (
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
