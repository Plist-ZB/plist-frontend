import { SUBSCRIPTION_TOPICS } from "@/pages/channel/constants/channelConstants";
import {
  channelVideoListAtom,
  currentTimeAtom,
  currentVideoIdAtom,
  initVideoIdAtom,
} from "@/store/channel";
import { Client, StompSubscription } from "@stomp/stompjs";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { YouTubeEvent, YouTubePlayer, YouTubeProps } from "react-youtube";

interface UseParticipantProps {
  readonly stompClient: Client;
  readonly channelId: number;
}

export const useParticipant = ({ stompClient, channelId }: UseParticipantProps) => {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [channelVideoList, setChannelVideoList] = useAtom(channelVideoListAtom);
  const [currentVideoId, setCurrentVideoId] = useAtom(currentVideoIdAtom);
  const [initVideoId, setInitVideoId] = useAtom(initVideoIdAtom);
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  /* 호스트 구독 경로와 로직 관리 */
  useEffect(() => {
    if (!stompClient || !channelId || !player) return;

    const subscriptions: StompSubscription[] = [];

    // 영상 재생상태 & 재생목록 리스트 구독
    if (stompClient.connected) {
      console.log("비디오 상태 구독 시도:", SUBSCRIPTION_TOPICS.VIDEO(channelId));

      /* 비디오 리스트 업데이트 */
      const videoSubscription = stompClient.subscribe(
        SUBSCRIPTION_TOPICS.VIDEO(channelId),
        (message) => {
          const body = JSON.parse(message.body);

          console.log("비디오 리스트 업데이트", body);

          if (!body.videoId) {
            setChannelVideoList(body);
          }
        }
      );
      subscriptions.push(videoSubscription);
    }

    // Cleanup: 모든 구독 해제
    return () => {
      console.log("MEDIA SECTION 구독 해제");
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  }, [stompClient.connected]);

  /* Player 이벤트 정의 */
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    console.log("\n onPlayerReady");

    setPlayer(event.target);
    setDuration(event.target.getDuration());
  };

  const onStateChange = (event: YouTubeEvent) => {
    console.log("\n onStateChange", event);
    setIsPlaying(event.data === 1);

    if (event.data === 0 && Math.ceil(currentTime) >= event.target.getDuration() - 1) {
      console.log("영상 종료");

      if (!channelVideoList) return;

      /* 현재 노래가 끝나면 다음 노래로 넘어가기 */
      const currentVideoIndex = channelVideoList.findIndex(
        (video) => video.videoId === initVideoId
      );

      const nextVideoId = channelVideoList[currentVideoIndex + 1]?.videoId;

      if (nextVideoId) {
        setCurrentVideoId(nextVideoId);
        setInitVideoId(nextVideoId);
        setCurrentTime(0);
      }
    }
  };

  return { initVideoId, player, onPlayerReady, onStateChange, duration, isPlaying };
};
