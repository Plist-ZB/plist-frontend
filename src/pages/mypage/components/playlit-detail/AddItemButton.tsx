import { Plus } from "lucide-react";
import { overlay } from "overlay-kit";
import AddItemModal from "@/pages/mypage/components/playlit-detail/AddItemModal";

export default function AddItemButton() {
  const openModal = () => {
    overlay.open(({ unmount }) => {
      return <AddItemModal unmount={unmount} />;
    });
  };

  return (
    <button className="p-2 text-black" onClick={openModal}>
      <Plus className="w-6 h-6" />
    </button>
  );
}
