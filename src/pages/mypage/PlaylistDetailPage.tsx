import TopBarLayout from "@/layout/TopBarLayout";
import AddItemButton from "./components/playlit-detail/AddItemButton";
import usePlaylistDetail from "@/pages/mypage/hooks/usePlaylistDetail";
import Item from "@/pages/mypage/components/playlit-detail/Item";
import { useState } from "react";

export default function PlaylistDetailPage() {
  const { myPlaylistDetailQuery, updatePlaylistOrderMutation } = usePlaylistDetail();

  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);
  const [videoList, setVideoList] = useState(myPlaylistDetailQuery.data?.videoList || []);

  const onDragStart = (id: number) => {
    setDraggedItemId(id);
  };

  const onDrop = (targetId: number) => {
    if (draggedItemId === null || draggedItemId === targetId) return;

    const draggedIndex = videoList.findIndex((item) => item.id === draggedItemId);
    const targetIndex = videoList.findIndex((item) => item.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const updatedVideoList = [...videoList];
    const [draggedItem] = updatedVideoList.splice(draggedIndex, 1);
    updatedVideoList.splice(targetIndex, 0, draggedItem);

    setVideoList(updatedVideoList); // 상태 업데이트

    // 순서를 서버에 저장
    const updatedOrder = updatedVideoList.map((item) => item.id);
    updatePlaylistOrderMutation.mutate(updatedOrder, {
      onSuccess: () => {
        console.log("순서 저장 완료!");
      },
      onError: () => {
        console.error("순서 저장 실패!");
      },
    });

    setDraggedItemId(null); // 드래그 상태 초기화
  };

  return (
    <TopBarLayout
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
