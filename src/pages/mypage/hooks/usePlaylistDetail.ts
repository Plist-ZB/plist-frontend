import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userAPI from "@/services/api/userAPI";
import { useParams } from "react-router-dom";

const usePlaylistDetail = () => {
  const { playlistId } = useParams();
  const queryClient = useQueryClient();

  const myPlaylistDetailQuery = useQuery({
    queryKey: ["myPlaylistDetail", playlistId],
    queryFn: async () => {
      try {
        const result = await userAPI.getMyPlaylistByID(Number(playlistId));

        return result;
      } catch (error) {
        console.error("플레이리스트 조회 실패:", error);
        return [] as const;
      }
    },
    enabled: true,
  });

  const deletePlaylistMutation = useMutation({
    mutationFn: async (itemId: number) => {
      try {
        const result = await userAPI.deleteItemFromMyPlaylist(Number(playlistId), itemId);

        queryClient.invalidateQueries({ queryKey: ["myPlaylistDetail"] });
        return result;
      } catch (error) {
        console.error("플레이리스트 삭제 실패:", error);
        return;
      }
    },
  });

  return {
    myPlaylistDetailQuery,
    deletePlaylistMutation,
  };
};

export default usePlaylistDetail;
