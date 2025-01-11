import { instance } from "@/services/api/instance";

const userPrefix = import.meta.env.MODE === "development" ? "" : "/user";

const userAPI = {
  getProfile: async () => {
    const { data: response } = await instance.get<UserProfile>(`${userPrefix}/profile`);

    return response;
  },
};

export default userAPI;
