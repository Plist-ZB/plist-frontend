import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface StompClientConfig {
  onConnectCallback?: (client: Client) => void;
  onErrorCallback?: (error: string) => void;
}

const createStompClient = ({ onConnectCallback, onErrorCallback }: StompClientConfig): Client => {
  const sockJS = new SockJS(`${import.meta.env.VITE_API_SERVER_DOMAIN}/ws-connect`);

  const accessToken = localStorage.getItem("access_token");
  const client = new Client({
    brokerURL: `ws://${import.meta.env.VITE_WS_SERVER_DOMAIN}/ws-connect`,
    webSocketFactory: () => sockJS,
    connectHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },

    debug: (str: string): void => {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
    onConnect: () => {
      console.log("STOMP Client Connected");
      if (onConnectCallback) {
        onConnectCallback(client);
      }
    },
    onStompError: (frame) => {
      console.error("Broker reported error: ", frame.headers["message"]);
      console.error("Details: ", frame.body);
      if (onErrorCallback) {
        onErrorCallback(frame.headers["message"]);
      }
    },
  });

  return client;
};

export default createStompClient;
