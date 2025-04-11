import UserInfo from "./components/mypage/UserInfo";
import MenuButton from "./components/mypage/MenuButton";
import { Link } from "react-router-dom";
import { UserRoundPen } from "lucide-react";
import useMypage from "@/pages/mypage/hooks/useMypage";
import { useCallback } from "react";
import PushNotiMenu from "@/pages/mypage/components/mypage/PushNotiMenu";

const myPageMenus = [
  {
    name: "내 플레이리스트",
    to: "/mypage/playlist",
  },
  {
    name: "내 호스트 이력",
    to: "/mypage/host-history",
  },
  {
    name: "내 구독 리스트",
    to: "/mypage/following",
  },
];

export default function MyPage() {
  const { logout } = useMypage();

  const onClickLogout = useCallback(async () => {
    logout();
  }, [logout]);

  return (
    <div className="flex flex-col w-full h-full">
      <header className="flex items-center justify-between w-full px-4 h-header">
        <button className="p-2 text-gray-light" onClick={onClickLogout}>
          로그아웃
        </button>

        <Link to="/mypage/profile" className="p-2 text-gray-600" aria-label="프로필 수정">
          <UserRoundPen />
        </Link>
      </header>

      <UserInfo />

      <div className="flex flex-col w-full gap-6 px-4 py-8">
        <PushNotiMenu />

        {myPageMenus.map((menu) => (
          <MenuButton key={menu.name} name={menu.name} to={menu.to} />
        ))}
      </div>
    </div>
  );
}
