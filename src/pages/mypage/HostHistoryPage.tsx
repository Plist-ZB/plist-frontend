import TopBarLayout from "@/layout/TopBarLayout";
import StreamCard from "@/common/components/StreamCard";
import { useNavigate } from "react-router-dom";

export default function HostHistoryPage() {
  const navigate = useNavigate();

  // 채널 리스트
  const mockData = [
    {
      title: "발라드 추천 좀 해주세요~",
      host: "노지훈",
      category: "발라드, 가을",
      duration: "1시간 27분",
    },
    {
      title: "데이식스 전곡 듣기",
      host: "송유나",
      category: "밴드",
      duration: "1시간 27분",
    },
  ];

  const onClick = (id: number) => () => {
    navigate(`/mypage/host-history/${id}`);
  };

  return (
    <TopBarLayout
      topBarProps={{
        title: "호스트 이력",
        backURL: "/mypage",
      }}
    >
      <section className="flex flex-col gap-2 p-4">
        {/* TODO: index가 아니라 실제 id 넣기 */}
        {mockData.map((item, index) => (
          <StreamCard key={index} item={item} onClick={onClick(index)} />
        ))}
      </section>
    </TopBarLayout>
  );
}
