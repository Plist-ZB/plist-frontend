import { Link } from "react-router-dom";
import { House, Headphones, Search, CircleUserRound } from "lucide-react";
// 사이즈 애매함 -> lucide-react의 아이콘을 피그마로 가져와서 사이즈 재측정해야할듯함
import LogoIcon from "@/assets/svg/logo.svg";

export default function FooterNavBar() {
  const onClickHostMenu = () => console.log("호스트하기");

  const menus = [
    { id: 0, name: "홈", path: "/", icon: <House /> },
    { id: 1, name: "호스트하기", path: "", onClick: onClickHostMenu, icon: <Headphones /> },
    { id: 2, name: "검색", path: "/search", icon: <Search /> },
    { id: 3, name: "마이페이지", path: "/mypage", icon: <CircleUserRound /> },
  ];

  return (
    <nav
      // shadow-top으론 잘 안보여서 border-top으로 대체해야 할듯함
      className={
        "bg-white shadow-top md:border-x w-full h-fnb max-w-screen-md fixed bottom-0 left-1/2 -translate-x-1/2 z-10 pb-safe border-[#D9D9D9]"
      }
    >
      <ul className="grid w-full h-full grid-cols-4">
        {menus.map((menu) => (
          <li
            key={menu.id}
            role="button"
            tabIndex={menu.id + 1}
            onClick={() => {
              if (menu.id === 1) {
                onClickHostMenu();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                if (menu.id === 1) {
                  onClickHostMenu();
                }
              }
            }}
            className="flex flex-col items-center justify-center w-full h-full gap-1 pt-1 hover:text-primary"
          >
            <Link
              to={menu.path}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              {menu.icon}
              <span className="font-semibold">{menu.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
