import TopBarLayout from "@/layout/TopBarLayout";
import { Calendar, Clock, Heart, Menu, PersonStanding } from "lucide-react";
import { useParams } from "react-router-dom";

export default function HostHistoryDetailPage() {
  const { hostId } = useParams();

  const mockData = {
    thumbnail: "https://picsum.photos/100/100",
    title: "발라드 추천 좀 해주세요~",
    participant_count: 13,
    duration: "1시간 27분",
    host_date: "2025-01-02",
    playlist: [
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
      {
        id: 6,
        thumbnail: "https://picsum.photos/100/100",
        name: "가수 - 엄청 긴 이름을 가지는 노래 제목",
      },
      {
        id: 7,
        thumbnail: "https://picsum.photos/100/100",
        name: "가수 - 노래2",
      },
      {
        id: 8,
        thumbnail: "https://picsum.photos/100/100",
        name: "가수 - 노래3",
      },
      {
        id: 9,
        thumbnail: "https://picsum.photos/100/100",
        name: "가수 - 노래4",
      },
      {
        id: 10,
        thumbnail: "https://picsum.photos/100/100",
        name: "가수 - 노래5",
      },
    ],
  };

  const Item = ({ item }: { item: { id: number; thumbnail: string; name: string } }) => {
    return (
      <div className="flex items-center gap-2 p-2 border rounded-lg">
        <Menu className="flex-shrink-0" />
        <div
          className="w-10 bg-gray-200 bg-cover rounded-lg shrink-0 aspect-square"
          style={{ backgroundImage: `url('${item.thumbnail}')` }}
        ></div>
        <div className="flex-grow truncate">{item.name}</div>
        {/* TODO: onCLick 추가 */}
        <button className="p-0 hover:border-transparent hover:text-red-main">
          <Heart className="text-gray-dark" />
        </button>
      </div>
    );
  };

  return (
    <TopBarLayout
      topBarProps={{
        title: "호스트 이력",
        backURL: "/mypage/host-history",
      }}
    >
      <section className="flex flex-col">
        {/* 방 정보 */}
        <article className="flex flex-col items-center gap-4 p-4 border-b border-gray-border">
          <div
            className="flex w-full bg-gray-200 bg-cover rounded-lg max-w-36 aspect-square"
            style={{ backgroundImage: `url('${mockData.thumbnail}')` }}
          ></div>

          <div className="flex flex-col w-full gap-1">
            <div className="text-lg font-medium text-center truncate">{mockData.title}</div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar size={16} /> {mockData.host_date}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <PersonStanding size={16} /> {mockData.participant_count}명
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 truncate">
                  <Clock size={16} /> {mockData.duration}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* 당시 재생목록 */}
        <article className="flex flex-col gap-4 p-4">
          {mockData.playlist.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </article>
      </section>
    </TopBarLayout>
  );
}
