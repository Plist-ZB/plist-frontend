import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import userAPI from "@/services/api/userAPI";
import channelAPI from "@/services/api/channelAPI";

const usePastStreamDetail = (channelId: number) => {
  const queryClient = useQueryClient();

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

  const addVideoToFavoriteMutation = useMutation({
    mutationFn: async (video: Omit<IVideo, "id">) => {
      try {
        await channelAPI.addVideoToFavorite(video);

        queryClient.invalidateQueries({ queryKey: ["myPlaylists"] });
        queryClient.invalidateQueries({ queryKey: ["myPlaylistDetail", "favorite"] });

        alert("영상 즐겨찾기 추가 완료");
      } catch (error) {
        console.error("영상 즐겨찾기 추가 실패:", error);
      }
    },
  });

  return {
    getPastStreamInfoQuery,
    addVideoToFavoriteMutation,
  };
};

export default usePastStreamDetail;
