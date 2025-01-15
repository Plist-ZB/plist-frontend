import ChannelTopBar from "@/pages/channel/components/ChannelTopBar";
import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import VideoPlayer from "@/pages/channel/components/VideoPlayer";
import Playlist from "@/pages/channel/components/Playlist";
import ChatArea from "@/pages/channel/components/ChatArea";

export default function ChannelPage() {
  const { id } = useParams();
  /* TODO: 위에서 얻은 id로 채널방 정보 가져오고 웹소켓 연결하기 */
  const [videoId, setVideoId] = useState("2g811Eo7K8U");
  const title = "듣기 좋은 발라드 추천 좀 해주세요";
  const [isHost, setIsHost] = useState(true);
  /* 
  // TODO: 호스트 여부 페칭해서 메모리에 저장하는 로직
  useMemo(() => {
    const checkIsHost = async () => {
      const response = await fetch(`/api/channel/${id}`).then((res) => res.json());
      setIsHost(response?.isHost ?? false);
    };
    checkIsHost();
  }, [id]);
 */
  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <ChannelTopBar title={title} />

      <VideoPlayer videoId={videoId} />

      <div className="flex flex-col flex-1 w-full min-h-0 bg-white">
        <Playlist isHost={isHost} />
        <ChatArea />
      </div>
    </div>
  );
}
