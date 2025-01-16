import { useMutation, useQuery } from "@tanstack/react-query";
import userAPI from "@/services/api/userAPI";
import { useAtom } from "jotai";
import { userProfileAtom } from "@/store/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useMypage = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);

  const { data, isLoading: isProfileLoading } = useQuery<UserProfile>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const result = await userAPI.getProfile();

        return result;
      } catch (error) {
        //navigate("/auth/login");

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

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      console.log("로그아웃");

      await userAPI.logout();
      navigate("/");
    },
  });

  return { userProfile, isProfileLoading, logout };
};

export default useMypage;
