import useMypage from "@/pages/mypage/hooks/useMypage";

export default function UserInfo() {
  const { userProfile, isProfileLoading } = useMypage();

  return (
    <div className="flex flex-col items-center w-full pb-4 border-b border-gray-200">
      <div
        className={`border rounded-full w-28 h-28 border-gray-border ${
          isProfileLoading ? "animate-pulse bg-gray-border" : "bg-primary-50"
        }`}
      ></div>

      <div className="flex items-center justify-center w-full gap-2 mt-4 mb-1 text-base font-bold">
        <div
          className={`px-4 min-w-8 min-h-8 pt-1 rounded-lg ${
            isProfileLoading ? "w-14 animate-pulse bg-gray-border" : ""
          }`}
        >
          {!isProfileLoading && userProfile?.user_name}
        </div>
      </div>

      <div
        className={`min-h-5 text-gray-400 ${
          isProfileLoading ? "w-10 bg-gray-border animate-pulse" : ""
        }`}
      >
        {!isProfileLoading && userProfile?.user_email}
      </div>
    </div>
  );
}
