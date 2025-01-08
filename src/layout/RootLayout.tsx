import { Outlet } from "react-router-dom";
import Header from "@/layout/Header";
import FooterNavBar from "@/layout/FooterNavBar";

export default function RootLayout() {
  return (
    <div className="relative w-full max-w-screen-md h-full border-[#D9D9D9] bg-white flex flex-col">
      <Header className="sticky top-0 z-10 max-w-screen-md" />

      <main className={`w-full mb-fnb`}>
        <Outlet />
      </main>
      <FooterNavBar className="fixed bottom-0 z-10 max-w-screen-md -translate-x-1/2 md:border-x left-1/2 pb-safe" />
    </div>
  );
}
