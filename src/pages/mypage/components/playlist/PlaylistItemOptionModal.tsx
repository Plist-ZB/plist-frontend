import ModifyPlaylistModal from "@/pages/mypage/components/playlist/ModifyPlaylistModal";
import usePlaylist from "@/pages/mypage/hooks/usePlaylist";
import { overlay } from "overlay-kit";
import { useRef } from "react";

interface PlaylistItemOptionModalProps {
  readonly isOpen: boolean;
  readonly playListId: number;
  readonly prevName: string;
  readonly onClose: () => void;
}

const OptionItem = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className="w-full p-2 text-left cursor-pointer hover:bg-gray-100 hover:border-transparent"
    >
      {children}
    </button>
  );
};

const openModal = ({ playListId, prevName }: { playListId: number; prevName: string }) => {
  overlay.open(({ unmount }) => {
    return <ModifyPlaylistModal playListId={playListId} prevName={prevName} unmount={unmount} />;
  });
};

export default function PlaylistItemOptionModal({
  prevName,
  isOpen,
  playListId,
  onClose,
}: PlaylistItemOptionModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const { deletePlaylistMutation } = usePlaylist();

  const options = [
    { optionId: 1, name: "수정하기", onClick: () => openModal({ playListId, prevName }) },
    {
      optionId: 2,
      name: "삭제하기",
      onClick: async () => await deletePlaylistMutation.mutateAsync(playListId),
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          ref={modalRef}
          className="absolute flex flex-col bg-white border border-gray-200 rounded-md shadow-lg playlist-option-modal right-2 top-10"
        >
          {options.map((option) => (
            <OptionItem
              key={option.optionId}
              onClick={() => {
                option.onClick();
                onClose();
              }}
            >
              {option.name}
            </OptionItem>
          ))}
        </div>
      )}
    </>
  );
}
