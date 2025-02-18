import usePlaylist from "@/pages/mypage/hooks/usePlaylist";
import { useState } from "react";
import styled from "styled-components";

interface ModifyPlaylistModalProps {
  readonly playListId: number;
  readonly prevName: string;
  readonly unmount: () => void;
}

export default function ModifyPlaylistModal({
  playListId,
  prevName,
  unmount,
}: ModifyPlaylistModalProps) {
  const { changePlaylistNameMutation } = usePlaylist();
  const [newName, setNewName] = useState(prevName);

  const handleChangeName = async () => {
    await changePlaylistNameMutation.mutateAsync({ playlistId: playListId, name: newName });
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
        <header className="font-bold">이름 변경</header>

        <div className="flex flex-col gap-2">
          <label htmlFor="playlist-name" className="font-medium">
            {prevName}
          </label>
          <input
            id="playlist-name"
            type="text"
            placeholder={prevName}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="p-2 border rounded-lg border-gray-border"
          />
        </div>
        <Validation>제목은 최대 30자까지 입력 가능합니다.</Validation>

        <div className="flex justify-end w-full gap-2">
          <button
            className="px-3 py-1 rounded-lg hover:bg-black-bright hover:text-white text-border"
            onClick={unmount}
          >
            취소
          </button>
          <button
            className="px-3 py-1 text-black border border-black rounded-lg bg-primary-light hover:bg-primary hover:text-primary-main"
            onClick={handleChangeName}
          >
            변경
          </button>
        </div>
      </div>
    </div>
  );
}

const Validation = styled.div`
  color: red;
`;
