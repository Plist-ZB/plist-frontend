import usePlaylistDetail from "@/pages/mypage/hooks/usePlaylistDetail";
import { Menu, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { decode } from "html-entities";

const Item = ({ item }: { item: { id: number; videoThumbnail: string; videoName: string } }) => {
  const { deletePlaylistMutation } = usePlaylistDetail();

  const deleteItem = useCallback(
    (id: number) => async () => {
      const { data: response } = await deletePlaylistMutation.mutateAsync(id);
      console.log(response);
    },
    [deletePlaylistMutation]
  );

  return (
    <div className="flex items-center gap-2 p-2 border rounded-lg">
      <Menu className="flex-shrink-0" />
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
