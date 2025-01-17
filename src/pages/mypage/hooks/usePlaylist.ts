import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userAPI from "@/services/api/userAPI";

const usePlaylist = () => {
  const queryClient = useQueryClient();

  const getMyPlaylistsQuery = useQuery({
    queryKey: ["myPlaylists"],
    queryFn: async () => {
      try {
        const result = await userAPI.getMyPlaylists();
        return result;
      } catch (error) {
        console.error("플레이리스트 조회 실패:", error);
        return [] as const;
      }
    },
    enabled: true,
  });

  const addPlaylistMutation = useMutation({
    mutationFn: async (name: string) => {
      try {
        const result = await userAPI.addMyPlaylist(name);

        if (result.errorCode === 400) {
          throw new Error(result.message);
        }

        return result;
      } catch (error) {
        console.error("플레이리스트 추가 실패:", error);
        return;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPlaylists"] });
    },
  });

  const changePlaylistNameMutation = useMutation({
    mutationFn: async ({ playlistId, name }: { playlistId: number; name: string }) => {
      try {
        const result = await userAPI.changeMyPlaylistName({ playlistId, name });

        queryClient.invalidateQueries({ queryKey: ["myPlaylists"] });
        return result;
      } catch (error) {
        console.error("플레이리스트 이름 변경 실패:", error);
        return;
      }
    },
  });

  const deletePlaylistMutation = useMutation({
    mutationFn: async (playlistId: number) => {
      try {
        const result = await userAPI.deleteMyPlaylist(playlistId);

        queryClient.invalidateQueries({ queryKey: ["myPlaylists"] });
        return result;
      } catch (error) {
        console.error("플레이리스트 삭제 실패:", error);
        return;
      }
    },
  });

  return {
    getMyPlaylistsQuery,
    addPlaylistMutation,
    changePlaylistNameMutation,
    deletePlaylistMutation,
  };
};

export default usePlaylist;
