import { useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

export default function VideoPlayer({ videoId }: { videoId: string }) {
  /* TODO: Youtube Player로 사용할 메서드 타입 정의하기 */
  const [player, setPlayer] = useState<any>(null);

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      modestbranding: 0,
      controls: 1,
      fs: 1, // 전체화면 버튼 활성화
    },
  };

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target);
    console.log("플레이어가 준비되었습니다.", event.target, typeof event.target);
  };

  const onCLickPlay = () => {
    const playerState = player.getPlayerState();
    /* state 참고: https://developers.google.com/youtube/iframe_api_reference?hl=ko#getPlayerState */
    if (playerState !== 1) player.playVideo();
    else player.pauseVideo();
  };

  return (
    <div className="relative w-full aspect-video">
      {/* Host를 제외하고 화면 클릭 못하게 막는 임시 레이어 */}
      {/* <div className="absolute z-10 w-full bg-transparent aspect-video"></div> */}

      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onPlayerReady}
        className="absolute top-0 left-0 w-full h-full"
        iframeClassName="w-full h-full"
      />
    </div>
  );
}
