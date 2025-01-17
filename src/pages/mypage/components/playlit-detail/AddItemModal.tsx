import SearchItem from "@/pages/mypage/components/playlit-detail/SearchItem";
import usePlaylistDetail from "@/pages/mypage/hooks/usePlaylistDetail";
import { instance } from "@/services/api/instance";
import { X } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface AddItemModalProps {
  playlistId: string;
  unmount: () => void;
}

export default function AddItemModal({ playlistId, unmount }: AddItemModalProps) {
  const { addItemToPlaylistMutation } = usePlaylistDetail();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

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

  const dialogRef = useRef<HTMLDivElement>(null);

  const onCLickAddItem =
    (item: { id: number; videoId: string; videoName: string; videoThumbnail: string }) =>
    async () => {
      console.log(playlistId);

      const response = await addItemToPlaylistMutation.mutateAsync({
        playlistId: playlistId as string,
        videoId: item.videoId,
        videoName: item.videoName,
        videoThumbnail: item.videoThumbnail,
      });
      console.log(response);
    };

  const onClickCloseModal = useCallback(() => {
    unmount();
    queryClient.invalidateQueries({ queryKey: ["myPlaylists"] });
  }, [unmount, queryClient]);

  return (
    <div
      role="button"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 animate-fadeIn pt-header"
      onClick={onClickCloseModal}
    >
      <div
        role="dialog"
        ref={dialogRef}
        className={`relative flex flex-col w-full max-w-3xl gap-4 pt-0 mx-4 overflow-y-scroll bg-white border rounded-lg shadow-lg cursor-default transition-[height] duration-500 ease-in-out ${
          searchYoutubeQuery.data && searchYoutubeQuery.data.length >= 2 ? "h-[80%]" : "h-1/2"
        } border-gray-border animate-slideUp`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="sticky top-0 flex items-center justify-between p-4 text-base font-bold bg-white border-b z-index-10 border-gray-border">
          <div>Youtube 영상 추가</div>
          <X className="w-6 h-6 cursor-pointer" onClick={onClickCloseModal} />
        </header>
        <div className="flex flex-col gap-2 px-4">
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
        <div className="flex flex-col gap-3 px-4">
          {searchYoutubeQuery.isLoading && <div>Loading...</div>}

          {searchYoutubeQuery.data?.length === 0 && (
            <div className="text-center text-gray-500">검색 결과가 없습니다</div>
          )}

          {searchYoutubeQuery.data?.map((item) => (
            <SearchItem key={item.id} item={item} onClick={onCLickAddItem(item)} />
          ))}
        </div>
      </div>
    </div>
  );
}
