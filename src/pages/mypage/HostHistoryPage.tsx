import TopBarLayout from "@/layout/TopBarLayout";
import PastStreamCard from "@/pages/mypage/components/host-history/PastStreamCard";
import useHostHistory from "@/pages/mypage/hooks/useHostHistory";
import InfiniteScroll from "react-infinite-scroll-component";

export default function HostHistoryPage() {
  const { data, hasNextPage, isLoading, fetchNextPage } = useHostHistory();

  const content = data?.pages.flatMap((page) => page.content) ?? [];
  const dataLength = content.length;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <TopBarLayout
      topBarProps={{
        title: "호스트 이력",
        backURL: "/mypage",
      }}
    >
      <InfiniteScroll
        dataLength={dataLength}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<p className="p-1 text-center">호스트 이력을 가져오는 중입니다...</p>}
        endMessage={<p className="py-4 text-center">더 이상의 이력은 없습니다.</p>}
      >
        <section className="flex flex-col gap-2 p-4">
          {content.map((item) => (
            <PastStreamCard key={item.channelId} item={item} />
          ))}
        </section>
      </InfiniteScroll>
    </TopBarLayout>
  );
}
