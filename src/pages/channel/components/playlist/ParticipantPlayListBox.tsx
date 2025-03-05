import { decode } from "html-entities";
import { Heart } from "lucide-react";
import { MouseEvent } from "react";

interface ParticipantPlayListBoxProps {
  readonly item: IVideo;
  readonly currentVideoId: string;
  readonly saveVIdeoToFavorite: (item: IVideo) => void;
}

export default function ParticipantPlayListBox({
  item,
  currentVideoId,
  saveVIdeoToFavorite,
}: ParticipantPlayListBoxProps) {
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    saveVIdeoToFavorite(item);
  };

  return (
    <div
      className={`flex items-center gap-2 p-2 border border-border rounded-lg ${
        currentVideoId === item.videoId ? "bg-primary-100" : ""
      }`}
      draggable={false}
    >
      <div
        className="w-10 bg-gray-200 bg-center bg-cover rounded-lg shrink-0 aspect-square"
        style={{ backgroundImage: `url('${item.videoThumbnail}')` }}
      ></div>
      <div className="flex-grow truncate">{decode(item.videoName)}</div>
      <button className="p-0 hover:border-transparent hover:text-red-main" onClick={onClick}>
        <Heart className="text-red-main" />
      </button>
    </div>
  );
}
