import { CirclePlus } from "lucide-react";

interface SearchedItemProps {
  readonly item: { id: number; thumbnail: string; title: string };
}

export default function SearchedItem({ item }: SearchedItemProps) {
  return (
    <div
      className={`flex items-center gap-3 p-2 cursor-pointer border border-border rounded-lg hover:bg-gray-100`}
    >
      <div
        className="w-10 bg-gray-200 bg-cover rounded-lg shrink-0 aspect-square"
        style={{ backgroundImage: `url('${item.thumbnail}')` }}
      ></div>
      <div className="flex-grow text-lg font-medium truncate">{item.title}</div>
      <button
        className="p-0 hover:border-transparent hover:text-red-main"
        onClick={(e) => {
          e.stopPropagation();
          console.log("favorite clicked");
        }}
      >
        <CirclePlus className="w-8 h-8 text-gray-light" />
      </button>
    </div>
  );
}
