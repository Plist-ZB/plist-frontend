import { instance } from "@/services/api/instance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useGetChannelInfo() {
  const { channelId } = useParams();

  const getChannelInfoQuery = useQuery({
    queryKey: ["channelInfo", channelId],
    queryFn: async () => {
      const { data: response } = await instance.get(`/channel/${channelId}`);

      return response;
    },
    enabled: !!channelId,
  });

  return getChannelInfoQuery;
}
