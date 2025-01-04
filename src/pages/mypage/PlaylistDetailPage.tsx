import { useParams } from "react-router-dom";
import TopBarLayout from "@/layout/TopBarLayout";
import { useLayoutEffect, useState } from "react";
import { Menu, Heart } from "lucide-react";
import AddItemButton from "./components/playlit-detail/AddItemButton";

export default function PlaylistDetailPage() {
  const { playlistId } = useParams();

  // UI 구현을 위한 임시 state -> 추후에 react-query로 변경
  const [playlistName, setPlaylistName] = useState("");

  useLayoutEffect(() => {
    // id를 이용하여 API 호출하여 정보를 가져와 title 값을 렌더링
    console.log(playlistId);
    setPlaylistName(`플레이리스트 ${playlistId}`);
  }, [playlistId]);

  const mock = [
    {
      id: 1,
      thumbnail: "https://picsum.photos/100/100",
      name: "가수 - 엄청 긴 이름을 가지는 노래 제목",
    },
    {
      id: 2,
      thumbnail: "https://picsum.photos/100/100",
      name: "가수 - 노래2",
    },
    {
      id: 3,
      thumbnail: "https://picsum.photos/100/100",
      name: "가수 - 노래3",
    },
    {
      id: 4,
      thumbnail: "https://picsum.photos/100/100",
      name: "가수 - 노래4",
    },
    {
      id: 5,
      thumbnail: "https://picsum.photos/100/100",
      name: "가수 - 노래5",
    },
  ];

  const Item = ({ item }: { item: { id: number; thumbnail: string; name: string } }) => {
    return (
      <div className="flex items-center gap-2 p-2 border rounded-lg">
        <Menu className="flex-shrink-0" />
        <div
          className="w-10 bg-gray-200 bg-cover rounded-lg shrink-0 aspect-square"
          style={{ backgroundImage: `url('${item.thumbnail}')` }}
        ></div>
        <div className="flex-grow truncate">{item.name}</div>
        <button className="p-0 hover:border-transparent hover:text-red-main">
          <Heart className="text-red-main" />
        </button>
      </div>
    );
  };

  return (
    <TopBarLayout
      /* TODO: 페칭해온 이름으로 title 변경하기 */
      topBarProps={{
        title: playlistName,
        backURL: "/mypage/playlist",
        hasAction: true,
        rightActionElement: <AddItemButton />,
      }}
    >
      <section className="flex flex-col gap-2 px-5 py-6 overflow-y-auto">
        {mock.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </section>
    </TopBarLayout>
  );
}
