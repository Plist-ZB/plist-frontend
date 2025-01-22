import { Heart, Menu, Trash2 } from "lucide-react";

interface HostPlayListItemBoxProps {
  item: IVideo;
  currentVideoId: string;
  onClickHostSetCurrentVideoId: (item: IVideo) => void;
  setIsOpen: (isOpen: boolean) => void;
  "data-id"?: string;
  deleteVideo: (id: number) => void;
  saveVIdeoToFavorite: (item: IVideo) => void;
}

export default function HostPlayListItemBox({
  item,
  currentVideoId,
  onClickHostSetCurrentVideoId,
  setIsOpen,
  "data-id": dataId,
  deleteVideo,
  saveVIdeoToFavorite,
}: HostPlayListItemBoxProps) {
  return (
    <div
      data-id={dataId}
      className={`flex items-center gap-4 p-2 rounded cursor-pointer hover:bg-gray-100 ${
        currentVideoId === item.videoId ? "bg-gray-100" : ""
      }`}
      onClick={() => {
        onClickHostSetCurrentVideoId(item);
        setIsOpen(false);
      }}
      draggable={true}
    >
      <Menu className="flex-shrink-0" />
      <div
        className="w-10 bg-gray-200 bg-cover rounded-lg shrink-0 aspect-square"
        style={{ backgroundImage: `url('${item.videoThumbnail}')` }}
      ></div>
      <div className="flex-grow truncate">{item.videoName}</div>
      <button
        className="p-1 pr-0 hover:border-transparent hover:text-red-main"
        onClick={(e) => {
          e.stopPropagation();
          deleteVideo(item.id);
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
