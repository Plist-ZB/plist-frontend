import usePushNoti from "@/pages/mypage/hooks/usePushNoti";
import { overlay } from "overlay-kit";
import { useEffect } from "react";
import Loading from "@/common/components/Loading";

const openLoadingOverlay = () => overlay.open(() => <Loading />, { overlayId: "loadingOverlay" });
const unmountLoadingOverlay = () => overlay.unmount("loadingOverlay");

export default function PushNotiButton() {
  const { isPushAllowed, onClickPushHandler, isOffPushLoading, isOnPushLoading } = usePushNoti();
  const isLoading = isOffPushLoading || isOnPushLoading;

  useEffect(() => {
    if (isLoading) {
      openLoadingOverlay();
    }
    return () => {
      unmountLoadingOverlay();
    };
  }, [isLoading]);

  return (
    <button
      onClick={onClickPushHandler}
      className={`justify-start transition-all p-1 duration-300 flex items-center w-10 border-none rounded-2xl h-1/2 hover:text-inherit ${
        isPushAllowed ? "bg-primary-main pl-5" : "bg-gray-light"
      }`}
    >
      <div className="h-full bg-white rounded-full aspect-square shrink-0"></div>
    </button>
  );
}
