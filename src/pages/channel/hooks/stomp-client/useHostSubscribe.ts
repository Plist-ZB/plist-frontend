import { Client, StompSubscription } from "@stomp/stompjs";
import { SUBSCRIPTION_TOPICS } from "../../constants/channelConstants";

interface UseHostSubscribeProps {
  readonly stompClient: Client;
  readonly channelId: number;
}

export const useHostSubscribe = ({ stompClient, channelId }: UseHostSubscribeProps) => {
  const subscriptions: StompSubscription[] = [];

  /* 비디오 리스트 업데이트 */
  const videoSubscription = stompClient.subscribe(
    SUBSCRIPTION_TOPICS.VIDEO(channelId),
    (message) => {
      const body = JSON.parse(message.body);

      if (!body.videoId) {
        console.log("비디오 리스트 업데이트", body);
        setChannelVideoList(body);
      }
    }
  );

  /* 신규 참여자에게 현재 재생전보 전달용 */
  const joinSubscription = stompClient.subscribe(
    SUBSCRIPTION_TOPICS.ENTER(channelId),
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

  return 1;
};
