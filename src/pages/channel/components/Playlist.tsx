import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import PlayListItemBox from "@/pages/channel/components/playlist/PlayListItemBox";
import HostPlayListItemBox from "@/pages/channel/components/playlist/HostPlayListItemBox";
import { Client } from "@stomp/stompjs";
import { useAtomValue } from "jotai";
import { channelVideoListAtom, isChannelHostAtom } from "@/store/channel";

interface PlaylistProps {
  stompClient: Client;
}

const Playlist = ({ stompClient }: PlaylistProps) => {
  const isHost = useAtomValue(isChannelHostAtom);
  const channelVideoList = useAtomValue(channelVideoListAtom);

  console.log("in Playlist", isHost, channelVideoList);

  const [currentVideoId, setCurrentVideoId] = useState(2);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className={`flex items-center justify-between gap-2 p-2 border-border ${
          !isOpen ? "border-b" : ""
        }`}
      >
        <div className="text-base font-semibold">현재 음악</div>
        <div className="flex-1 text-base truncate">
          {channelVideoList?.find((item) => item.id === currentVideoId)?.videoName}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center p-2 pr-1 ml-auto font-medium text-black"
        >
          재생목록
          <IoMdArrowDropdown className="text-2xl" />
        </button>
      </div>

      {isOpen && (
        /* TODO: 드래그앤드랍 적용하기 */
        /* TODO: 호스트가 아이템박스 클릭 시 현재 재생 영상 변경 */
        /* TODO: 클릭하면 favorite에 추가하기 */
        <div className="overflow-y-auto flex flex-col gap-2 px-2 py-4 absolute left-0 right-0 z-10 transition-all duration-300 ease-in-out origin-top transform bg-white border-b shadow-lg max-h-[calc(100vh*0.5)] top-full animate-dropdown rounded-b-lg">
          {channelVideoList?.map((item) =>
            isHost ? (
              <HostPlayListItemBox
                key={item.id}
                item={item}
                currentVideoId={currentVideoId}
                setCurrentVideoId={setCurrentVideoId}
                setIsOpen={setIsOpen}
              />
            ) : (
              <PlayListItemBox
                key={item.id}
                item={item}
                currentVideoId={currentVideoId}
                setCurrentVideoId={setCurrentVideoId}
                setIsOpen={setIsOpen}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Playlist;
