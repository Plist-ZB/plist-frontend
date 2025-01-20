import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import createStompClient from "@/pages/channel/utils/createStompClient";
import { Client } from "@stomp/stompjs";

export const useStomp = () => {
  const { channelId } = useParams();
  const [stompClient, setStompClient] = useState<Client | undefined>(undefined);

  useEffect(() => {
    if (!channelId) return;

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
  }, [channelId]);

  return { stompClient };
};
