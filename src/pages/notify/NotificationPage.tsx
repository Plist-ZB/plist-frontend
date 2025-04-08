import TopBarLayout from "@/layout/TopBarLayout";
import NotiMessageBox from "@/pages/notify/components/NotiMessageBox";
import ReadAllNotificationsButton from "@/pages/notify/components/ReadAllNotificationsButton";
import useGetNotifications from "@/pages/notify/hooks/useGetNotifications";

export default function NotificationPage() {
  const { data, isLoading } = useGetNotifications();

  console.log(data);

  return (
    <TopBarLayout
      topBarProps={{
        title: "알림",
        backURL: "/",
        hasAction: true,
        rightActionElement: <ReadAllNotificationsButton />,
      }}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <section className="flex flex-col">
          {data?.map((message: MessageType) => (
            <NotiMessageBox key={message.messageId} message={message} />
          ))}
        </section>
      )}
    </TopBarLayout>
  );
}
