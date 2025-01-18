import { ChevronLeft } from "lucide-react";
import ExitRoomModal from "@/pages/channel/components/top-bar/ExitRoomModal";
import { overlay } from "overlay-kit";
import { GoDotFill } from "react-icons/go";
import { TimeElapsed } from "@/pages/channel/components/top-bar/TimeElapsed";

export interface ChannelTopBarProps {
  readonly channelId: number;
  readonly channelName: string;
  readonly channelCreatedAt: string;
}

const openModal = (channelId: number) => {
  overlay.open(({ unmount }) => {
    return <ExitRoomModal unmount={unmount} channelId={channelId} />;
  });
};

const ChannelTopBar: React.FC<ChannelTopBarProps> = ({
  channelId,
  channelName,
  channelCreatedAt,
}) => {
  return (
    <div className="flex items-center justify-between flex-shrink-0 px-0 pr-4 bg-transparent bg-white border-b border-gray-200 h-header">
      {/* 뒤로가기 버튼 */}
      <button
        className="flex items-center justify-center p-0 w-header h-header"
        type="button"
        aria-label="뒤로가기"
        onClick={() => openModal(channelId)}
      >
        <ChevronLeft />
      </button>

      {/* Title */}
      <div className="absolute text-lg font-bold truncate transform -translate-x-1/2 left-1/2 max-w-[200px]">
        {channelName}
      </div>

      <div className="flex items-center gap-1">
        <GoDotFill className="text-red-main" />
        <TimeElapsed
          date={new Date(`${channelCreatedAt}Z`)}
          className="text-sm text-center text-gray-500"
        />
      </div>
    </div>
  );
};

export default ChannelTopBar;
