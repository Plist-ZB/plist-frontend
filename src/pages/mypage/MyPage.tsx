import UserInfo from "./components/mypage/UserInfo";
import MenuButton from "./components/mypage/MenuButton";

export default function MyPage() {
  const mockUser = {
    name: "김플리",
    email: "test@test.com",
    profileImage: undefined,
  };

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

  const onClickLogout = () => {
    console.log("로그아웃");
  };

  return (
    <div className="flex flex-col w-full h-full">
      <header className="flex items-center justify-end w-full px-4 h-header">
        <button className="text-gray-400" onClick={onClickLogout}>
          로그아웃
        </button>
      </header>

      <UserInfo user={mockUser} />

      <div className="flex flex-col w-full gap-6 px-4 py-8">
        {myPageMenus.map((menu) => (
          <MenuButton key={menu.name} name={menu.name} to={menu.to} />
        ))}
      </div>
    </div>
  );
}
