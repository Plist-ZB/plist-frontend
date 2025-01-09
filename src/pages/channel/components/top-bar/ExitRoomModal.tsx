import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExitRoomModal({ unmount }: { unmount: () => void }) {
  const navigate = useNavigate();

  const onClickGoBack = () => {
    unmount();
    navigate("../");
  };

  const onClickGoBackWithSave = () => {
    //TODO: 재생목록 추가하는 로직 추가
    unmount();
    navigate("../");
  };

  return (
    <div
      role="button"
      className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-30 animate-fadeIn"
      onClick={unmount}
    >
      <div
        role="dialog"
        className={`relative flex flex-col w-full max-w-3xl gap-8 px-4 py-8 mx-4 bg-white border rounded-lg shadow-lg border-gray-border animate-fadeIn`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="relative flex items-center justify-center font-bold bg-white">
          <div className="font-bold text-center">Youtube 영상 추가</div>
          <X className="absolute right-0 w-6 h-6 cursor-pointer" onClick={unmount} />
        </header>

        <div className="text-center">플레이리스트를 저장하시고 나가겠어요?</div>

        <div className="flex items-center justify-around w-full gap-2">
          <button
            className="w-1/2 p-2 px-4 text-black bg-white border border-gray-border"
            onClick={onClickGoBack}
          >
            그냥 나가기
          </button>
          <button
            className="w-1/2 p-2 px-4 bg-white border text-primary-main border-gray-border"
            onClick={onClickGoBackWithSave}
          >
            추가하고 나가기
          </button>
        </div>
      </div>
    </div>
  );
}
