import { instance } from "@/services/api/instance";

const userPrefix = "/user";

const userAPI = {
  getProfile: async () => {
    const { data: response } = await instance.get<UserProfile>(`${userPrefix}/profile`);

    return response;
  },

  patchUserProfile: async ({ nickname, image }: { nickname: string; image: File | null }) => {
    const formData = new FormData();

    formData.append("nickname", nickname);
    if (image) formData.append("image", image);

    const { data: response } = await instance.patch<UserProfile>(
      `${userPrefix}/profile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  },

  updatePlaylistOrder: async (playlistId: number, updatedOrder: number[]) => {
    try {
      const response = await instance.post(`/playlist/${playlistId}/update`, {
        order: updatedOrder,
      });
      return response.data;
    } catch (error) {
      console.error("플레이리스트 순서 저장 실패:", error);
      throw new Error("플레이리스트 순서 저장 실패");
    }
  },

  logout: async () => {
    const { data: response } = await instance.post(`auth/logout`);

    return response;
  },

  getMyPlaylists: async () => {
    const { data: response } = await instance.get<MyPlaylists>(`${userPrefix}/playlists`);

    return response;
  },

  addMyPlaylist: async (name: string) => {
    const { data: response } = await instance.post(`${userPrefix}/playlist`, {
      userPlaylistName: name,
    });

    return response;
  },

  changeMyPlaylistName: async ({ playlistId, name }: { playlistId: number; name: string }) => {
    const { data: response } = await instance.patch(`${userPrefix}/playlist/${playlistId}`, {
      userPlaylistName: name,
    });

    return response;
  },

  deleteMyPlaylist: async (playlistId: number) => {
    const { data: response } = await instance.delete(`${userPrefix}/playlist/${playlistId}`);

    return response;
  },

  getMyPlaylistByID: async (playlistId: number) => {
    const { data: response } = await instance.get(`/user/playlist/${playlistId}`);

    return response;
  },

  deleteItemFromMyPlaylist: async (playlistId: number, itemId: number) => {
    const { data: response } = await instance.patch(
      `/user/playlist/${playlistId}/remove?id=${itemId}`
    );

    return response;
  },

  addItemToMyPlaylist: async (
    playlistId: number,
    item: { videoId: string; videoName: string; videoThumbnail: string }
  ) => {
    const { data: response } = await instance.patch(`/user/playlist/${playlistId}/add`, item);

    return response;
  },

  getMyPastStreams: async () => {
    const { data: response } = await instance.get(`/user/history`);

    return response;
  },

  getMyPastStreamInfo: async (channelId: number) => {
    const { data: response } = await instance.get<IPastStreamInfo>(`/user/history/${channelId}`);

    return response;
  },
};

export default userAPI;
