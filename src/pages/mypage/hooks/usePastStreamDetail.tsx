import { useQuery } from "@tanstack/react-query";
import userAPI from "@/services/api/userAPI";

const usePastStreamDetail = (channelId: number) => {
  const getPastStreamInfoQuery = useQuery({
    queryKey: ["pastStreamInfo", channelId],
    queryFn: async () => {
      try {
        const result = await userAPI.getMyPastStreamInfo(channelId);

        console.log(result);

        return result;
      } catch (error) {
        console.error("내 과거 호스트 이력 상세 조회 실패:", error);
        return [] as const;
      }
    },
    enabled: true,
  });

  return {
    getPastStreamInfoQuery,
  };
};

export default usePastStreamDetail;
