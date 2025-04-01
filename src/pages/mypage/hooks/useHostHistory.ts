import { useInfiniteQuery } from "@tanstack/react-query";
import userAPI from "@/services/api/userAPI";

const useHostHistory = () => {
  return useInfiniteQuery({
    queryKey: ["pastStreams"],
    initialPageParam: undefined,
    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      try {
        const result = await userAPI.getMyPastStreams({ cursorId: pageParam, size: 20 });
        return result;
      } catch (error) {
        console.error("내 과거 호스트 이력 조회 실패:", error);
        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext) {
        return undefined;
      }

      const lastItem = lastPage.content.at(-1);

      return lastItem?.channelId;
    },
  });
};

export default useHostHistory;
