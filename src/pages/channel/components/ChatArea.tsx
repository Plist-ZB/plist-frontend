import { useEffect, useRef, useState } from "react";
import ChatBox from "./ChatBox";
import ChatInput from "./ChatInput";

export default function ChatArea() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const mockChat = {
    participants: [
      { userId: 1, name: "John", thumbnail: "" },
      { userId: 2, name: "Jane", thumbnail: "" },
      { userId: 3, name: "Doe", thumbnail: "" },
      { userId: 4, name: "Alice", thumbnail: "" },
      { userId: 5, name: "Bob", thumbnail: "" },
      { userId: 6, name: "Charlie", thumbnail: "" },
      { userId: 7, name: "David", thumbnail: "" },
      { userId: 8, name: "Eve", thumbnail: "" },
      { userId: 9, name: "Frank", thumbnail: "" },
      { userId: 10, name: "Grace", thumbnail: "" },
    ],
    chats: [
      { userId: 1, message: "Hello" },
      { userId: 2, message: "Hello" },
      { userId: 3, message: "Hello" },
      { userId: 4, message: "Hello" },
      { userId: 5, message: "Hello" },
      { userId: 6, message: "Hello" },
      { userId: 7, message: "Hello" },
      { userId: 8, message: "Hello" },
      { userId: 9, message: "Hello" },
      { userId: 10, message: "Hello" },
    ],
  };

  const [chats, setChats] = useState(mockChat.chats);

  const cachingUsername: { [key: number]: string } = {
    1: "John",
    2: "Jane",
    3: "Doe",
    4: "Alice",
    5: "Bob",
    6: "Charlie",
    7: "David",
    8: "Eve",
    9: "Frank",
    10: "Grace",
  };

  const cachingThumbnail: { [key: number]: string } = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mockChat.chats]);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex flex-col flex-1 overflow-y-auto" ref={scrollRef}>
        {chats.map((chat) => (
          <ChatBox
            key={chat.userId}
            thumbnail={cachingThumbnail[chat.userId]}
            message={chat.message}
            username={cachingUsername[chat.userId]}
          />
        ))}
      </div>
      <ChatInput />
    </div>
  );
}
