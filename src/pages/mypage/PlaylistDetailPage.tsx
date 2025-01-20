import TopBarLayout from "@/layout/TopBarLayout";
import AddItemButton from "./components/playlit-detail/AddItemButton";
import usePlaylistDetail from "@/pages/mypage/hooks/usePlaylistDetail";
import Item from "@/pages/mypage/components/playlit-detail/Item";
import { useState } from "react";

export default function PlaylistDetailPage() {
  const { myPlaylistDetailQuery } = usePlaylistDetail();

  // 드래그 앤 드롭 상태 관리
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);
  const [videoList, setVideoList] = useState(myPlaylistDetailQuery.data?.videoList || []);

  // 드래그 시작
  const onDragStart = (id: number) => {
    setDraggedItemId(id);
  };

  // 드롭
  const onDrop = (targetId: number) => {
    if (draggedItemId === null || draggedItemId === targetId) return;

    const draggedIndex = videoList.findIndex((item) => item.id === draggedItemId);
    const targetIndex = videoList.findIndex((item) => item.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const updatedVideoList = [...videoList];
    const [draggedItem] = updatedVideoList.splice(draggedIndex, 1);
    updatedVideoList.splice(targetIndex, 0, draggedItem);

    setVideoList(updatedVideoList);
    setDraggedItemId(null);
  };

  return (
    <TopBarLayout
      /* TODO: 페칭해온 이름으로 title 변경하기 */
      topBarProps={{
        title: myPlaylistDetailQuery.data?.userPlaylistName,
        backURL: "/mypage/playlist",
        hasAction: true,
        rightActionElement: <AddItemButton />,
      }}
    >
      <section className="flex flex-col gap-2 px-5 py-6 overflow-y-auto">
        {myPlaylistDetailQuery.isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div>loading...</div>
          </div>
        ) : (
          videoList.map((item) => (
            <Item key={item.id} item={item} onDragStart={onDragStart} onDrop={onDrop} />
          ))
        )}
      </section>
    </TopBarLayout>
  );
}
