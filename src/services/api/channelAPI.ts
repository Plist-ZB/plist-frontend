import { instance } from "@/services/api/instance";

const channelAPI = {
  addVideoToFavorite: async (video: Omit<IVideo, "id">) => {
    const { data: response } = await instance.post(`user/favorite`, video);

    return response;
  },
};

export default channelAPI;
