import { Link, useLocation } from "react-router-dom";
import { House, Headphones, Search, CircleUserRound } from "lucide-react";

export default function FooterNavBar({ className }: { className?: string }) {
  const { pathname } = useLocation();
  // TODO: 호스트하기 메뉴 클릭 시 모달창 띄우기
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
      className={`flex-shrink-0 bg-white border-t shadow-top w-full h-fnb border-gray-border ${className}`}
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
            className={`flex flex-col items-center justify-center w-full h-full gap-1 pt-1 ${
              pathname === menu.path ? "text-primary" : "text-black"
            } hover:text-primary`}
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
