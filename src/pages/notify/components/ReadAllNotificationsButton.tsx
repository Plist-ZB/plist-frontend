import { patchAllMessagesToRead } from "@/services/api/messageAPI";
import { useQueryClient } from "@tanstack/react-query";

export default function ReadAllNotificationsButton() {
  const queryClient = useQueryClient();

  const onClickHandler = async () => {
    try {
      const response = await patchAllMessagesToRead();

      console.log(response);

      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["hasUnreadMessages"] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={onClickHandler} className="text-sm font-medium border-none">
      모두 읽음 처리
    </button>
  );
}
