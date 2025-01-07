import React from "react";

export default function CategoryPage() {
  return <div>CategoryPage</div>;
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
