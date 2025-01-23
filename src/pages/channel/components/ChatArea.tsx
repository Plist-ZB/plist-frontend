import { useEffect, useRef, useState } from "react";
import ChatBox from "./chat/ChatBox";
import ChatInput from "./chat/ChatInput";
import { Client } from "@stomp/stompjs";
import { getEmailFromToken } from "@/pages/channel/utils/getDataFromToken";

interface ChatAreaProps {
  readonly channelId: number;
  readonly stompClient: Client;
}

const email = getEmailFromToken();

export default function ChatArea({ channelId, stompClient }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [chats, setChats] = useState<
    { sender: string; message: string; userProfileImg?: string }[]
  >([]);

  useEffect(() => {
    if (!stompClient || !channelId) return;

    // 메시지 수신 구독
    const subscribeToChat = () => {
      stompClient.subscribe(`/sub/chat.${channelId}`, (message) => {
        const body = JSON.parse(message.body); // 수신된 메시지 파싱

        // 받은 메시지를 `chats` 상태에 업데이트 (userProfileImg 포함)
        setChats((prevChats) => [...prevChats, body]); // 기존 chats 상태에 새로운 메시지 추가
      });
    };

    // stompClient가 연결되었을 때 구독 설정
    stompClient.onConnect = () => {
      subscribeToChat();
    };

    // 컴포넌트 언마운트 시 추가적인 정리 작업 없음
    return () => {
      if (stompClient.connected) {
        subscribeToChat();
      }
    };
  }, [stompClient, channelId]);

  // 채팅 추가 시 스크롤 자동 이동
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats]);

  // 2. 메시지 전송
  const sendMessage = (chatMessage: string) => {
    if (!stompClient) return;

    const message = {
      email: email, // 현재 사용자 닉네임
      message: chatMessage, // 입력된 채팅 메시지
    };

    stompClient.publish({
      destination: `/pub/chat.${channelId}`, // 메시지를 발행할 서버 엔드포인트
      body: JSON.stringify(message), // JSON 형식으로 메시지 전송
    });
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* 채팅 메시지 표시 영역 */}
      <div className="flex flex-col flex-1 overflow-y-auto" ref={scrollRef}>
        {chats.map((chat, index) => (
          <ChatBox
            key={index}
            thumbnail={""}
            message={chat.message}
            username={chat.sender}
            userProfileImg={chat.userProfileImg}
          />
        ))}
      </div>
      {/* 채팅 입력 */}
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
}
