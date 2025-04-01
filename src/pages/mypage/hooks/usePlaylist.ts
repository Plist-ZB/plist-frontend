import { useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import userAPI from "@/services/api/userAPI";

const usePlaylist = () => {
  const queryClient = useQueryClient();

  const getMyPlaylistsQuery = useInfiniteQuery({
    queryKey: ["myPlaylists"],
    initialPageParam: undefined,
    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      try {
        const result = await userAPI.getMyPlaylists({ cursorId: pageParam, size: 20 });
        return result;
      } catch (error) {
        console.error("내 과거 호스트 이력 조회 실패:", error);
        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext) return undefined;

      const lastItem = lastPage.content.at(-1);

      return lastItem?.userPlaylistId;
    },
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
