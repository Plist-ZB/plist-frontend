import { useState } from "react";
import { Search, CirclePlus } from "lucide-react";

interface SearchBottomSheetProps {
  isOpen: boolean;
  unmount: () => void;
}

export default function SearchBottomSheet({ isOpen, unmount }: SearchBottomSheetProps) {
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const SearchedItem = ({ item }: { item: { id: number; thumbnail: string; title: string } }) => {
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
  };

  return (
    /* Overlay */
    <div className="fixed inset-0 z-40 transition-opacity bg-black bg-opacity-50" onClick={unmount}>
      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } h-[calc(100vh*0.7)]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div className="flex flex-col h-full gap-4 p-4">
          <div className="flex items-center gap-2 p-2 border rounded-lg border-border">
            <Search className="w-5 h-5 text-gray-400 " />
            <input
              type="text"
              className="w-full outline-none"
              value={search}
              placeholder="검색어 또는 유튜브 링크를 입력해주세요"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col flex-1 gap-4 overflow-y-auto">
            <h2 className="mb-1 text-xl font-bold text-center">검색 결과</h2>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
              <SearchedItem key={v} item={{ id: v, thumbnail: "", title: "에일리 - 보여줄게" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
