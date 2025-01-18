import { instance } from "@/services/api/instance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";

const useChannelEvents = () => {
  const { channelId } = useParams();
  const { state } = useLocation();

  const exitChannelMutation = useMutation({
    mutationFn: async (channelId: string) => {
      const response = await instance.patch(`/channel/exit/${channelId}`);

      console.log(2, response);

      return response;
    },
    onSuccess: () => {
      return "EXIT_SUCCESS";
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const enterChannelMutation = useMutation({
    mutationFn: async (channelId: string) => {
      const { data: response } = await instance.patch(`/channel/${channelId}`);

      if (response.errorCode === 400) {
        throw new Error("이미 채널에 참가 중 입니다.");
      }

      return response;
    },
    onSuccess: (data) => {
      console.log("채널 입장 성공");
      return data;
    },
    onError: async (error) => {
      if (error.message === "이미 채널에 참가 중 입니다.") {
        console.log("에러 발생!!!");
        // 퇴장 API 호출
        exitChannelMutation.mutate(channelId as string);
        // 다시 입장 API 호출
        enterChannelMutation.mutate(channelId as string);
      }
    },
  });

  const getChannelInfoQuery = useQuery({
    queryKey: ["channelInfo", channelId],
    queryFn: async () => {
      const response = await instance.get(`/channel/${channelId}`);

      //console.log(response);

      return response;
    },
    enabled: !!channelId,
  });

  useEffect(() => {
    if (!channelId) return;
    if (!state) {
      enterChannelMutation.mutate(channelId);
    }
  }, [channelId, state]);

  const isHost = useMemo(() => {
    return enterChannelMutation.data?.host || false;
  }, [enterChannelMutation.data]);

  return { channelId, isHost, enterChannelMutation, exitChannelMutation };
};

export default useChannelEvents;
