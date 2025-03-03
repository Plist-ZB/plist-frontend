import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import createStompClient from "@/pages/channel/utils/createStompClient";
import { Client } from "@stomp/stompjs";

interface UseParticipantStompProps {
  isChannelDataFetched: boolean;
}

export const useParticipantStomp = ({ isChannelDataFetched }: UseParticipantStompProps) => {
  const { channelId } = useParams();
  const [stompClient, setStompClient] = useState<Client | undefined>(undefined);

  useEffect(() => {
    if (!channelId || !isChannelDataFetched) return;

    //console.log("channelId", channelId, isChannelDataFetched);

    const client = createStompClient({
      onConnectCallback: (/* client */) => {
        console.log("연결 성공");
        console.log("연결 성공???");
      },
      onErrorCallback: (error) => {
        console.error("STOMP Connection Error: ", error);
      },
    });

    client.onChangeState = (state) => {
      console.log("STOMP 상태 변경: ", state);
    };

    client.onWebSocketError = (error) => {
      console.error("WebSocket 오류: ", error);
    };

    /* client.onConnect = (frame) => {
      console.log("연결 성공: ", frame);
      client.subscribe("/sub/video.5", (message) => {
        console.log("직접 구독 & 메시지 수신: ", message);
      });
    }; */

    setStompClient(client);

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [channelId, isChannelDataFetched]);

  return { stompClient };
};
