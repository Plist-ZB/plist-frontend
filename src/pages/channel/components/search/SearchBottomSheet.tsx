import { useState } from "react";
import SearchedItem from "@/pages/channel/components/search/SearchedItem";
import { Search } from "lucide-react";

interface SearchBottomSheetProps {
  isOpen: boolean;
  unmount: () => void;
}

export default function SearchBottomSheet({ isOpen, unmount }: SearchBottomSheetProps) {
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
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
