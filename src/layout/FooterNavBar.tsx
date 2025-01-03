import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { House, Headphones, Search, CircleUserRound } from "lucide-react";
import HostAdd from "../pages/HostAdd";

export default function FooterNavBar({ className }: { className?: string }) {
  const { pathname } = useLocation();
  const [isHostAddOpen, setIsHostAddOpen] = useState(false);

  const openHostAddModal = () => setIsHostAddOpen(true);
  const closeHostAddModal = () => setIsHostAddOpen(false);

  const menus = [
    { id: 0, name: "홈", path: "/", icon: <House /> },
    { id: 1, name: "호스트하기", path: "", onClick: openHostAddModal, icon: <Headphones /> },
    { id: 2, name: "검색", path: "/search", icon: <Search /> },
    { id: 3, name: "마이페이지", path: "/mypage", icon: <CircleUserRound /> },
  ];

  return (
    <>
      <nav
        className={`flex-shrink-0 bg-white border-t shadow-top w-full h-fnb border-gray-border  ${className}`}
      >
        <ul className="grid w-full h-full grid-cols-4">
          {menus.map((menu) => (
            <li
              key={menu.id}
              role="button"
              tabIndex={menu.id + 1}
              onClick={menu.onClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  menu.onClick?.();
                }
              }}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 pt-1 ${
                pathname === menu.path ? "text-primary-main" : "text-black"
              } hover:text-primary-main`}
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

      {/* HostAdd 모달 */}
      <HostAdd isOpen={isHostAddOpen} onClose={closeHostAddModal} />
    </>
  );
}
