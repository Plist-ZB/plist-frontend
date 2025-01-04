import TopBarLayout from "@/layout/TopBarLayout";
import CreatePlaylistButton from "@/pages/mypage/components/playlist/CreatePlaylistButton";
import PlaylistItem from "@/pages/mypage/components/playlist/PlaylistItem";

export default function PlaylistPage() {
  // TODO: 플레이리스트 데이터 받아오기
  const mock = [
    {
      id: 1,
      thumbnails: "https://picsum.photos/100/100",
      title: "플레이리스트1",
      track_count: 10,
    },
    {
      id: 2,
      thumbnails: "https://picsum.photos/100/100",
      title: "플레이리스트2",
      track_count: 10,
    },
    {
      id: 3,
      thumbnails: "https://picsum.photos/100/100",
      title: "플레이리스트3",
      track_count: 10,
    },
    {
      id: 4,
      thumbnails: "https://picsum.photos/100/100",
      title: "플레이리스트4",
      track_count: 10,
    },
    {
      id: 5,
      thumbnails: "https://picsum.photos/100/100",
      title: "플레이리스트5",
      track_count: 10,
    },
  ];

  return (
    <TopBarLayout
      topBarProps={{
        title: "내 플레이리스트",
        backURL: "/mypage",
        hasAction: true,
        rightActionElement: <CreatePlaylistButton />,
      }}
    >
      <section className="grid justify-between grid-cols-2 px-5 py-6 overflow-y-auto gap-x-4 gap-y-8">
        {mock.map((item) => (
          <PlaylistItem key={item.id} item={item} />
        ))}
      </section>
    </TopBarLayout>
  );
}
