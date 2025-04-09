import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import useGetUnread from "@/layout/hooks/useGetUnread";

export default function NotificationButton() {
  const { data, isLoading } = useGetUnread();

  if (isLoading) return null;

  return (
    <Link
      to={"/notify"}
      className="relative flex items-center justify-center h-full p-2 border-none rounded-full aspect-square hover:border-none hover:text-black hover:bg-gray-200"
    >
      <IoIosNotifications size={28} />

      {data?.unread && (
        <div className="absolute w-2 rounded-full top-2 right-2 aspect-square">
          <span className="relative right-0 flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full bg-red-500 rounded-full opacity-75 animate-ping"></span>
            <span className="relative inline-flex w-2 h-2 rounded-full bg-red-main"></span>
          </span>
        </div>
      )}
    </Link>
  );
}
