import UserInfo from "./components/mypage/UserInfo";
import MenuButton from "./components/mypage/MenuButton";
import { Link } from "react-router-dom";
import { UserRoundPen } from "lucide-react";

const myPageMenus = [
  {
    name: "내 플레이리스트",
    to: "/mypage/playlist",
  },
  {
    name: "내 호스트 이력 보기",
    to: "/mypage/host-history",
  },
];

export default function MyPage() {
  const onClickLogout = () => {
    console.log("로그아웃");
  };

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
        {myPageMenus.map((menu) => (
          <MenuButton key={menu.name} name={menu.name} to={menu.to} />
        ))}
      </div>
    </div>
  );
}
