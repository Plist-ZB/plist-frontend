import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { userProfileAtom } from "@/store/user-profile";
import { useNavigate } from "react-router-dom";

const useMypage = () => {
  const navigate = useNavigate();
  const { data: userProfile, isLoading: isProfileLoading } = useAtomValue(userProfileAtom);

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      console.log("로그아웃");

      localStorage.removeItem("access_token");
      navigate("/");
    },
  });

  return { userProfile, isProfileLoading, logout };
};

export default useMypage;
