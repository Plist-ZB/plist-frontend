import { decode } from "html-entities";
import { Heart, Menu, Trash2 } from "lucide-react";

interface HostPlayListItemBoxProps {
  readonly item: IVideo;
  readonly currentVideoId: string;
  readonly onClickHostSetCurrentVideoId: (item: IVideo) => void;
  readonly setIsOpen: (isOpen: boolean) => void;
  readonly deleteVideo: (id: number) => void;
  readonly saveVIdeoToFavorite: (item: IVideo) => void;
  readonly onDragStart: (id: number) => void;
  readonly onDrop: (id: number) => void;
}

export default function HostPlayListItemBox({
  item,
  currentVideoId,
  onClickHostSetCurrentVideoId,
  setIsOpen,
  deleteVideo,
  saveVIdeoToFavorite,
  onDragStart,
  onDrop,
}: HostPlayListItemBoxProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      className={`flex items-center gap-4 p-2 rounded cursor-pointer hover:bg-gray-100 ${
        currentVideoId === item.videoId ? "bg-gray-100" : ""
      }`}
      onClick={() => {
        onClickHostSetCurrentVideoId(item);
        setIsOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClickHostSetCurrentVideoId(item);
          setIsOpen(false);
        }
      }}
      draggable={true}
      onDragStart={() => onDragStart(item.id)} // 드래그 시작 이벤트
      onDragOver={(e) => e.preventDefault()} // 드래그 중 기본 동작 방지
      onDrop={() => onDrop(item.id)} // 드롭 이벤트
    >
      <Menu className="flex-shrink-0" />
      <div
        className="w-10 bg-gray-200 bg-center bg-cover rounded-lg shrink-0 aspect-square"
        style={{ backgroundImage: `url('${item.videoThumbnail}')` }}
      ></div>
      <div className="flex-grow truncate">{decode(item.videoName)}</div>
      <button
        className="p-1 pr-0 hover:border-transparent hover:text-red-main"
        onClick={(e) => {
          e.stopPropagation();
          if (item.videoId !== currentVideoId) deleteVideo(item.id);
        }}
      >
        <Trash2 className="text-gray-600" />
      </button>
      <button
        className="p-1 pr-0 hover:border-transparent hover:text-red-main"
        onClick={(e) => {
          e.stopPropagation();
          saveVIdeoToFavorite(item);
        }}
      >
        <Heart className="text-red-main" />
      </button>
    </div>
  );
}
