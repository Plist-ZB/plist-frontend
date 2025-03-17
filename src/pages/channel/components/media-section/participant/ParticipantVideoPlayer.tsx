import YouTube from "react-youtube";
import ParticipantPlayBar from "@/pages/channel/components/media-section/participant/ParticipantPlayBar";
import { useParticipant } from "@/pages/channel/hooks/media-section/useParticipant";
import { Client } from "@stomp/stompjs";
import { PlayerOptions } from "@/pages/channel/constants/channelConstants";

export default function ParticipantVideoPlayer({
  stompClient,
  channelId,
}: {
  readonly stompClient: Client;
  readonly channelId: number;
}) {
  /* 여기부터 리팩토링 시작! */
  const { player, onPlayerReady, duration, isPlaying, initVideoId, playerRef, onStateChange } =
    useParticipant({
      stompClient,
      channelId,
    });

  if (!initVideoId) return null;

  return (
    <div className="relative w-full aspect-video">
      <div className="absolute z-10 w-full h-[calc(100%-34px)] bg-transparent aspect-video"></div>

      <YouTube
        videoId={initVideoId}
        opts={PlayerOptions}
        onReady={onPlayerReady}
        onStateChange={onStateChange}
        ref={playerRef}
        className="absolute top-0 left-0 w-full h-full"
        iframeClassName="w-full h-full"
      />

      <ParticipantPlayBar isPlaying={isPlaying} duration={duration} player={player} />
    </div>
  );
}
