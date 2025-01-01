import { Outlet } from "react-router-dom";
import Header from "@/layout/Header";
import FooterNavBar from "@/layout/FooterNavBar";

export default function RootLayout() {
  return (
    <div className="relative w-full max-w-screen-md border-[#D9D9D9] bg-white">
      {/* 스크롤할 떄 헤더도 내릴지말지 정해야함 */}
      <Header />

      <main className="w-full pt-header pb-fnb">
        <Outlet />
      </main>
      <FooterNavBar />
    </div>
  );
}
