import userAPI from "@/services/api/userAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";
import { userProfileAtom } from "@/store/user-profile";

const useProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: prevUserProfile, isLoading } = useAtomValue(userProfileAtom);

  const [newProfile, setNewProfile] = useState({
    nickname: prevUserProfile?.nickname ?? "",
    image: null as File | null,
  });

  const [previewAvatar, setPreviewAvatar] = useState(prevUserProfile?.image);

  useEffect(() => {
    if (prevUserProfile) setPreviewAvatar(prevUserProfile.image);
  }, [prevUserProfile]);

  const onChangeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setNewProfile((prev) => ({ ...prev, image: file }));
      extractUrlFromImageFile(file);
    }
  };

  const extractUrlFromImageFile = (file: File) => {
    if (file.type.includes("image")) {
      if (previewAvatar) {
        URL.revokeObjectURL(previewAvatar);
        setPreviewAvatar("");
      }

      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewAvatar(newPreviewUrl);
    } else {
      return alert("이미지 파일만 업로드하세요!!!");
    }
  };

  const backgroundImageStyle = {
    backgroundImage: `url('${previewAvatar}')`,
  };

  /* 프로필 닉네임 관련 */

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProfile((prev) => ({ ...prev, nickname: e.target.value }));
  };

  const {
    mutate: updateProfile,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async ({ nickname, image }: { nickname: string; image: File | null }) => {
      try {
        const result = await userAPI.patchUserProfile({ nickname, image });

        console.log("프로필 업데이트", result);

        setNewProfile({
          nickname: result.nickname,
          image: null,
        });

        return result;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile", localStorage.getItem("access_token")],
      });
      navigate("/mypage");
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateProfile(newProfile);
  };

  return {
    onChangeFileChange,
    backgroundImageStyle,
    prevUserProfile,
    newProfile,
    onChangeNickname,
    onSubmit,
    isPending,
    isError,
    isLoading,
  };
};

export default useProfile;
