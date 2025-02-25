import { HOST_SUBSCRIPTION_TOPICS } from "@/pages/channel/constants/channelConstants";
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

interface UseHostProps {
  readonly stompClient: Client;
  readonly channelId: number;
  readonly email: string;
}

export const useHost = ({ stompClient, channelId, email }: UseHostProps) => {
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
      console.log("비디오 상태 구독 시도:", HOST_SUBSCRIPTION_TOPICS.VIDEO(channelId));

      /* 비디오 리스트 업데이트 */
      const videoSubscription = stompClient.subscribe(
        HOST_SUBSCRIPTION_TOPICS.VIDEO(channelId),
        (message) => {
          const body = JSON.parse(message.body);

          if (!body.videoId) {
            console.log("비디오 리스트 업데이트", body);
            setChannelVideoList(body);
          }
        }
      );
      subscriptions.push(videoSubscription);

      /* 신규 참여자에게 현재 재생전보 전달용 */
      const joinSubscription = stompClient.subscribe(
        HOST_SUBSCRIPTION_TOPICS.ENTER(channelId),
        (message) => {
          if (message.body === "NEW_USER_ENTER") {
            console.log("새 유저 입장 감지");

            if (!currentVideoId) return;

            stompClient.publish({
              destination: `/pub/video.control.${channelId}`,
              body: JSON.stringify({
                email: email,
                videoId: currentVideoId,
                currentTime: player.getCurrentTime(),
                playState: isPlaying ? 1 : 2,
              }),
            });
          }
        }
      );
      subscriptions.push(joinSubscription);
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
    console.log("\n onStateChange", event, event.target);
    setIsPlaying(event.data === 1);

    if (event.data === 0 && Math.ceil(currentTime) === event.target.getDuration()) {
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
