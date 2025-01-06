import { ChevronLeft } from "lucide-react";
import ExitRoomModal from "@/pages/channel/components/ExitRoomModal";
import { overlay } from "overlay-kit";
import { GoDotFill } from "react-icons/go";

export interface ChannelTopBarProps {
  title: string;
  rightActionElement?: React.ReactNode;
  hasAction?: boolean;
}

const ChannelTopBar: React.FC<ChannelTopBarProps> = ({
  title,
  rightActionElement,
  hasAction = false,
}) => {
  const openModal = () => {
    overlay.open(({ unmount }) => {
      return <ExitRoomModal unmount={unmount} />;
    });
  };

  // TODO: jotai 변수로 선언하여 1초마다 업데이트 해주기
  const streamDuration = "10:00:00";

  return (
    <div className="flex items-center justify-between flex-shrink-0 px-0 pr-4 bg-transparent bg-white border-b border-gray-200 h-header">
      {/* 뒤로가기 버튼 */}
      <button
        className="flex items-center justify-center p-0 w-header h-header"
        type="button"
        aria-label="뒤로가기"
        onClick={openModal}
      >
        <ChevronLeft />
      </button>

      {/* Title */}
      <div className="absolute text-lg font-bold truncate transform -translate-x-1/2 left-1/2 max-w-[200px]">
        {title}
      </div>

      {/* 우측 액션 버튼 */}
      {hasAction && <>{rightActionElement}</>}
      <div className="flex items-center gap-1">
        <GoDotFill className="text-red-main" />
        <div className="text-sm text-gray-500">{streamDuration}</div>
      </div>
    </div>
  );
};

export default ChannelTopBar;