import { instance } from "@/services/api/instance";

export const sendTokenToServer = async (fcmToken: string) => {
  const response = await instance.post("/fcm/token", fcmToken);

  return response;
};

export const deleteTokenFromServer = async (fcmToken: string) => {
  const response = await instance.delete("/fcm/token", { data: fcmToken });

  return response;
};
