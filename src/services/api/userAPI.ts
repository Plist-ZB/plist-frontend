import { instance } from "@/services/api/instance";

const userPrefix = import.meta.env.MODE === "development" ? "" : "/user";

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

  logout: async () => {
    const { data: response } = await instance.post(`${userPrefix}/logout`);

    return response;
  },

  getMyPlaylists: async () => {
    const { data: response } = await instance.get<MyPlaylists>(`${userPrefix}/playlists`);

    return response;
  },

  changeMyPlaylistName: async ({ playlistId, name }: { playlistId: number; name: string }) => {
    const { data: response } = await instance.patch(`${userPrefix}/playlists/${playlistId}`, {
      userPlaylistName: name,
    });

    return response;
  },

  deleteMyPlaylist: async (playlistId: number) => {
    const { data: response } = await instance.delete(`${userPrefix}/playlists/${playlistId}`);

    return response;
  },
};

export default userAPI;
