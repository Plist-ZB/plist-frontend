import ChannelTopBar from "@/pages/channel/components/ChannelTopBar";
import ChatArea from "@/pages/channel/components/ChatArea";
import { useStomp } from "@/pages/channel/hooks/useStomp";
import useGetChannelInfo from "@/pages/channel/hooks/useGetChannelInfo";
import OnErrorTopBar from "@/pages/channel/components/OnErrorTopBar";
import { Link } from "react-router-dom";
import HostMediaSection from "@/pages/channel/components/media-section/HostMediaSection";
import ParticipantMediaSection from "@/pages/channel/components/media-section/ParticipantMediaSection";
import { useMemo } from "react";

export default function ChannelPage() {
  const getChannelInfoQuery = useGetChannelInfo();
  const channelInfo = useMemo(() => getChannelInfoQuery.data, [getChannelInfoQuery.data]);
  const { stompClient } = useStomp({ isChannelDataFetched: getChannelInfoQuery.isSuccess });

  if (getChannelInfoQuery.isFetching) {
    return <div>Loading...</div>;
  }

  if (!stompClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      {channelInfo ? (
        <>
          <ChannelTopBar
            channelId={channelInfo.channelId}
            channelName={channelInfo.channelName}
            channelCreatedAt={channelInfo.channelCreatedAt}
          />

          {channelInfo.host ? (
            <HostMediaSection channelId={channelInfo.channelId} stompClient={stompClient} />
          ) : (
            <ParticipantMediaSection channelId={channelInfo.channelId} stompClient={stompClient} />
          )}

          <ChatArea channelId={channelInfo.channelId} stompClient={stompClient} />
        </>
      ) : (
        <>
          <OnErrorTopBar />
          <Link to="/" className="mx-auto my-40 text-2xl font-semibold text-primary-900">
            홈으로 돌아가기...
          </Link>
        </>
      )}
    </div>
  );
}
