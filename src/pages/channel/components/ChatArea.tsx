import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import ChatBox from "./chat/ChatBox";
import ChatInput from "./chat/ChatInput";

const WEBSOCKET_URL = "ws://your-websocket-server-url/ws"; // 웹소켓 서버 주소

export default function ChatArea({ channelId, sender }: { channelId: string; sender: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [chats, setChats] = useState<
    { sender: string; message: string; userProfileImg?: string }[]
  >([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  // 1. 웹소켓 연결 및 구독
  useEffect(() => {
    const client = new Client({
      brokerURL: WEBSOCKET_URL,
      reconnectDelay: 5000, // 자동 재연결 대기 시간
      onConnect: () => {
        console.log("Connected to WebSocket");

        // 메시지 수신 구독
        client.subscribe(`/sub/chat.${channelId}`, (message) => {
          const body = JSON.parse(message.body); // 수신된 메시지 파싱

          // 받은 메시지를 `chats` 상태에 업데이트 (userProfileImg 포함)
          setChats((prevChats) => [...prevChats, body]); // 기존 chats 상태에 새로운 메시지 추가
        });
      },
      onStompError: (error) => {
        console.error("STOMP error:", error);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate(); // 컴포넌트 언마운트 시 웹소켓 연결 종료
    };
  }, [channelId]);

  useEffect(() => {
    // 채팅 추가 시 스크롤 자동 이동
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats]);

  // 2. 메시지 전송
  const sendMessage = (chatMessage: string) => {
    if (!stompClient) return;

    const message = {
      sender, // 현재 사용자 닉네임
      message: chatMessage, // 입력된 채팅 메시지
    };

    stompClient.publish({
      destination: `/chat.${channelId}`, // 메시지를 발행할 서버 엔드포인트
      body: JSON.stringify(message), // JSON 형식으로 메시지 전송
    });

    // 로컬에서도 메시지 추가 (선택적으로 처리)
    setChats((prevChats) => [...prevChats, message]);
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
