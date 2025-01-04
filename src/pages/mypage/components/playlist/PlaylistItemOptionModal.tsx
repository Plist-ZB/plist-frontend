import { useRef } from "react";

interface PlaylistItemOptionModalProps {
  readonly isOpen: boolean;
  readonly playListId: number;
}

export default function PlaylistItemOptionModal({
  isOpen,
  playListId,
}: PlaylistItemOptionModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const options = [
    { optionId: 1, name: "수정하기", onClick: () => console.log(`${playListId} 수정하기`) },
    { optionId: 2, name: "삭제하기", onClick: () => console.log(`${playListId} 삭제하기`) },
  ];

  const OptionItem = ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => {
    return (
      <button
        onClick={() => {
          console.log("로직");
          onClick();
        }}
        className="p-2 cursor-pointer hover:bg-gray-100 hover:border-transparent"
      >
        {children}
      </button>
    );
  };

  return (
    <>
      {isOpen && (
        <div
          ref={modalRef}
          className="absolute flex flex-col bg-white border border-gray-200 rounded-md shadow-lg right-2 top-10"
        >
          {options.map((option) => (
            <OptionItem key={option.optionId} onClick={option.onClick}>
              {option.name}
            </OptionItem>
          ))}
        </div>
      )}
    </>
  );
}
