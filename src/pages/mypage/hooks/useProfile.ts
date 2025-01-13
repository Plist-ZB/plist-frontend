import userAPI from "@/services/api/userAPI";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useAtom } from "jotai";
import { userProfileAtom } from "@/store/user";

const useProfile = () => {
  const [prevUserProfile, setUserProfile] = useAtom(userProfileAtom);

  const [newProfile, setNewProfile] = useState({
    nickname: prevUserProfile?.nickname ?? "",
    image: null as File | null,
  });

  const [previewAvatar, setPreviewAvatar] = useState(prevUserProfile?.image);

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

        setUserProfile(result);

        return result;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateProfile(newProfile);

    console.log("프로필 변경");
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
  };
};

export default useProfile;
