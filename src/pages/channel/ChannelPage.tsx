import ChannelTopBar from "@/pages/channel/components/ChannelTopBar";
import { useState } from "react";
import VideoPlayer from "@/pages/channel/components/VideoPlayer";
import Playlist from "@/pages/channel/components/Playlist";
import ChatArea from "@/pages/channel/components/ChatArea";
import { useStomp } from "@/pages/channel/hooks/useStomp";
import useGetChannelInfo from "@/pages/channel/hooks/useGetChannelInfo";

export default function ChannelPage() {
  const getChannelInfoQuery = useGetChannelInfo();
  const { stompClient } = useStomp();

  /* TODO: 위에서 얻은 id로 채널방 정보 가져오고 웹소켓 연결하기 */
  const [videoId, setVideoId] = useState("2g811Eo7K8U");

  if (getChannelInfoQuery.isFetching) {
    return <div>Loading...</div>;
  }

  console.log(getChannelInfoQuery.data);

  if (!stompClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      {getChannelInfoQuery.data && (
        <ChannelTopBar
          channelId={getChannelInfoQuery.data.channelId}
          channelName={getChannelInfoQuery.data.channelName}
          channelCreatedAt={getChannelInfoQuery.data.channelCreatedAt}
        />
      )}

      <VideoPlayer videoId={videoId} stompClient={stompClient} />

      <div className="flex flex-col flex-1 w-full min-h-0 bg-white">
        <Playlist isHost={getChannelInfoQuery.data.host} stompClient={stompClient} />
        <ChatArea channelId={getChannelInfoQuery.data.channelId} stompClient={stompClient} />
      </div>
    </div>
  );
}
