import TopBar, { TopBarProps } from "@/layout/TopBar"; // 수정: TopBarProps를 타입으로 가져오기

interface TopBarLayoutProps {
  topBarProps: TopBarProps;
  children: React.ReactNode;
}

export default function TopBarLayout({ topBarProps, children }: TopBarLayoutProps) {
  return (
    <div className="flex flex-col w-full h-full">
      <TopBar
        title={topBarProps.title}
        backURL={topBarProps.backURL}
        hasAction={topBarProps.hasAction}
        rightActionElement={topBarProps.rightActionElement}
      />
      {children}
    </div>
  );
}
