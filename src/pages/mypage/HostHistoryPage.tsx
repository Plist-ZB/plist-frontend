import TopBarLayout from "@/layout/TopBarLayout";
import StreamCard from "@/common/components/StreamCard";
import { channelMockData } from "@/mocks/channelMock";

export default function HostHistoryPage() {
  return (
    <TopBarLayout
      topBarProps={{
        title: "호스트 이력",
        backURL: "/mypage",
      }}
    >
      <section className="flex flex-col gap-2 p-4">
        {channelMockData.map((item) => (
          <StreamCard key={item.channelId} item={item} />
        ))}
      </section>
    </TopBarLayout>
  );
}
