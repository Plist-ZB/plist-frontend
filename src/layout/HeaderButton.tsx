import styled from "styled-components";
import { Link } from "react-router-dom";

export default function HeaderButton() {
  // Access token 가져오기
  const accessToken = localStorage.getItem("access_token");

  return <>{!accessToken && <StyledButton to={"/auth/login"}>로그인</StyledButton>}</>;
}

const StyledButton = styled(Link)`
  padding: 8px 12px;
  border: 1px solid var(--color-black);
  color: var(--color-black);
  background: var(--color-white);
  border-radius: 0.5rem;
  max-width: 6rem;
`;
