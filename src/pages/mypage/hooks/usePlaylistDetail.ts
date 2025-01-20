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

        if (result.userPlaylistName === "favorite") {
          queryClient.setQueryData(["myPlaylistDetail", "favorite"], result);
        }

        return result;
      } catch (error) {
        console.error("플레이리스트 조회 실패:", error);
        return [] as const;
      }
    },
    enabled: !!playlistId,
  });

  const addItemToPlaylistMutation = useMutation({
    mutationFn: async ({
      playlistId,
      videoId,
      videoName,
      videoThumbnail,
    }: {
      playlistId: string;
      videoId: string;
      videoName: string;
      videoThumbnail: string;
    }) => {
      if (!playlistId) throw new Error("플레이리스트 ID가 없습니다.");

      try {
        const result = await userAPI.addItemToMyPlaylist(Number(playlistId), {
          videoId,
          videoName,
          videoThumbnail,
        });

        queryClient.invalidateQueries({ queryKey: ["myPlaylistDetail"] });
        // TODO: 토스트 메세지로 교체
        alert("영상이 추가되었습니다.");
        return result;
      } catch (error) {
        console.error("플레이리스트에 영상 추가 실패:", error);
        return;
      }
    },
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

  const updatePlaylistOrderMutation = useMutation({
    mutationFn: async (updatedOrder: number[]) => {
      try {
        const result = await userAPI.updatePlaylistOrder(Number(playlistId), updatedOrder);

        queryClient.invalidateQueries({ queryKey: ["myPlaylistDetail"] });
        // TODO: 토스트 메세지로 교체
        alert("순서가 저장되었습니다.");
        return result;
      } catch (error) {
        console.error("플레이리스트 순서 저장 실패:", error);
        return;
      }
    },
  });

  return {
    myPlaylistDetailQuery,
    addItemToPlaylistMutation,
    deletePlaylistMutation,
    updatePlaylistOrderMutation, // 추가된 부분
  };
};

export default usePlaylistDetail;
