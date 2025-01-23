import { instance } from "@/services/api/instance";
import { useMutation } from "@tanstack/react-query";

export default function useExitChannel() {
  const exitChannelMutation = useMutation({
    mutationFn: async (channelId: string) => {
      const response = await instance.patch(`/channel/exit/${channelId}`);

      return response;
    },
    onSuccess: () => {
      console.log("EXIT_SUCCESS");
      return "EXIT_SUCCESS";
    },
    onError: (error) => {
      console.error(error);
    },
  });

  ///v3/api/channel/{channelId}/save-playlist
  const saveChannelPlaylistMutation = useMutation({
    mutationFn: async (channelId: string) => {
      const response = await instance.post(`/channel/${channelId}/save-playlist`);

      console.log(response);

      return response;
    },
    onSuccess: () => {
      console.log("EXIT_WITH_SAVE_SUCCESS");
      return "EXIT_WITH_SAVE_SUCCESS";
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const closeChannelMutation = useMutation({
    mutationFn: async (channelId: string) => {
      const response = await instance.patch(`/channel/destroy/${channelId}`);

      return response;
    },
    onSuccess: () => {
      console.log("CLOSE_SUCCESS");
      return "CLOSE_SUCCESS";
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { exitChannelMutation, closeChannelMutation, saveChannelPlaylistMutation };
}
