import { instance } from "@/services/api/instance";
import { useMutation } from "@tanstack/react-query";

export default function useHostItemLogics(channelId: number) {
  const deleteVideoMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await instance.patch(`/channel/${channelId}/delete-video?id=${id}`);

      return response;
    },
    onSuccess: () => {
      console.log("DELETE_VIDEO_SUCCESS");
      return "DELETE_VIDEO_SUCCESS";
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const reorderChannelPlaylistMutation = useMutation({
    mutationFn: async (item: IVideo[]) => {
      const response = await instance.post(`/channel/${channelId}/update`, JSON.stringify(item));

      return response;
    },
    onSuccess: () => {
      console.log("REORDER_LIST_SUCCESS");
      return "REORDER_LIST_SUCCESS";
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { deleteVideoMutation, reorderChannelPlaylistMutation };
}
