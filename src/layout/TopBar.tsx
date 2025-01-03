import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export interface TopBarProps {
  title: string;
  rightActionElement?: React.ReactNode;
  backURL?: string;
  hasAction?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
  title,
  rightActionElement,
  backURL,
  hasAction = false,
}) => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between flex-shrink-0 px-1 bg-transparent bg-white border-b border-gray-200 h-header">
      {/* 뒤로가기 버튼 */}
      <Link
        to={backURL ?? "/"}
        className="flex items-center justify-center p-0 w-header h-header"
        type="button"
        aria-label="뒤로가기"
      >
        <ChevronLeft />
      </Link>

      {/* Title */}
      <div className="absolute text-lg font-medium transform -translate-x-1/2 left-1/2">
        {title}
      </div>

      {/* 우측 액션 버튼 */}
      {hasAction && <>{rightActionElement}</>}
    </div>
  );
};

export default TopBar;
