import { useQuery } from "@tanstack/react-query";
import userAPI from "@/services/api/userAPI";

const useMypage = () => {
  const { data: userProfile, isLoading: isProfileLoading } = useQuery<UserProfile>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const result = await userAPI.getProfile();

        return result;
      } catch (error) {
        return {
          id: 1,
          user_name: "김플리리스트입니다30글자제한김플리리스트입니다30글자제한",
          user_email: "account@domain.com",
          user_image: "https://picsum.photos/200/300",
        };
      }
    },
    enabled: true,
  });

  return { userProfile, isProfileLoading };
};

export default useMypage;
