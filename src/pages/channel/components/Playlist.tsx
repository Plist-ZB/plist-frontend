import { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import PlayListItemBox from "./playlist/PlayListItemBox";
import HostPlayListItemBox from "./playlist/HostPlayListItemBox";

export default function Playlist({ isHost }: { readonly isHost: boolean }) {
  const [playlist, setPlaylist] = useState<any[]>([
    { id: 1, title: "먼데이키즈 - 봄 안부" },
    { id: 2, title: "먼데이키즈 - 여름 안부" },
    { id: 3, title: "먼데이키즈 - 가을 안부" },
    { id: 4, title: "먼데이키즈 - 겨울 안부" },
    { id: 5, title: "먼데이키즈 - 봄 안부" },
    { id: 6, title: "먼데이키즈 - 여름 안부" },
    { id: 7, title: "먼데이키즈 - 가을 안부" },
    { id: 8, title: "먼데이키즈 - 겨울 안부" },
    { id: 9, title: "먼데이키즈 - 봄 안부" },
    { id: 10, title: "먼데이키즈 - 여름 안부" },
    { id: 11, title: "먼데이키즈 - 가을 안부" },
    { id: 12, title: "먼데이키즈 - 겨울 안부" },
  ]);

  const [currentVideoId, setCurrentVideoId] = useState(2);
  const [isOpen, setIsOpen] = useState(false);

  const playlistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && playlistRef.current) {
      console.log("Trying to scroll to:", currentVideoId);
      const currentItem = playlistRef.current.querySelector(`[data-id="${currentVideoId}"]`);
      console.log("Found element:", currentItem);

      if (currentItem) {
        setTimeout(() => {
          currentItem.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 100);
      }
    }
  }, [isOpen, currentVideoId]);

  /* TODO: 드래그앤드랍 적용하기 */
  /* TODO: 호스트가 아이템박스 클릭 시 현재 재생 영상 변경 */
  /* TODO: 클릭하면 favorite에 추가하기 */
  return (
    <div className="relative">
      <div
        className={`flex items-center justify-between gap-4 p-2 border-border ${
          !isOpen ? "border-b" : ""
        }`}
      >
        <div>현재 음악</div>
        <div className="flex-1 text-base">
          {playlist.find((item) => item.id === currentVideoId)?.title}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center ml-auto font-medium text-black"
        >
          재생목록
          <IoMdArrowDropdown className="text-2xl" />
        </button>
      </div>

      {isOpen && (
        <div
          ref={playlistRef}
          className="overflow-y-auto flex flex-col gap-2 px-2 pt-1 pb-4 absolute left-0 right-0 z-10 transition-all duration-300 ease-in-out origin-top transform bg-white border-b shadow-lg h-[calc(100vh*0.5)] top-full animate-dropdown rounded-b-lg"
        >
          {playlist.map((item) =>
            isHost ? (
              <HostPlayListItemBox
                key={item.id}
                item={item}
                currentVideoId={currentVideoId}
                setCurrentVideoId={setCurrentVideoId}
                setIsOpen={setIsOpen}
                data-id={String(item.id)}
              />
            ) : (
              <PlayListItemBox
                key={item.id}
                item={item}
                currentVideoId={currentVideoId}
                setCurrentVideoId={setCurrentVideoId}
                setIsOpen={setIsOpen}
                data-id={String(item.id)}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
