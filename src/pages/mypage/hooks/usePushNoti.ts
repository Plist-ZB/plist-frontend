import { useState } from "react";
import { getFCMToken, deleteFCMToken, messaging } from "@/firebase/firebase";
import { sendTokenToServer, deleteTokenFromServer } from "@/services/api/fcmAPI";
import { overlay } from "overlay-kit";
import { onMessage } from "firebase/messaging";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const checkBrowserNotiAllowed = Notification.permission === "granted";
const hasFCMToken = !!localStorage.getItem("fcm_token");

const usePushNoti = () => {
  const queryClient = useQueryClient();
  const [isPushAllowed, setIsPushAllowed] = useState(checkBrowserNotiAllowed && hasFCMToken);

  const { mutate: onPushFunction, isPending: isOnPushLoading } = useMutation({
    mutationFn: async () => {
      const token = (await getFCMToken()) as string;

      if (!token) throw new Error("FCM 토큰 발급 실패");

      const { status: isTokenSendedFromServer } = await sendTokenToServer(token);
      if (isTokenSendedFromServer !== 201) throw new Error("서버에 토큰 전송 에러");

      return token;
    },
    onSuccess: (data) => {
      console.log("Token sent successfully", data);
      localStorage.setItem("fcm_token", data);
      setIsPushAllowed(true);
      queryClient.invalidateQueries({ queryKey: ["hasUnreadMessages"] });
      overlay.unmount("loadingOverlay");
    },
    onError: (error) => {
      console.error("Error deleting token from server:", error);
    },
  });

  const { mutate: offPushFunction, isPending: isOffPushLoading } = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("fcm_token") ?? ((await getFCMToken()) as string);

      const { status: isTokenDeletedFromServer } = await deleteTokenFromServer(token);
      if (isTokenDeletedFromServer !== 200) throw new Error("서버에서 토큰 삭제 에러");

      const isTokenUnregistered = (await deleteFCMToken()) as boolean;
      if (!isTokenUnregistered) throw new Error("FCM 토큰 삭제 에러");

      return isTokenUnregistered;
    },
    onSuccess: () => {
      console.log("Token deleted successfully");
      localStorage.removeItem("fcm_token");
      setIsPushAllowed(false);
      overlay.unmount("loadingOverlay");
    },
    onError: (error) => {
      console.error("Error deleting token from server:", error);
    },
  });

  const onClickPushHandler = async () => {
    if (!isPushAllowed) onPushFunction();
    else offPushFunction();
  };

  onMessage(messaging, (payload) => {
    console.log("Message received in Hook", payload);
  });

  return { isPushAllowed, onClickPushHandler, isOffPushLoading, isOnPushLoading };
};

export default usePushNoti;
