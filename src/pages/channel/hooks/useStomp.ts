import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import createStompClient from "@/pages/channel/utils/createStompClient";
import { Client } from "@stomp/stompjs";

interface UseStompProps {
  isChannelDataFetched: boolean;
}

export const useStomp = ({ isChannelDataFetched }: UseStompProps) => {
  const { channelId } = useParams();
  const [stompClient, setStompClient] = useState<Client | undefined>(undefined);

  useEffect(() => {
    if (!channelId || !isChannelDataFetched) return;

    console.log("channelId", channelId, isChannelDataFetched);

    const client = createStompClient({
      onConnectCallback: (/* client */) => {
        console.log("연결 성공");
      },
      onErrorCallback: (error) => {
        console.error("STOMP Connection Error: ", error);
      },
    });

    setStompClient(client);
    client.activate();

    return () => {
      client.deactivate();
    };
  }, [channelId, isChannelDataFetched]);

  return { stompClient };
};
