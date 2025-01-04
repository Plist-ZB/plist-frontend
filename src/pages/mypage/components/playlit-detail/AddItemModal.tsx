import { Plus, X } from "lucide-react";
import { useRef, useState } from "react";

interface AddItemModalProps {
  unmount: () => void;
}

export default function AddItemModal({ unmount }: AddItemModalProps) {
  // TODO: onChange와 onClick 함수 구현

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<
    { id: number; title: string; url: string }[] | null
  >(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 목데이터
  const mockSearchResult = [
    { id: 1, title: "test1", url: "https://www.youtube.com/watch?v=1" },
    { id: 2, title: "test2", url: "https://www.youtube.com/watch?v=2" },
    { id: 3, title: "test3", url: "https://www.youtube.com/watch?v=3" },
    { id: 4, title: "test4", url: "https://www.youtube.com/watch?v=4" },
    { id: 5, title: "test5", url: "https://www.youtube.com/watch?v=5" },
    { id: 6, title: "test6", url: "https://www.youtube.com/watch?v=6" },
    { id: 7, title: "test7", url: "https://www.youtube.com/watch?v=7" },
    { id: 8, title: "test8", url: "https://www.youtube.com/watch?v=8" },
    { id: 9, title: "test9", url: "https://www.youtube.com/watch?v=9" },
    { id: 10, title: "test10", url: "https://www.youtube.com/watch?v=10" },
  ];

  const dialogRef = useRef<HTMLDivElement>(null);

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    // 검색어 입력 시 검색 API 호출
    console.log(search);
    // 검색 결과 출력
    setSearchResult(mockSearchResult);
  };

  // 임시 컴포넌트 (추후 수정 예정)
  const SearchItem = ({ item }: { item: { id: number; title: string; url: string } }) => {
    return (
      <div className="flex flex-shrink-0 w-full p-2 border h-28 border-gray-border">
        <div className="flex flex-col flex-grow gap-2">
          <div className="text-sm font-bold">{item.title}</div>
          <div className="text-xs text-gray-dark">{item.url}</div>
        </div>
        <button onClick={() => console.log("추가")}>
          <Plus className="w-6 h-6 ml-auto" />
        </button>
      </div>
    );
  };

  return (
    <div
      role="button"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 animate-fadeIn pt-header"
      onClick={unmount}
    >
      <div
        role="dialog"
        ref={dialogRef}
        className={`relative flex flex-col w-full max-w-3xl gap-4 p-4 pt-0 mx-4 overflow-y-scroll bg-white border rounded-lg shadow-lg cursor-default transition-[height] duration-500 ease-in-out ${
          searchResult && searchResult.length >= 2 ? "h-[80%]" : "h-1/2"
        } border-gray-border animate-slideUp`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="sticky top-0 flex items-center justify-between pt-4 pb-2 font-bold bg-white border-b z-index-10 border-gray-border">
          <div>Youtube 영상 추가</div>
          <X className="w-6 h-6 cursor-pointer" onClick={unmount} />
        </header>

        <div className="flex flex-col gap-2">
          <input
            id="playlist-name"
            type="text"
            placeholder="검색어나 유튜브 URL을 입력해주세요"
            onChange={onChangeHandler}
            className="p-2 border rounded-lg border-gray-border"
            onKeyDown={onKeyDownHandler}
          />
        </div>

        {/* 검색한 결과가 나타나는 곳 */}
        <div className="flex flex-col gap-3">
          {searchResult?.map((item) => (
            <SearchItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
