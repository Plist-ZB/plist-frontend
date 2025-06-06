import TopBarLayout from "@/layout/TopBarLayout";
import { Camera } from "lucide-react";
import useProfile from "./hooks/useProfile";
import styled from "styled-components";
import { LuLoaderCircle } from "react-icons/lu";

/* 회원탈퇴 컴포넌트 */
const WithdrawalButton = () => {
  return (
    <button
      className="opacity-50 text-red-main hover:text-red-main"
      onClick={() => console.log("회원탈퇴")}
    >
      회원탈퇴
    </button>
  );
};

export default function ProfilePage() {
  /* 프로필 관련 로직 */
  const {
    onChangeFileChange,
    backgroundImageStyle,
    prevUserProfile,
    newProfile,
    onChangeNickname,
    onSubmit,
    isPending,
    isLoading,
  } = useProfile();

  //console.log(prevUserProfile);

  if (isLoading) {
    return <div>...</div>;
  }

  return (
    <TopBarLayout
      topBarProps={{
        title: "프로필 변경",
        backURL: "/mypage",
        hasAction: true,
        rightActionElement: <WithdrawalButton />,
      }}
    >
      <section className="flex flex-col items-center justify-center flex-grow">
        <form
          className="flex flex-col items-center w-full h-full gap-10 px-4 pt-32 pb-fnb"
          onSubmit={onSubmit}
        >
          <input
            id="profile-image"
            type="file"
            accept="image/jpg, image/jpeg, image/png, image/webp"
            className="hidden"
            onChange={onChangeFileChange}
          />

          <label
            htmlFor="profile-image"
            className="relative flex bg-cover border rounded-full cursor-pointer bg-primary-50 center w-36 h-36 border-gray-border aspect-square"
            style={backgroundImageStyle}
          >
            <Camera className="absolute bottom-0 right-0 flex w-8 h-8 p-1 bg-white border rounded-full center border-gray-border" />
          </label>

          <input
            type="text"
            className="w-4/5 max-w-xs px-4 py-2 border rounded-lg border-gray-border"
            value={newProfile.nickname}
            placeholder={prevUserProfile?.nickname}
            onChange={onChangeNickname}
          />
          <Validation>닉네임은 최대 20자까지 입력 가능합니다.</Validation>

          <button
            disabled={isPending}
            className={`flex items-center justify-center gap-2 self-auto w-full max-w-xs py-4 mt-auto bg-white border rounded-lg border-gray-border hover:border-gray-border hover:text-black disabled:cursor-not-allowed`}
          >
            {isPending ? (
              <>
                <LuLoaderCircle className="inline animate-spin" size={20} />
                <span className="">변경중...</span>
              </>
            ) : (
              "변경하기"
            )}
          </button>
        </form>
      </section>
    </TopBarLayout>
  );
}

const Validation = styled.div`
  color: red;
`;
