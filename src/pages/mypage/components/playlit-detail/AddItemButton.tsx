import { Plus } from "lucide-react";
import { overlay } from "overlay-kit";
import AddItemModal from "@/pages/mypage/components/playlit-detail/AddItemModal";
import { useParams } from "react-router-dom";
import { useCallback } from "react";

export default function AddItemButton() {
  const { playlistId } = useParams();

  const openModal = useCallback(() => {
    if (!playlistId) return;

    overlay.open(({ unmount }) => {
      return <AddItemModal playlistId={playlistId} unmount={unmount} />;
    });
  }, [playlistId]);

  return (
    <button className="p-2 text-black" onClick={openModal}>
      <Plus className="w-6 h-6" />
    </button>
  );
}
