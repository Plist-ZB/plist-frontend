import TopBarLayout from "@/layout/TopBarLayout";
import PastStreamCard from "@/pages/mypage/components/host-history/PastStreamCard";
import useHostHistory from "@/pages/mypage/hooks/useHostHistory";

export default function HostHistoryPage() {
  const { getPastStreamsQuery } = useHostHistory();

  return (
    <TopBarLayout
      topBarProps={{
        title: "호스트 이력",
        backURL: "/mypage",
      }}
    >
      <section className="flex flex-col gap-2 p-4">
        {getPastStreamsQuery.isLoading ? (
          <div>loading...</div>
        ) : (
          getPastStreamsQuery.data?.map((item) => (
            <PastStreamCard key={item.channelId} item={item} />
          ))
        )}
      </section>
    </TopBarLayout>
  );
}
