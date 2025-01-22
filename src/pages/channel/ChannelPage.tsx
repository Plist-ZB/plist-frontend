import ChannelTopBar from "@/pages/channel/components/ChannelTopBar";
import VideoPlayer from "@/pages/channel/components/VideoPlayer";
import Playlist from "@/pages/channel/components/Playlist";
import ChatArea from "@/pages/channel/components/ChatArea";
import { useStomp } from "@/pages/channel/hooks/useStomp";
import useGetChannelInfo from "@/pages/channel/hooks/useGetChannelInfo";
import OnErrorTopBar from "@/pages/channel/components/OnErrorTopBar";
import { Link } from "react-router-dom";

export default function ChannelPage() {
  const getChannelInfoQuery = useGetChannelInfo();
  const { stompClient } = useStomp();

  if (getChannelInfoQuery.isFetching) {
    return <div>Loading...</div>;
  }

  if (!stompClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      {getChannelInfoQuery.data ? (
        <ChannelTopBar
          channelId={getChannelInfoQuery.data.channelId}
          channelName={getChannelInfoQuery.data.channelName}
          channelCreatedAt={getChannelInfoQuery.data.channelCreatedAt}
        />
      ) : (
        <OnErrorTopBar />
      )}

      {getChannelInfoQuery.data ? (
        <VideoPlayer channelId={getChannelInfoQuery.data?.channelId} stompClient={stompClient} />
      ) : (
        <Link to="/" className="mx-auto my-40 text-2xl font-semibold text-primary-900">
          홈으로 돌아가기...
        </Link>
      )}

      <div className="flex flex-col flex-1 w-full min-h-0 bg-white">
        {getChannelInfoQuery.data && (
          <>
            <Playlist channelId={getChannelInfoQuery.data.channelId} stompClient={stompClient} />
            <ChatArea channelId={getChannelInfoQuery.data.channelId} stompClient={stompClient} />
          </>
        )}
      </div>
    </div>
  );
}
