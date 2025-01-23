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

      console.log(1, response);

      setIsHost(response.host);
      setChannelVideoList(response.videoList || []);
      setCurrentVideoId(response.videoList[0]?.videoId || "");
      setInitVideoId(response.videoList[0]?.videoId || "");

      return response;
    },
    enabled: !!channelId,
  });

  return getChannelInfoQuery;
}
