import PushNotiButton from "@/pages/mypage/components/mypage/PushNotiButton";

export default function PushNotiMenu() {
  return (
    <div className="flex items-center justify-between w-full h-12 px-4 bg-white border rounded-lg border-gray-border">
      <span className="font-medium">푸시 알림 설정</span>

      <PushNotiButton />
    </div>
  );
}
