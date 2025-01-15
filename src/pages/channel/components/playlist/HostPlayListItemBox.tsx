import { Heart, Menu } from "lucide-react";

interface HostPlayListItemBoxProps {
  item: {
    id: number;
    thumbnail: string;
    title: string;
  };
  currentVideoId: number;
  setCurrentVideoId: (id: number) => void;
  setIsOpen: (isOpen: boolean) => void;
  "data-id": string;
}

export default function HostPlayListItemBox({
  item,
  currentVideoId,
  setCurrentVideoId,
  setIsOpen,
  "data-id": dataId,
}: HostPlayListItemBoxProps) {
  return (
    <div
      data-id={dataId}
      className={`flex items-center gap-4 p-2 rounded cursor-pointer hover:bg-gray-100 ${
        currentVideoId === item.id ? "bg-gray-100" : ""
      }`}
      onClick={() => {
        setCurrentVideoId(item.id);
        setIsOpen(false);
      }}
      draggable={true}
    >
      <Menu className="flex-shrink-0" />
      <div
        className="w-10 bg-gray-200 bg-cover rounded-lg shrink-0 aspect-square"
        style={{ backgroundImage: `url('${item.thumbnail}')` }}
      ></div>
      <div className="flex-grow truncate">{item.title}</div>
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
