import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OnErrorTopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between flex-shrink-0 px-0 pr-4 bg-transparent bg-white border-b border-gray-200 h-header">
      {/* 뒤로가기 버튼 */}
      <button
        className="flex items-center justify-center p-0 w-header h-[calc(var(--header-height)-1px)]"
        type="button"
        aria-label="뒤로가기"
        onClick={() => navigate("/")}
      >
        <ChevronLeft />
      </button>

      {/* Title */}
      <div className="absolute text-lg font-bold truncate transform -translate-x-1/2 left-1/2 max-w-[200px]">
        오류가 발생했습니다.
      </div>
    </div>
  );
};

export default OnErrorTopBar;
