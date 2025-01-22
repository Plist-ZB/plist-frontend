import { useEffect, useMemo, useState } from "react";
import YouTube, { YouTubeProps, YouTubePlayer, YouTubeEvent } from "react-youtube";
import { Client } from "@stomp/stompjs";
import {
  initVideoIdAtom,
  currentVideoIdAtom,
  isChannelHostAtom,
  channelVideoListAtom,
  currentTimeAtom,
} from "@/store/channel";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { getEmailFromToken } from "@/pages/channel/utils/getDataFromToken";
import { FaPause, FaPlay } from "react-icons/fa";
import { formatTime } from "@/pages/channel/utils/formatTime";

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

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!playState || !currentVideoId || !player) return;

    console.log("플레이 상태 변경 감지");
    console.log(playState, currentVideoId);

    if (playState.videoId === currentVideoId) {
      player.loadVideoById(playState.videoId, playState.currentTime);
    } else {
      console.log("영상 변경");
      console.log(playState);

      player.loadVideoById(playState.videoId, playState.currentTime);
      setCurrentVideoId(playState.videoId);
    }

    if (player) {
      /* state 참고: https://developers.google.com/youtube/iframe_api_reference?hl=ko#getPlayerState */
      if (playState.playStates === 1) {
        console.log("재생");
        player.playVideo();
      } else {
        console.log("일시정지");
        player.pauseVideo();
      }
    }
  }, [playState, currentVideoId, player]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target);
    setDuration(event.target.getDuration());
  };

  const onStateChange = (event: YouTubeEvent) => {
    setIsPlaying(event.data === 1);
  };

  const [isVideoSubscribed, setIsVideoSubscribed] = useState(false);

  useEffect(() => {
    if (isVideoSubscribed && stompClient.connected && !isChannelHost) {
      console.log("입장 날림");
      stompClient.publish({
        destination: `/pub/enter.${channelId}`,
      });
    }
  }, [isVideoSubscribed, stompClient, channelId, isChannelHost]);

  useEffect(() => {
    console.log("호스트 재생 정보", playState);
  }, [playState]);

  const [isNewUserEntered, setIsNewUserEntered] = useState(false);

  useEffect(() => {
    if (isNewUserEntered && player) {
      console.log("새로운 유저 입장 감지 데이터");
      console.log(currentVideoId, isPlaying, currentTime);

      stompClient.publish({
        destination: `/pub/video.control.${channelId}`,
        body: JSON.stringify({
          email: email,
          videoId: currentVideoId,
          currentTime: player.getCurrentTime(),
          playState: isPlaying ? 1 : 2,
        }),
      });
      setIsNewUserEntered(false);
    }
  }, [isNewUserEntered, player]);

  useEffect(() => {
    if (!stompClient || !channelId) return;

    // 영상 재생상태 & 재생목록 리스트 구독
    const subscribeToVideoState = () => {
      if (stompClient.connected && player && !isChannelHost) {
        console.log("구독됨1");
        setIsVideoSubscribed(true);
        stompClient.subscribe(`/sub/video.${channelId}`, (message) => {
          const body = JSON.parse(message.body); // 수신된 메시지 파싱
          console.log("비디오 받음");
          console.log(body);

          if (!isChannelHost && body.videoId) {
            setPlayState(body);
          }

          if (!body.videoId) {
            setChannelVideoList(body);
          }
        });
      }
    };

    const subscribeToJoin = () => {
      if (stompClient.connected && player && isChannelHost) {
        stompClient.subscribe(`/sub/enter.${channelId}`, (message) => {
          if (message.body === "NEW_USER_ENTER") {
            console.log("유저 입장해서 정보 날림");
            console.log(isPlaying, currentTime, currentVideoId, player.getDuration());
            console.log("=========");
            setIsNewUserEntered(true);
          }
        });
      }
    };

    const subscribeToLeave = () => {
      if (stompClient.connected && player && !isChannelHost) {
        stompClient.subscribe(`/sub/exit.${channelId}`, (message) => {
          const body = message.body;
          if (body === "CHANNEL_CLOSED") {
            alert("채널이 종료되었습니다.");
            location.href = "/";
          }
        });
      }
    };

    // stompClient가 연결되었을 때 구독 설정
    stompClient.onConnect = () => {
      subscribeToVideoState();
      subscribeToJoin();
      subscribeToLeave();
    };

    return () => {
      if (stompClient.connected) {
        subscribeToVideoState();
        subscribeToJoin();
        subscribeToLeave();
      }
    };
  }, [stompClient, channelId, stompClient.connected, player, isChannelHost]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (player && isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(player.getCurrentTime());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [player, isPlaying]);

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1, //isChannelHost ? 0 : 1,
      modestbranding: 0,
      controls: 0,
      fs: 0, // 전체화면 버튼 활성화
      disablekb: 1,
      enablejsapi: 1,
    },
  };

  return (
    <div className="relative w-full aspect-video">
      {/* Host를 제외하고 화면 클릭 못하게 막는 임시 레이어 */}
      {!isChannelHost && <div className="absolute z-10 w-full bg-transparent aspect-video"></div>}

      {isChannelHost && (
        <div className="absolute z-10 w-full h-[calc(100%-34px)] bg-transparent aspect-video"></div>
      )}

      <YouTube
        videoId={initVideoId}
        opts={opts}
        onReady={onPlayerReady}
        onStateChange={onStateChange}
        className="absolute top-0 left-0 w-full h-full"
        iframeClassName="w-full h-full"
      />
      {isChannelHost && (
        <HostPlayBar
          isPlaying={isPlaying}
          stompClient={stompClient}
          channelId={channelId!}
          email={email}
          currentVideoId={currentVideoId!}
          currentTime={currentTime}
          player={player}
          duration={duration}
          setCurrentTime={setCurrentTime}
        />
      )}

      {!isChannelHost && (
        <ParticipantPlayBar isPlaying={isPlaying} currentTime={currentTime} duration={duration} />
      )}
    </div>
  );
}

const HostPlayBar = ({
  isPlaying,
  stompClient,
  channelId,
  email,
  currentVideoId,
  currentTime,
  player,
  duration,
  setCurrentTime,
}: {
  isPlaying: boolean;
  stompClient: Client;
  channelId: number;
  email: string;
  currentVideoId: string;
  currentTime: number;
  player: YouTubePlayer;
  duration: number;
  setCurrentTime: (time: number) => void;
}) => {
  return (
    <div className="absolute bottom-0 left-0 w-full p-2 py-1 bg-black-bright ">
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            if (isPlaying) {
              player?.pauseVideo();
              stompClient.publish({
                destination: `/pub/video.control.${channelId}`,
                body: JSON.stringify({
                  email: email,
                  videoId: currentVideoId,
                  currentTime: currentTime,
                  playState: 2,
                }),
              });
            } else {
              player?.playVideo();
              stompClient.publish({
                destination: `/pub/video.control.${channelId}`,
                body: JSON.stringify({
                  email: email,
                  videoId: currentVideoId,
                  currentTime: currentTime,
                  playState: 1,
                }),
              });
            }
          }}
          className="p-0 py-1 text-white"
        >
          {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
        </button>

        <div
          role="button"
          className="relative flex-1 h-1 bg-white rounded cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = x / rect.width;
            const newTime = percent * duration;
            player?.seekTo(newTime, true);
            setCurrentTime(newTime);
            stompClient.publish({
              destination: `/pub/video.control.${channelId}`,
              body: JSON.stringify({
                email: email,
                videoId: currentVideoId,
                currentTime: newTime,
                playState: isPlaying ? 1 : 2,
              }),
            });
          }}
        >
          <div
            className="absolute h-full rounded bg-red-main"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        <span className="text-sm text-white">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

const ParticipantPlayBar = ({
  isPlaying,
  currentTime,
  duration,
}: {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}) => {
  return (
    <div className="absolute bottom-0 left-0 w-full p-2 py-1 bg-black-bright ">
      <div className="flex items-center gap-2 px-1">
        <div onClick={() => {}} className="p-0 py-1 text-white">
          {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
        </div>

        <div className="relative flex-1 h-1 bg-white rounded">
          <div
            className="absolute h-full rounded bg-red-main"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        <span className="text-sm text-white">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};
