import ChannelTopBar from "@/pages/channel/components/ChannelTopBar";
import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import VideoPlayer from "@/pages/channel/components/VideoPlayer";
import Playlist from "@/pages/channel/components/Playlist";
import ChatArea from "@/pages/channel/components/ChatArea";
import { useStomp } from "@/pages/channel/hooks/useStomp";

export default function ChannelPage() {
  const { channelId, stompClient, channelInfo } = useStomp();

  /* TODO: 위에서 얻은 id로 채널방 정보 가져오고 웹소켓 연결하기 */
  const [videoId, setVideoId] = useState("2g811Eo7K8U");
  const title = "듣기 좋은 발라드 추천 좀 해주세요";
  const [isHost, setIsHost] = useState(true);

  const pubMessage = {
    sender: "Jihun Noh",
    message: "테스트",
  };

  if (!stompClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <ChannelTopBar title={title} channelCreatedAt={channelInfo?.channelCreatedAt} />

      <VideoPlayer videoId={videoId} stompClient={stompClient} />
      {/* 테스트용 버튼 */}
      <button
        onClick={() => {
          console.log(channelInfo);

          stompClient?.publish({
            destination: `/pub/chat.${channelId}`,
            body: JSON.stringify(pubMessage),
          });
        }}
      >
        메세지 전송 테스트
      </button>

      <div className="flex flex-col flex-1 w-full min-h-0 bg-white">
        <Playlist isHost={isHost} stompClient={stompClient} />
        <ChatArea stompClient={stompClient} />
      </div>
    </div>
  );
}
