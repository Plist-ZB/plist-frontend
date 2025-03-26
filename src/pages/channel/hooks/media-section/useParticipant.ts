import { PLAYER_STATES, SUBSCRIPTION_TOPICS } from "@/pages/channel/constants/channelConstants";
import {
  channelVideoListAtom,
  currentTimeAtom,
  currentVideoIdAtom,
  initVideoIdAtom,
} from "@/store/channel";
import { Client, StompSubscription } from "@stomp/stompjs";
import { useAtom, useSetAtom } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";
import { YouTubeEvent, YouTubePlayer, YouTubeProps } from "react-youtube";

interface UseParticipantProps {
  readonly stompClient: Client;
  readonly channelId: number;
}

function isPlayState(body: IVideo[] | PlayState): body is PlayState {
  return "videoId" in body;
}

export const useParticipant = ({ stompClient, channelId }: UseParticipantProps) => {
  const [isReady, setIsReady] = useState(false);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const setChannelVideoList = useSetAtom(channelVideoListAtom);
  const setCurrentVideoId = useSetAtom(currentVideoIdAtom);
  const [initVideoId, setInitVideoId] = useAtom(initVideoIdAtom);
  const setCurrentTime = useSetAtom(currentTimeAtom);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playerRef = useRef<YouTubePlayer | null>(null);

  /* 호스트 구독 경로와 로직 관리 */
  useEffect(() => {
    if (!stompClient || !channelId || !player || !isReady) return;

    console.log(player.getOptions());

    const subscriptions: StompSubscription[] = [];

    // 영상 재생상태 & 재생목록 리스트 구독
    if (stompClient.connected && isReady && player && playerRef.current) {
      console.log("비디오 상태 구독 시도:", SUBSCRIPTION_TOPICS.VIDEO(channelId));

      /* 비디오 리스트 업데이트 */
      const videoSubscription = stompClient.subscribe(
        SUBSCRIPTION_TOPICS.VIDEO(channelId),
        (message) => {
          const body = JSON.parse(message.body) as IVideo[] | PlayState;

          console.log("비디오 리스트 업데이트", body);

          if (!isPlayState(body)) {
            setChannelVideoList(body);
          } else {
            console.log("재생상태 업데이트", body);

            console.log("플레이어 정의됨? :", player?.getPlayerState());

            if (body.playStates === 1) {
              console.log(PLAYER_STATES[1]);
              console.log(player);
              //player.playVideo();
              playerRef.current?.internalPlayer?.playVideo();
              console.log(1);
            } else {
              console.log(PLAYER_STATES[2]);
              //player.pauseVideo();
              console.log(player);
              playerRef.current?.internalPlayer?.pauseVideo();
              console.log(2);
            }

            setCurrentVideoId(body.videoId);
            setInitVideoId(body.videoId);
            player.loadVideoById(body.videoId, body.currentTime);
            player.seekTo(body.currentTime);
            setCurrentTime(body.currentTime);
          }
        }
      );
      subscriptions.push(videoSubscription);

      /* 비디오 리스트 업데이트 */
      const exitSubscription = stompClient.subscribe(
        SUBSCRIPTION_TOPICS.EXIT(channelId),
        (message) => {
          const body = JSON.parse(message.body);

          console.log("호스트 나감", body);
        }
      );
      subscriptions.push(exitSubscription);
    }

    /* 입장 알림 */
    stompClient.publish({
      destination: `/pub/enter.${channelId}`,
    });

    // Cleanup: 모든 구독 해제
    return () => {
      console.log("MEDIA SECTION 구독 해제");
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  }, [stompClient.connected, player, isReady]);

  /* Player 이벤트 정의 */
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    console.log("\n onPlayerReady");

    setPlayer(event.target);
    setDuration(event.target.getDuration());
    setIsReady(true);
  };

  const onStateChange = (event: YouTubeEvent) => {
    console.log("\n onStateChange", event);
    setIsPlaying(event.data === 1);
  };

  const testPlay = useCallback(() => {
    player?.playVideo();
  }, [player]);

  return {
    initVideoId,
    player,
    onPlayerReady,
    duration,
    isPlaying,
    testPlay,
    playerRef,
    onStateChange,
  };
};
