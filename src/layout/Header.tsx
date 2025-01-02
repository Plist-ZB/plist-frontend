import Logo from "@/assets/svg/logo.svg";
import TextLogo from "@/assets/svg/text-logo.svg";
import HeaderButton from "@/layout/HeaderButton";

export default function Header() {
  return (
    <header
      className={`py-0 pl-2 pr-4 h-[60px] border-b md:border-x border-[#D9D9D9] fixed top-0 left-1/2 -translate-x-1/2 z-10 w-full max-w-screen-md bg-white flex items-center justify-between`}
    >
      <div className="flex items-center">
        <Logo className="w-12 h-12 text-primary" />
        <TextLogo className="" />
      </div>

      <HeaderButton />
    </header>
  );
}
