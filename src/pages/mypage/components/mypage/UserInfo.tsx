import { Link } from "react-router-dom";
import { UserRoundPen } from "lucide-react";

interface IUserInfo {
  name: string;
  email: string;
  profileImage: string | undefined;
}

export default function UserInfo({ user }: { user: IUserInfo }) {
  return (
    <div className="flex flex-col items-center w-full gap-4 pb-4 border-b border-gray-200">
      <div className="border rounded-full bg-primary-50 w-28 h-28 border-gray-border"></div>
      <div className="flex items-center gap-2 text-lg font-bold">
        <div className="pt-1">{user.name}</div>
        <Link to="/mypage/profile" className="p-1 text-gray-400" aria-label="프로필 수정">
          <UserRoundPen />
        </Link>
      </div>
      <div className="text-gray-400">{user.email}</div>
    </div>
  );
}
