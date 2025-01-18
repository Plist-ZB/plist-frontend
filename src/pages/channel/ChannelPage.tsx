import ChannelTopBar from "@/pages/channel/components/ChannelTopBar";
import { useEffect, useMemo, useState } from "react";
import VideoPlayer from "@/pages/channel/components/VideoPlayer";
import Playlist from "@/pages/channel/components/Playlist";
import ChatArea from "@/pages/channel/components/ChatArea";
import { useStomp } from "@/pages/channel/hooks/useStomp";
import useChannelEvents from "@/pages/channel/hooks/useChannelEvents";

export default function ChannelPage() {
  //const { channelId, stompClient, channelInfo } = useStomp();
  const { channelId, isHost, enterChannelMutation, exitChannelMutation } = useChannelEvents();

  const email = useMemo(() => {
    const accessToken = localStorage.getItem("access_token");
    const payload = accessToken?.split(".")[1] as string;
    const decodedPayload = JSON.parse(atob(payload));
    console.log(decodedPayload.email);

    return decodedPayload.email;
  }, []);

  /* TODO: 위에서 얻은 id로 채널방 정보 가져오고 웹소켓 연결하기 */
  const [videoId, setVideoId] = useState("2g811Eo7K8U");

  const stompClient = undefined;

  if (enterChannelMutation.isPending) {
    return <div>Loading...</div>;
  }

  if (stompClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      {enterChannelMutation.data && (
        <ChannelTopBar
          channelId={enterChannelMutation.data.channelId}
          channelName={enterChannelMutation.data.channelName}
          channelCreatedAt={enterChannelMutation.data.channelCreatedAt}
        />
      )}

      <VideoPlayer videoId={videoId} stompClient={stompClient} />
      {/* 테스트용 버튼 */}
      <button
        onClick={() => {
          const pubMessage = {
            email: "korjihu@gmail.com",
            message: "테스트",
          };

          stompClient?.publish({
            destination: `/pub/chat.${channelId}`,
            body: JSON.stringify(pubMessage),
          });
        }}
      >
        메세지 전송 테스트
      </button>
      <button
        onClick={() => {
          const video = {
            videoId: "string",
            currentTime: 0,
            playState: 0,
          };

          stompClient?.publish({
            destination: `/pub/video.${channelId}`,
            body: JSON.stringify(video),
          });
        }}
      >
        비디오 정보 전송 테스트
      </button>

      <div className="flex flex-col flex-1 w-full min-h-0 bg-white">
        <Playlist isHost={isHost} stompClient={stompClient} />
        <ChatArea channelId={channelId as string} stompClient={stompClient} />
      </div>
    </div>
  );
}
