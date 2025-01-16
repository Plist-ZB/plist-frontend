import TopBarLayout from "@/layout/TopBarLayout";
import AddItemButton from "./components/playlit-detail/AddItemButton";
import usePlaylistDetail from "@/pages/mypage/hooks/usePlaylistDetail";
import Item from "@/pages/mypage/components/playlit-detail/Item";

export default function PlaylistDetailPage() {
  const { myPlaylistDetailQuery } = usePlaylistDetail();

  return (
    <TopBarLayout
      /* TODO: 페칭해온 이름으로 title 변경하기 */
      topBarProps={{
        title: myPlaylistDetailQuery.data?.userPlaylistName,
        backURL: "/mypage/playlist",
        hasAction: true,
        rightActionElement: <AddItemButton />,
      }}
    >
      <section className="flex flex-col gap-2 px-5 py-6 overflow-y-auto">
        {myPlaylistDetailQuery.isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div>loading...</div>
          </div>
        ) : (
          myPlaylistDetailQuery.data?.videoList.map((item) => <Item key={item.id} item={item} />)
        )}
      </section>
    </TopBarLayout>
  );
}
