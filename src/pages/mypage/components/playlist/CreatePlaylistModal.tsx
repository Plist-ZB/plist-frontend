import usePlaylist from "@/pages/mypage/hooks/usePlaylist";
import { useState } from "react";

interface CreatePlaylistModalProps {
  unmount: () => void;
}

export default function CreatePlaylistModal({ unmount }: CreatePlaylistModalProps) {
  // TODO: onChange와 onClick 함수 구현
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const { addPlaylistMutation } = usePlaylist();

  const onClickHandler = async () => {
    if (!newPlaylistName) return;

    await addPlaylistMutation.mutateAsync(newPlaylistName);

    unmount();
  };

  return (
    <div
      role="button"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10"
      onClick={unmount}
    >
      <div
        role="dialog"
        className="relative flex flex-col w-4/5 max-w-3xl gap-8 p-5 bg-white border rounded-lg shadow-lg center border-gray-border"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="font-bold">플레이리스트 추가</header>

        <div className="flex flex-col gap-2">
          <label htmlFor="playlist-name" className="font-medium">
            새 플레이리스트
          </label>
          <input
            id="playlist-name"
            type="text"
            placeholder="플레이리스트 이름"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className="p-2 border rounded-lg border-gray-border"
          />
        </div>

        <div className="flex justify-end w-full gap-2">
          <button
            className="px-3 py-1 rounded-lg hover:bg-black-bright hover:text-white text-border"
            onClick={unmount}
          >
            취소
          </button>
          <button
            className="px-3 py-1 text-black border border-black rounded-lg bg-primary-light hover:bg-primary hover:text-primary-main"
            onClick={onClickHandler}
          >
            생성
          </button>
        </div>
      </div>
    </div>
  );
}
