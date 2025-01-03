import { useRef, useState } from "react";

const useProfile = () => {
  const profileImageRef = useRef<null | HTMLInputElement>(null);

  const [previewAvatar, setPreviewAvatar] = useState("");

  const onChangeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = e.target.files;

    if (uploadFiles) {
      const uploadedFile = uploadFiles[0];
      // TODO: form 데이터에 파일 등록 로직 추가하기
      extractUrlFromImageFile(uploadedFile);
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
  const currentNickname = "김플리";
  const [newNickname, setNewNickname] = useState(currentNickname);

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };

  return {
    profileImageRef,
    onChangeFileChange,
    backgroundImageStyle,
    currentNickname,
    newNickname,
    onChangeNickname,
  };
};

export default useProfile;
