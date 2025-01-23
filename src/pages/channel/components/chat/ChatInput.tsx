import { CirclePlus, Send } from "lucide-react";
import { overlay } from "overlay-kit";
import { useState } from "react";
import SearchBottomSheet from "../search/SearchBottomSheet";
import { useParams } from "react-router-dom";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const openSearchBottomSheet = (channelId: string) => () => {
  overlay.open(({ isOpen, unmount }) => (
    <SearchBottomSheet isOpen={isOpen} unmount={unmount} channelId={channelId} />
  ));
};

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const { channelId } = useParams();
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim()) {
      onSendMessage(message); // 부모로 메시지 전달
      setMessage(""); // 입력 필드 초기화
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex items-center w-full gap-2 px-1 py-2 border-t border-border">
      <button className="p-2" onClick={openSearchBottomSheet(channelId!)}>
        <CirclePlus />
      </button>

      <input
        type="text"
        value={message}
        onChange={handleChange}
        className="flex-grow px-4 py-2 border rounded-lg border-border"
        onKeyDown={onKeyDown}
      />
      <button className="p-2" onClick={sendMessage}>
        <Send />
      </button>
    </div>
  );
}
