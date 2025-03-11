import { Client } from "@stomp/stompjs";
import HostVideoPlayer from "./host/HostVideoPlayer";
import HostPlaylist from "./host/HostPlaylist";

export default function HostMediaSection({
  stompClient,
  channelId,
}: {
  readonly stompClient: Client;
  readonly channelId: number;
}) {
  if (!stompClient || !channelId) {
    return <div>loading...</div>;
  }

  return (
    <>
      <HostVideoPlayer channelId={channelId} stompClient={stompClient} />
      <HostPlaylist channelId={channelId} stompClient={stompClient} />
    </>
  );
}
