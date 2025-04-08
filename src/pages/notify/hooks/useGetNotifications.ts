import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/services/api/messageAPI";

const useGetNotifications = () => {
  return useQuery<MessageResponseType>({
    queryKey: ["messages"],
    queryFn: async () => {
      try {
        const result = await getMessages();

        return result;
      } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
      }
    },
    enabled: true,
  });
};

export default useGetNotifications;
