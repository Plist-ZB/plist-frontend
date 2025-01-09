import { useNavigate } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";
import PlaylistItemOptionModal from "@/pages/mypage/components/playlist/PlaylistItemOptionModal";
import { useState } from "react";

interface PlaylistItemProps {
  readonly item: { id: number; thumbnails?: string; title: string; track_count: number };
}

export default function PlaylistItem({ item }: PlaylistItemProps) {
  const { id, thumbnails, title, track_count } = item;
  const navigate = useNavigate();

  const onClickItem = () => navigate(`${id}`);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={onClickItem}
      className="flex flex-col w-full border rounded-md cursor-pointer border-gray-border hover:text-black"
      aria-label={title}
      role="button"
    >
      <div
        className="relative flex w-full bg-gray-200 bg-cover aspect-square"
        style={{ backgroundImage: `url('${thumbnails}')` }}
      >
        {/* TODO: 배경 흰색만 투명도 적용하기 */}
        <button
          className={`${item.id} bg-white/30 rounded-full absolute p-1 transition-all duration-300 bg-transparent top-2 right-2 hover:scale-110 hover:border-transparent hover:text-black`}
          onClick={(e) => {
            e.stopPropagation();
            console.log("option clicked");
            setIsOpen((c) => !c);
          }}
          onBlur={() => setIsOpen(false)}
        >
          <EllipsisVertical className="text-black border-black rounded-full opacity-100" />
        </button>
        <PlaylistItemOptionModal isOpen={isOpen} playListId={id} />
      </div>
      <div className="flex flex-col gap-1 px-3 py-2">
        <div className="text-base font-medium truncate">{title}</div>
        <div className="text-sm text-gray-500">트랙 {track_count}개</div>
      </div>
    </div>
  );
}
