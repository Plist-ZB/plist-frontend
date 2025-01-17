import { useQuery, useQueryClient } from "@tanstack/react-query";
import userAPI from "@/services/api/userAPI";

const useHostHistory = () => {
  const queryClient = useQueryClient();

  const getPastStreamsQuery = useQuery({
    queryKey: ["pastStreams"],
    queryFn: async () => {
      try {
        const result = await userAPI.getMyPastStreams();
        return result;
      } catch (error) {
        console.error("내 과거 호스트 이력 조회 실패:", error);
        return [] as const;
      }
    },
    enabled: true,
  });

  return {
    getPastStreamsQuery,
  };
};

export default useHostHistory;
