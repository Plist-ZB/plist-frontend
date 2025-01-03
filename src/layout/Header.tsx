import Logo from "@/assets/svg/logo.svg";
import TextLogo from "@/assets/svg/text-logo.svg";
import HeaderButton from "@/layout/HeaderButton";

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={`flex-shrink-0 py-0 pl-2 pr-4 h-header border-b border-[#D9D9D9] w-full bg-white flex items-center justify-between ${className}`}
    >
      <div className="flex items-center">
        <Logo className="w-12 h-12 text-primary" />
        <TextLogo className="" />
      </div>

      <HeaderButton />
    </header>
  );
}
