import { instance } from "@/services/api/instance";

export const getMessages = async () => {
  const { data: response } = await instance.get<MessageResponseType>("/messages");

  return response;
};

export const patchAllMessagesToRead = async () => {
  const { data: response } = await instance.patch("/messages");

  return response;
};

export const patchMessageToReadById = async (messageId: number) => {
  const { data: response } = await instance.patch(`/messages${messageId}`);

  return response;
};

export const getUnreadMessages = async () => {
  const { data: response } = await instance.get<UnreadMessagesResponseType>("/messages/unread");

  return response;
};
