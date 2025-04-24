import { getUnreadMessages } from "@/services/api/messageAPI";
import { useQuery } from "@tanstack/react-query";

const useGetUnread = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["hasUnreadMessages"],
    queryFn: async () => {
      try {
        const result = await getUnreadMessages();

        return result;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: true,
    refetchInterval: 1000 * 60,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60,
  });

  return { data, isLoading };
};

export default useGetUnread;
