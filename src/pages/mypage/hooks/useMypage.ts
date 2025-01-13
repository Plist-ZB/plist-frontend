import { useQuery } from "@tanstack/react-query";
import userAPI from "@/services/api/userAPI";
import { useAtom } from "jotai";
import { userProfileAtom } from "@/store/user";
import { useEffect } from "react";

const useMypage = () => {
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);

  const { data, isLoading: isProfileLoading } = useQuery<UserProfile>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const result = await userAPI.getProfile();

        return result;
      } catch (error) {
        const fallbackData = {
          id: 1,
          nickname: "",
          email: "",
          image: "",
        };

        return fallbackData;
      }
    },
    enabled: true,
  });

  useEffect(() => {
    if (!userProfile && data) {
      setUserProfile(data);
    }
  }, [data, userProfile, setUserProfile]);

  return { userProfile, isProfileLoading };
};

export default useMypage;
