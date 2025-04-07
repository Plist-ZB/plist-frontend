declare type MessageType = {
  messageId: number;
  messageContent: string;
  messageLink: string | "";
  read: boolean;
  messageCreatedAt: string;
};

declare type MessageResponseType = MessageType[];

declare type UnreadMessagesResponseType = {
  unread: boolean;
};
