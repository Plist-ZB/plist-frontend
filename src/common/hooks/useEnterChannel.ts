import { instance } from "@/services/api/instance";
import { useMutation } from "@tanstack/react-query";

export default function useEnterChannel() {
  const enterChannelMutation = useMutation({
    mutationFn: async (channelId: number) => {
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
      console.error(error);
    },
  });

  return enterChannelMutation;
}
