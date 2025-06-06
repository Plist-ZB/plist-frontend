import { instance } from "@/services/api/instance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useSetAtom } from "jotai";
import {
  isChannelHostAtom,
  channelVideoListAtom,
  initVideoIdAtom,
  currentVideoIdAtom,
} from "@/store/channel";

export default function useGetChannelInfo() {
  const { channelId } = useParams();
  const setIsHost = useSetAtom(isChannelHostAtom);
  const setChannelVideoList = useSetAtom(channelVideoListAtom);
  const setCurrentVideoId = useSetAtom(currentVideoIdAtom);
  const setInitVideoId = useSetAtom(initVideoIdAtom);

  const getChannelInfoQuery = useQuery({
    queryKey: ["channelInfo", channelId],
    queryFn: async () => {
      const { data: response } = await instance.get<IChannelData>(`/channel/${channelId}`);

      const { host: isHost, videoList } = response;

      setIsHost(isHost);
      setChannelVideoList(videoList || []);
      setCurrentVideoId(videoList[0]?.videoId || "");
      setInitVideoId(videoList[0]?.videoId || "");

      return response;
    },
    enabled: !!channelId,
  });

  return getChannelInfoQuery;
}
