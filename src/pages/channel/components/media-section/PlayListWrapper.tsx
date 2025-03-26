import { useRef, useState, useEffect } from "react";

interface PlayListWrapperProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export default function PlayListWrapper({ children, className = "" }: PlayListWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  useEffect(() => {
    const calculateMaxHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const calculatedMaxHeight = window.innerHeight - rect.top - 100;
        setMaxHeight(calculatedMaxHeight);
      }
    };

    // 컴포넌트가 마운트될 때와 윈도우 크기가 변경될 때 계산
    calculateMaxHeight();
    window.addEventListener("resize", calculateMaxHeight);

    // 클린업 함수에서 이벤트 리스너 제거
    return () => window.removeEventListener("resize", calculateMaxHeight);
  }, []);

  return (
    <div
      ref={ref}
      className={`overflow-y-scroll flex flex-col gap-2 px-2 py-4 pt-0 absolute w-full z-10 transition-all duration-300 ease-in-out origin-top transform 
       bg-white border-b shadow-lg top-full animate-dropdown rounded-b-lg ${className}`}
      style={{ maxHeight: maxHeight !== null ? `${maxHeight}px` : "calc(100vh*0.5-60px)" }}
    >
      {children}
    </div>
  );
}
