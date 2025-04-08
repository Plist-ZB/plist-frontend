import { patchMessageToReadById } from "@/services/api/messageAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useReadNotiMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (messageId: number) => {
      try {
        const response = await patchMessageToReadById(messageId);
        console.log(1, response);
      } catch (error) {
        console.log(2, error);
        throw new Error("알림 읽기 실패");
      }
    },
    onSuccess: (data) => {
      console.log("성공함", data);

      queryClient.invalidateQueries({ queryKey: ["messages"] });
      return data;
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useReadNotiMessage;
