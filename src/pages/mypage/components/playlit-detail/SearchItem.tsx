import { decode } from "html-entities";
import { Plus } from "lucide-react";

const SearchItem = ({
  item,
  onClick,
}: {
  item: { id: number; videoId: string; videoName: string; videoThumbnail: string };
  onClick: () => void;
}) => {
  return (
    <div className="flex items-center flex-shrink-0 w-full gap-4 p-2 pr-0 border rounded-lg border-gray-border">
      <div
        className="h-full bg-gray-200 bg-center bg-cover rounded-lg min-h-12 max-h-28 shrink-0 aspect-square"
        style={{ backgroundImage: `url('${item.videoThumbnail}')` }}
      ></div>

      <div className="flex-grow text-sm font-medium line-clamp-2">{decode(item.videoName)}</div>

      <button className="p-2 ml-auto" onClick={() => onClick()}>
        <Plus className="w-6 h-6 ml-auto" />
      </button>
    </div>
  );
};

export default SearchItem;
