import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userProfileAtom } from "@/store/user-profile";
import NotificationButton from "@/layout/components/NotificationButton";

export default function HeaderButton() {
  const userProfile = useAtomValue(userProfileAtom);
  const bgImageUrl = { backgroundImage: `url('${userProfile.data?.image}')` };

  return (
    <div className="flex items-center gap-2">
      {!userProfile.data ? (
        <StyledButton to={"/auth/login"}>로그인</StyledButton>
      ) : (
        <>
          <NotificationButton />

          <Link
            to={"/mypage"}
            className="truncate bg-center bg-cover rounded-full w-9 h-9 aspect-square center"
            style={bgImageUrl}
          />
        </>
      )}
    </div>
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
