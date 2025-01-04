import { Link } from "react-router-dom";

interface IMenuButtonProps {
  readonly name: string;
  readonly to: string;
}

export default function MenuButton({ name, to }: IMenuButtonProps) {
  return (
    <Link
      to={to}
      className="flex items-center w-full h-12 px-4 bg-white border rounded-lg border-gray-border"
    >
      {name}
    </Link>
  );
}
