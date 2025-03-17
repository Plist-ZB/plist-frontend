import { Client } from "@stomp/stompjs";
import ParticipantVideoPlayer from "./participant/ParticipantVideoPlayer";
import ParticipantPlaylist from "./participant/ParticipantPlaylist";

export default function ParticipantMediaSection({
  stompClient,
  channelId,
}: {
  readonly stompClient: Client;
  readonly channelId: number;
}) {
  if (!stompClient) {
    return <div>loading...</div>;
  }

  return (
    <>
      <ParticipantVideoPlayer channelId={channelId} stompClient={stompClient} />
      <ParticipantPlaylist />
    </>
  );
}
