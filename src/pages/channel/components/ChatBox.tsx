interface ChatBoxProps {
  thumbnail: string;
  message: string;
  username: string;
}

export default function ChatBox({ thumbnail, message, username }: ChatBoxProps) {
  return (
    <div className="flex gap-3 p-4">
      <div
        className="w-10 h-10 bg-cover rounded-full bg-primary-500 shrink-0 aspect-square"
        style={{ backgroundImage: `url('${thumbnail}')` }}
      ></div>
      <div>
        <div>{username}</div>
        <div>{message}</div>
      </div>
    </div>
  );
}
