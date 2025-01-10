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

  // TODO: API 페칭으로 변경 후 삭제
  const SAMPLE_PLAYLIST_IMAGE = "https://i.ytimg.com/vi/BS7tz2rAOSA/mqdefault.jpg";

  return (
    <div
      role="button"
      className="fixed inset-0 z-50 flex bg-white center bg-opacity-30 animate-fadeIn"
      onClick={unmount}
    >
      <div
        role="dialog"
        className={`flex items-center flex-col w-full max-w-3xl gap-8 px-4 py-8 mx-4 bg-white border rounded-lg shadow-lg border-gray-border animate-fadeIn`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="relative flex items-center justify-center w-full font-bold bg-white">
          <div className="text-xl font-bold text-center">방 나가기</div>
          <X className="absolute right-0 w-8 h-8 cursor-pointer" onClick={unmount} />
        </header>

        <div className="text-center">플레이리스트를 저장하시고 나가겠어요?</div>

        {/* 플레이리스트 정보 */}
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center flex-shrink border rounded-lg max-w-48 border-gray-border">
            <div
              className="w-48 h-[108px] bg-cover rounded-t-lg bg-primary-500 shrink-0 aspect-video bg-center "
              style={{ backgroundImage: `url('${SAMPLE_PLAYLIST_IMAGE}')` }}
            ></div>
            <div className="self-start w-full px-3 mt-3 truncate">
              {"듣기 좋은 발라드 추천 좀 부탁드립니다.ddddddddd"}
            </div>
            <div className="self-start px-3 pb-2 text-sm text-gray-dark">트랙 {120}개</div>
          </div>

          <div className="pt-3 text-sm text-primary-main">
            “내 플레이리스트”에 폴더가 생성됩니다
          </div>
        </div>

        <div className="flex items-center justify-around w-full gap-4">
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
