import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import ParticipantPlayListBox from "@/pages/channel/components/playlist/ParticipantPlayListBox";
import { useAtomValue } from "jotai";
import { channelVideoListAtom, currentVideoIdAtom } from "@/store/channel";
import useSaveToFavorite from "@/pages/channel/hooks/useSaveToFavorite";
import { decode } from "html-entities";
import PlayListWrapper from "@/pages/channel/components/media-section/PlayListWrapper";

export default function ParticipantPlaylist() {
  const channelVideoList = useAtomValue(channelVideoListAtom);
  const currentVideoId = useAtomValue(currentVideoIdAtom);
  const [isOpen, setIsOpen] = useState(false);
  const { saveVIdeoToFavoriteMutation } = useSaveToFavorite();

  return (
    <div className="relative">
      <div
        className={`flex items-center justify-between gap-2 p-2 border-border ${
          !isOpen ? "border-b" : ""
        }`}
      >
        <div className="text-base font-semibold">현재 음악</div>

        <div className="flex-1 text-base truncate">
          {(() => {
            const currentVideo = channelVideoList?.find((item) => item.videoId === currentVideoId);
            return currentVideo?.videoName ? decode(currentVideo.videoName) : "";
          })()}
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
        /* TODO: 호스트가 아이템박스 클릭 시 현재 재생 영상 변경 */
        <PlayListWrapper>
          {channelVideoList?.map((item) => (
            <ParticipantPlayListBox
              key={item.videoId}
              item={item}
              currentVideoId={currentVideoId!}
              saveVIdeoToFavorite={saveVIdeoToFavoriteMutation.mutate}
            />
          ))}
        </PlayListWrapper>
      )}
    </div>
  );
}
