import usePlaylistDetail from "@/pages/mypage/hooks/usePlaylistDetail";
import { Menu, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { decode } from "html-entities";

const Item = ({
  item,
  onDragStart,
  onDrop,
}: {
  item: { id: number; videoThumbnail: string; videoName: string };
  onDragStart: (id: number) => void;
  onDrop: (id: number) => void;
}) => {
  const { deletePlaylistMutation } = usePlaylistDetail();

  const deleteItem = useCallback(
    (id: number) => async () => {
      const { data: response } = await deletePlaylistMutation.mutateAsync(id);
      console.log(response);
    },
    [deletePlaylistMutation]
  );

  return (
    <div
      className="flex items-center gap-2 p-2 border rounded-lg"
      draggable // 드래그 가능 설정
      onDragStart={() => onDragStart(item.id)} // 드래그 시작 이벤트
      onDragOver={(e) => e.preventDefault()} // 드래그 중 기본 동작 방지
      onDrop={() => onDrop(item.id)} // 드롭 이벤트
    >
      <div className="flex-shrink-0 cursor-move">
        <Menu className="text-gray-600" />
      </div>
      <div
        className="w-10 bg-gray-200 bg-center bg-cover rounded-lg shrink-0 aspect-square"
        style={{ backgroundImage: `url('${item.videoThumbnail}')` }}
      ></div>
      <div className="flex-grow truncate">{decode(item.videoName)}</div>
      <button
        className="p-0 hover:border-transparent hover:text-red-main"
        onClick={deleteItem(item.id)}
      >
        <Trash2 className="text-gray-600" />
      </button>
    </div>
  );
};

export default Item;
