import { instance } from "@/services/api/instance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useSetAtom } from "jotai";
import { isChannelHostAtom, channelVideoListAtom } from "@/store/channel";

export default function useGetChannelInfo() {
  const { channelId } = useParams();
  const setIsHost = useSetAtom(isChannelHostAtom);
  const setChannelVideoList = useSetAtom(channelVideoListAtom);

  const getChannelInfoQuery = useQuery({
    queryKey: ["channelInfo", channelId],
    queryFn: async () => {
      const { data: response } = await instance.get<IChannelData>(`/channel/${channelId}`);

      console.log("in hook", response);
      setIsHost(response.host);
      setChannelVideoList(response.videoList);

      return response;
    },
    enabled: !!channelId,
  });

  return getChannelInfoQuery;
}
