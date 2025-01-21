import TopBarLayout from "@/layout/TopBarLayout";
import usePastStreamDetail from "@/pages/mypage/hooks/usePastStreamDetail";
import { Calendar, Clock, CirclePlus, PersonStanding } from "lucide-react";
import { useParams } from "react-router-dom";

export default function HostHistoryDetailPage() {
  const { channelId } = useParams();
  const { getPastStreamInfoQuery, addVideoToFavoriteMutation } = usePastStreamDetail(
    Number(channelId)
  );

  const { data: pastStreamInfo } = getPastStreamInfoQuery as { data: IPastStreamInfo };

  const Item = ({ item }: { item: IVideo }) => {
    const onClick = (item: IVideo) => async () => {
      await addVideoToFavoriteMutation.mutateAsync({
        videoId: item.videoId,
        videoThumbnail: item.videoThumbnail,
        videoName: item.videoName,
      });
    };

    return (
      <div className="flex items-center gap-2 p-2 px-3 border rounded-lg">
        <div
          className="w-10 bg-gray-200 bg-center bg-cover rounded-lg shrink-0 aspect-square"
          style={{ backgroundImage: `url('${item.videoThumbnail}')` }}
        ></div>
        <div className="flex-grow truncate">{item.videoName}</div>
        {/* TODO: onCLick 추가 */}
        <button
          onClick={onClick(item)}
          className="p-0 hover:border-transparent hover:text-red-main"
        >
          <CirclePlus className="text-gray-dark" />
        </button>
      </div>
    );
  };

  return (
    <TopBarLayout
      topBarProps={{
        title: "호스트 이력",
        backURL: "/mypage/host-history",
      }}
    >
      <section className="flex flex-col">
        {/* 방 정보 */}
        <article className="flex flex-col items-center gap-4 p-4 border-b border-gray-border">
          <div
            className="flex w-full bg-gray-200 bg-center bg-cover rounded-lg max-w-36 aspect-square"
            style={{ backgroundImage: `url('${pastStreamInfo?.channelThumbnail}')` }}
          ></div>

          <div className="flex flex-col w-full gap-1">
            <div className="text-lg font-medium text-center truncate">
              {pastStreamInfo?.channelName}
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                {/* TODO: date 값 달라고 요청함 -> 추후에 수정 예정 */}
                <Calendar size={16} /> {pastStreamInfo?.channelCreatedAt?.split("T")[0]}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <PersonStanding size={18} /> {pastStreamInfo?.channelLastParticipantCount}명
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 truncate">
                  <Clock size={16} /> {pastStreamInfo?.channelDurationTime}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* 당시 재생목록 */}
        <article className="flex flex-col gap-4 p-4">
          {pastStreamInfo?.videoList.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </article>
      </section>
    </TopBarLayout>
  );
}
