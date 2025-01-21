import { useEffect, useMemo, useState } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";
import { Client } from "@stomp/stompjs";
import {
  initVideoIdAtom,
  currentVideoIdAtom,
  isChannelHostAtom,
  channelVideoListAtom,
} from "@/store/channel";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { getEmailFromToken } from "@/pages/channel/utils/getDataFromToken";

export default function VideoPlayer({
  stompClient,
  channelId,
}: {
  readonly stompClient: Client;
  readonly channelId: number | undefined;
}) {
  /* TODO: Youtube Player로 사용할 메서드 타입 정의하기 */
  const email = useMemo(() => getEmailFromToken(), []);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const initVideoId = useAtomValue(initVideoIdAtom);
  const [currentVideoId, setCurrentVideoId] = useAtom(currentVideoIdAtom);
  const isChannelHost = useAtomValue(isChannelHostAtom);
  const setChannelVideoList = useSetAtom(channelVideoListAtom);

  const [playState, setPlayState] = useState<{
    videoId: string;
    playStates: number;
    currentTime: number;
  } | null>(null);

  useEffect(() => {
    if (!playState || !currentVideoId) return;

    if (playState.videoId === currentVideoId) {
      player.seekTo(playState.currentTime);

      /* state 참고: https://developers.google.com/youtube/iframe_api_reference?hl=ko#getPlayerState */
      if (playState.playStates === 1) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    } else {
      player.loadVideoById(playState.videoId, playState.currentTime);
      setCurrentVideoId(playState.videoId);
    }
  }, [playState]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target);
    //console.log("플레이어가 준비되었습니다.", event.target, typeof event.target);
  };

  const onStateChange = (event: any) => {
    console.log(event);

    /* console.log("플레이어 상태 변경", event.target.getPlayerState());
    console.log("플레이어 상태 변경2", player.getPlaylist());

    stompClient.publish({
      destination: `/pub/video.control.${channelId}`,
      body: JSON.stringify({
        email: email,
        videoId: currentVideoId,
        currentTime: 0,
        playState: event.target.getPlayerState(),
      }),
    }); */
  };

  useEffect(() => {
    if (!stompClient || !channelId) return;

    // 영상 재생상태 & 재생목록 리스트 구독
    const subscribeToVideoState = () => {
      stompClient.subscribe(`/sub/video.${channelId}`, (message) => {
        const body = JSON.parse(message.body); // 수신된 메시지 파싱

        if (!isChannelHost && body.videoId) {
          setPlayState(body);
        }

        if (!body.videoId) {
          console.log("body", body);
          setChannelVideoList(body);
        }
      });
    };

    // stompClient가 연결되었을 때 구독 설정
    stompClient.onConnect = () => {
      subscribeToVideoState();
    };

    return () => {
      if (stompClient.connected) {
        subscribeToVideoState();
      }
    };
  }, [stompClient, channelId, stompClient.connected, player]);

  useEffect(() => {
    if (!player || !initVideoId) return;

    console.log("initVideoId", initVideoId);

    const state = player.getPlayerState();
    const currentTime = player.getCurrentTime();

    stompClient.publish({
      destination: `/pub/video.control.${channelId}`,
      body: JSON.stringify({
        email: email,
        videoId: currentVideoId,
        currentTime: currentTime,
        playState: state,
      }),
    });
  }, [initVideoId, player]);

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      modestbranding: 0,
      controls: 1, //isChannelHost ? 1 : 0,
      fs: 1, // 전체화면 버튼 활성화
      disablekb: 1,
      enablejsapi: 1,
    },
  };

  return (
    <div className="relative w-full aspect-video">
      {/* Host를 제외하고 화면 클릭 못하게 막는 임시 레이어 */}
      {/* {!isChannelHost && <div className="absolute z-10 w-full bg-transparent aspect-video"></div>} */}

      <YouTube
        videoId={initVideoId}
        opts={opts}
        onReady={onPlayerReady}
        /* onStateChange={onStateChange} */
        className="absolute top-0 left-0 w-full h-full"
        iframeClassName="w-full h-full"
      />

      <button
        className="fixed bg-red-300 bottom-20"
        onClick={() => {
          const state = player.getPlayerState();
          const currentTime = player.getCurrentTime();

          stompClient.publish({
            destination: `/pub/video.control.${channelId}`,
            body: JSON.stringify({
              email: email,
              videoId: currentVideoId,
              currentTime: currentTime,
              playState: state,
            }),
          });
        }}
      >
        영상 재생 상태 테스트
      </button>
      <button
        className="fixed bg-red-300 bottom-20 right-20"
        onClick={() => {
          const state = player.getPlayerState();
          console.log(state);
          console.log(player.getVideoData());

          player.pauseVideo();
        }}
      >
        영상 교체 테스트
      </button>
    </div>
  );
}
