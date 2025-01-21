import { useCallback, useState } from "react";
import SearchedItem from "@/pages/channel/components/search/SearchedItem";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { instance } from "@/services/api/instance";
import { useSetAtom } from "jotai";
import { channelVideoListAtom } from "@/store/channel";

interface SearchBottomSheetProps {
  isOpen: boolean;
  unmount: () => void;
  channelId: string;
}

export default function SearchBottomSheet({ isOpen, unmount, channelId }: SearchBottomSheetProps) {
  const [search, setSearch] = useState("");
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const setChannelVideoList = useSetAtom(channelVideoListAtom);

  const searchYoutubeQuery = useQuery({
    queryKey: ["searchVideo", search],
    queryFn: async () => {
      const { data } = await instance.get(`/search-video?keyword=${search}`);
      return data;
    },
    enabled: isSearchEnabled && search.length > 0,
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsSearchEnabled(false);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsSearchEnabled(true);
    }
  };

  const onClickAddItemToChannel = useCallback(
    (item: Omit<IVideo, "id">) => async () => {
      const data = {
        videoId: item.videoId,
        videoName: item.videoName,
        videoThumbnail: item.videoThumbnail,
      };

      const response = await instance.patch(`/channel/${channelId}/add-video`, data);

      console.log(response);
      alert("추가되었습니다.");
    },
    [channelId, setChannelVideoList]
  );

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
              onChange={onChangeHandler}
              onKeyDown={onKeyDownHandler}
            />
          </div>

          <div className="flex flex-col flex-1 gap-4 overflow-y-auto">
            <h2 className="mb-1 text-xl font-bold text-center">검색 결과</h2>

            {searchYoutubeQuery.isLoading && (
              <div className="text-center text-gray-500">검색중...</div>
            )}

            {searchYoutubeQuery.data?.length === 0 && (
              <div className="text-center text-gray-500">검색 결과가 없습니다</div>
            )}

            {searchYoutubeQuery.data?.map((item) => (
              <SearchedItem
                key={item.id}
                item={item}
                onClickAddItemToChannel={onClickAddItemToChannel}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
