import { useNavigate } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";
import PlaylistItemOptionModal from "@/pages/mypage/components/playlist/PlaylistItemOptionModal";
import { useState } from "react";

interface PlaylistItemProps {
  readonly item: IPlaylist;
}

export default function PlaylistItem({ item }: PlaylistItemProps) {
  const { userPlaylistId, userPlaylistThumbnail, userPlaylistName, videoCount } = item;
  const navigate = useNavigate();

  const onClickItem = () => navigate(`${userPlaylistId}`);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={onClickItem}
      className="flex flex-col w-full border rounded-md cursor-pointer border-gray-border hover:text-black"
      aria-label={userPlaylistName}
      role="button"
    >
      <div
        className="relative flex w-full bg-gray-200 bg-cover aspect-square"
        style={{ backgroundImage: `url('${userPlaylistThumbnail}')` }}
      >
        <button
          className={`${item.userPlaylistId} absolute p-1 bg-white/65 border-black rounded-full transition-all duration-300 top-2 right-2 hover:scale-110 hover:border-transparent hover:text-black`}
          onClick={(e) => {
            e.stopPropagation();
            console.log("option clicked");
            setIsOpen((c) => !c);
          }}
          onBlur={(e) => {
            if (isOpen && e.relatedTarget?.closest(".playlist-option-modal")) {
              return;
            }
            setIsOpen(false);
          }}
        >
          <EllipsisVertical className="text-black" size={20} />
        </button>
        <PlaylistItemOptionModal
          prevName={userPlaylistName}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          playListId={userPlaylistId}
        />
      </div>
      <div className="flex flex-col gap-1 px-3 py-2">
        <div className="text-base font-medium truncate">{userPlaylistName}</div>
        <div className="text-sm text-gray-500">트랙 {videoCount}개</div>
      </div>
    </div>
  );
}
