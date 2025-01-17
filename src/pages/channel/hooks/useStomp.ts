import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import createStompClient from "@/pages/channel/utils/createStompClient";
import { Client } from "@stomp/stompjs";
import { instance } from "@/services/api/instance";

export const useStomp = () => {
  const { channelId } = useParams();
  const { state } = useLocation();
  const [stompClient, setStompClient] = useState<Client | undefined>(undefined);
  const [isHost, setIsHost] = useState(false);
  const [channelInfo, setChannelInfo] = useState<any>(null);

  useEffect(() => {
    const getChannelInfo = async () => {
      const { data: response } = await instance.patch(`/channel/${channelId}`);

      console.log("채널 입장", response);
      setChannelInfo(response);
    };

    const exitChannel = async () => {
      const response = await instance.patch(`/channel/exit/${channelId}`);

      console.log("채널 나가기", response);
    };

    if (channelId) {
      getChannelInfo();
    }

    return () => {
      // exitChannel();
    };
  }, [channelId]);

  useEffect(() => {
    if (state) {
      setIsHost(state.host);
    }
  }, [state]);

  useEffect(() => {
    if (!channelId) return;

    const client = createStompClient({
      onConnectCallback: (client) => {
        // console.log("연결 성공");
        // client.subscribe(`/sub/chat.${channelId}`, function (message) {
        //   // 메시지를 JSON 형식으로 파싱
        //   console.log("SUB 채팅");
        //   const chatMessage = JSON.parse(message.body);
        //   console.log(chatMessage);
        // });
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

  return {
    channelId,
    stompClient,
    channelInfo,
  };
};
