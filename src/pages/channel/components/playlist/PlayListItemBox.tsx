import { Heart } from "lucide-react";

interface PlayListItemBoxProps {
  item: IVideo;
  currentVideoId: number;
  setCurrentVideoId: (id: number) => void;
  setIsOpen: (isOpen: boolean) => void;
  "data-id"?: string;
}

export default function PlayListItemBox({
  item,
  currentVideoId,
  setCurrentVideoId,
  setIsOpen,
  "data-id": dataId,
}: PlayListItemBoxProps) {
  return (
    <div
      data-id={dataId}
      className={`flex items-center gap-2 p-2 cursor-pointer border border-border rounded-lg hover:bg-gray-100 ${
        currentVideoId === item.id ? "bg-gray-50" : ""
      }`}
      onClick={() => {
        setCurrentVideoId(item.id);
        setIsOpen(false);
      }}
      draggable={false}
    >
      <div
        className="w-10 bg-gray-200 bg-cover rounded-lg shrink-0 aspect-square"
        style={{ backgroundImage: `url('${item.videoThumbnail}')` }}
      ></div>
      <div className="flex-grow truncate">{item.videoName}</div>
      <button
        className="p-0 hover:border-transparent hover:text-red-main"
        onClick={(e) => {
          e.stopPropagation();
          console.log("favorite clicked");
        }}
      >
        <Heart className="text-red-main" />
      </button>
    </div>
  );
}
