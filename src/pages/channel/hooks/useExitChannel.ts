import { instance } from "@/services/api/instance";
import { useMutation } from "@tanstack/react-query";

export default function useExitChannel() {
  const exitChannelMutation = useMutation({
    mutationFn: async (channelId: string) => {
      const response = await instance.patch(`/channel/exit/${channelId}`);

      return response;
    },
    onSuccess: () => {
      return "EXIT_SUCCESS";
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return exitChannelMutation;
}
