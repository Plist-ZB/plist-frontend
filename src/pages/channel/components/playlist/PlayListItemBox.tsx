import { decode } from "html-entities";
import { Heart } from "lucide-react";

interface PlayListItemBoxProps {
  item: IVideo;
  currentVideoId: string;
  saveVIdeoToFavorite: (item: IVideo) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export default function PlayListItemBox({
  item,
  currentVideoId,
  saveVIdeoToFavorite,
  setIsOpen,
}: PlayListItemBoxProps) {
  return (
    <div
      className={`flex items-center gap-2 p-2 cursor-pointer border border-border rounded-lg hover:bg-gray-100 ${
        currentVideoId === item.videoId ? "bg-gray-50" : ""
      }`}
      onClick={() => {
        setIsOpen(false);
      }}
      draggable={false}
    >
      <div
        className="w-10 bg-gray-200 bg-center bg-cover rounded-lg shrink-0 aspect-square"
        style={{ backgroundImage: `url('${item.videoThumbnail}')` }}
      ></div>
      <div className="flex-grow truncate">{decode(item.videoName)}</div>
      <button
        className="p-0 hover:border-transparent hover:text-red-main"
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
