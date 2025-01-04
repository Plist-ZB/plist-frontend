import TopBarLayout from "@/layout/TopBarLayout";
import { Camera } from "lucide-react";
import useProfile from "./hooks/useProfile";

export default function ProfilePage() {
  /* 프로필 관련 로직 */
  const {
    onChangeFileChange,
    backgroundImageStyle,
    currentNickname,
    newNickname,
    onChangeNickname,
  } = useProfile();

  /* 회원탈퇴 컴포넌트 */
  const WithdrawalButton = () => {
    return (
      <button className="opacity-50 text-red-main" onClick={() => console.log("회원탈퇴")}>
        회원탈퇴
      </button>
    );
  };

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
          onSubmit={(e) => {
            e.preventDefault();
            console.log("프로필 변경 완료");
          }}
        >
          <input
            id="profile-image"
            type="file"
            accept="image/jpg, image/jpeg, image/png, image/webp"
            capture="environment"
            className="hidden"
            onChange={onChangeFileChange}
          />

          <label
            htmlFor="profile-image"
            className="relative flex bg-cover border rounded-full bg-primary-50 center w-36 h-36 border-gray-border aspect-square"
            style={backgroundImageStyle}
          >
            <Camera className="absolute bottom-0 right-0 flex w-8 h-8 p-1 bg-white border rounded-full cursor-pointer center border-gray-border" />
          </label>

          <input
            type="text"
            className="w-4/5 max-w-xs px-4 py-2 border rounded-lg border-gray-border"
            value={newNickname}
            placeholder={currentNickname}
            onChange={onChangeNickname}
          />

          <button className="self-auto w-full max-w-xs py-4 mt-auto bg-white border rounded-lg border-gray-border">
            완료
          </button>
        </form>
      </section>
    </TopBarLayout>
  );
}
