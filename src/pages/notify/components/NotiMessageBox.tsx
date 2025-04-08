import { Link } from "react-router-dom";
import useReadNotiMessage from "@/pages/notify/hooks/useReadNotiMessage";

export default function NotiMessageBox({ message }: Readonly<{ message: MessageType }>) {
  const { messageId, messageContent, messageLink, read, messageCreatedAt } = message;

  const { mutate } = useReadNotiMessage();

  console.log(read);

  return (
    <div className={` border-b ${read && "opacity-75"} border-gray-border`}>
      <button
        onClick={() => !read && mutate(messageId)}
        className="flex items-center justify-between w-full gap-4 px-4 py-3 border-none rounded-none hover:text-black hover:border-gray-border"
      >
        <Link
          to={messageLink || "/"}
          className="flex items-center justify-between w-full gap-4 hover:text-inherit"
        >
          <div className="w-10 h-10 rounded-full bg-primary-main shrink-0"></div>
          <div className="font-medium grow text-inherit">{messageContent}</div>
          <div className="text-sm font-semibold">{messageCreatedAt}</div>
        </Link>
      </button>
    </div>
  );
}
