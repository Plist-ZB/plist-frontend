import TopBarLayout from "@/layout/TopBarLayout";
import CreatePlaylistButton from "@/pages/mypage/components/playlist/CreatePlaylistButton";
import PlaylistItem from "@/pages/mypage/components/playlist/PlaylistItem";
import PlaylistSkeleton from "@/pages/mypage/components/playlist/PlaylistSkeleton";
import usePlaylist from "@/pages/mypage/hooks/usePlaylist";
import { useDebounce } from "@/common/hooks/useDebounce";
import InfiniteScroll from "react-infinite-scroll-component";

export default function PlaylistPage() {
  const {
    getMyPlaylistsQuery: { data, hasNextPage, isLoading, fetchNextPage },
  } = usePlaylist();
  const debouncedLoading = useDebounce(isLoading, 500);

  const content = data?.pages.flatMap((page) => page.content) ?? [];
  const dataLength = content.length;

  return (
    <TopBarLayout
      topBarProps={{
        title: "내 플레이리스트",
        backURL: "/mypage",
        hasAction: true,
        rightActionElement: <CreatePlaylistButton />,
      }}
    >
      <InfiniteScroll
        dataLength={dataLength}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<p className="p-1 text-center">플레이리스트를 가져오는 중입니다...</p>}
        endMessage={<p className="text-center"></p>}
      >
        <section className="grid justify-between grid-cols-2 px-5 py-6 overflow-y-auto gap-x-4 gap-y-4">
          {debouncedLoading ? (
            <PlaylistSkeleton />
          ) : (
            content.map((item) => <PlaylistItem key={item.userPlaylistId} item={item} />)
          )}
        </section>
      </InfiniteScroll>
    </TopBarLayout>
  );
}
