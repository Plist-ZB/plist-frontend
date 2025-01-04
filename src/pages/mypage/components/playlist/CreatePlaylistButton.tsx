import { Plus } from "lucide-react";
import { overlay } from "overlay-kit";
import CreatePlaylistModal from "@/pages/mypage/components/playlist/CreatePlaylistModal";

export default function CreatePlaylistButton() {
  const openModal = () => {
    overlay.open(({ unmount }) => {
      return <CreatePlaylistModal unmount={unmount} />;
    });
  };

  return (
    <button className="text-black" onClick={openModal}>
      <Plus className="w-6 h-6" />
    </button>
  );
}
