import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userProfileAtom } from "@/store/user-profile";

export default function HeaderButton() {
  // Access token 가져오기

  const userProfile = useAtomValue(userProfileAtom);

  return (
    <>
      {!userProfile.data ? (
        <StyledButton to={"/auth/login"}>로그인</StyledButton>
      ) : (
        <StyledButton to={"/mypage"} className="truncate">
          {userProfile.data?.nickname}
        </StyledButton>
      )}
    </>
  );
}

const StyledButton = styled(Link)`
  padding: 8px 12px;
  border: 1px solid var(--color-black);
  color: var(--color-black);
  background: var(--color-white);
  border-radius: 0.5rem;
  max-width: 6rem;
`;
