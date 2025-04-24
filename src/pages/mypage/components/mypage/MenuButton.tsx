import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
interface IMenuButtonProps {
  readonly name: string;
  readonly to: string;
}

export default function MenuButton({ name, to }: IMenuButtonProps) {
  return (
    <Link
      to={to}
      className="flex items-center w-full h-12 px-4 bg-white border rounded-lg group border-gray-border"
    >
      {name}

      <ChevronRight className="ml-auto text-gray-dark group-hover:text-primary-main" />
    </Link>
  );
}
