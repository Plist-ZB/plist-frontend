import TopBarLayout from "@/layout/TopBarLayout";
import CreatePlaylistButton from "@/pages/mypage/components/playlist/CreatePlaylistButton";
import PlaylistItem from "@/pages/mypage/components/playlist/PlaylistItem";
import PlaylistSkeleton from "@/pages/mypage/components/playlist/PlaylistSkeleton";
import usePlaylist from "@/pages/mypage/hooks/usePlaylist";
import { useDebounce } from "@/common/hooks/useDebounce";

export default function PlaylistPage() {
  const { getMyPlaylistsQuery } = usePlaylist();
  const debouncedLoading = useDebounce(getMyPlaylistsQuery.isLoading, 1000);

  return (
    <TopBarLayout
      topBarProps={{
        title: "내 플레이리스트",
        backURL: "/mypage",
        hasAction: true,
        rightActionElement: <CreatePlaylistButton />,
      }}
    >
      <section className="grid justify-between grid-cols-2 px-5 py-6 overflow-y-auto gap-x-4 gap-y-4">
        {debouncedLoading ? (
          <PlaylistSkeleton />
        ) : (
          getMyPlaylistsQuery.data?.map((item) => (
            <PlaylistItem key={item.userPlaylistId} item={item} />
          ))
        )}
      </section>
    </TopBarLayout>
  );
}
