interface ChatBoxProps {
  readonly thumbnail: string; // 기본 썸네일
  readonly message: string;
  readonly username: string;
  readonly userProfileImg?: string; // 새로운 프로필 이미지 (선택적)
}

export default function ChatBox({ thumbnail, message, username, userProfileImg }: ChatBoxProps) {
  return (
    <div className="flex gap-3 p-4">
      <div
        className="w-10 h-10 bg-cover rounded-full bg-primary-500 shrink-0 aspect-square"
        style={{ backgroundImage: `url('${userProfileImg || thumbnail}')` }} // userProfileImg가 있으면 해당 이미지를 사용
      ></div>
      <div>
        <div className="font-semibold ">{username}</div>
        <div>{message}</div>
      </div>
    </div>
  );
}
