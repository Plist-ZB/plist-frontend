import YouTube from "react-youtube";
import HostPlayBar from "@/pages/channel/components/media-section/host/HostPlayBar";
import { useMemo } from "react";
import { getEmailFromToken } from "@/pages/channel/utils/getDataFromToken";
import { useHost } from "@/pages/channel/hooks/media-section/useHost";
import { Client } from "@stomp/stompjs";
import { PlayerOptions } from "@/pages/channel/constants/channelConstants";

export default function HostVideoPlayer({
  stompClient,
  channelId,
}: {
  readonly stompClient: Client;
  readonly channelId: number;
}) {
  const email = useMemo(() => getEmailFromToken(), []);

  /* 여기부터 리팩토링 시작! */
  const { player, onPlayerReady, onStateChange, duration, isPlaying, initVideoId } = useHost({
    stompClient,
    channelId,
    email,
  });

  return (
    <div className="relative w-full aspect-video">
      <div className="absolute z-10 w-full h-[calc(100%-34px)] bg-transparent aspect-video"></div>

      <YouTube
        videoId={initVideoId}
        opts={PlayerOptions}
        onReady={onPlayerReady}
        onStateChange={onStateChange}
        className="absolute top-0 left-0 w-full h-full"
        iframeClassName="w-full h-full"
      />

      <HostPlayBar
        isPlaying={isPlaying}
        stompClient={stompClient}
        channelId={Number(channelId)}
        email={email}
        player={player}
        duration={duration}
      />
    </div>
  );
}
