import { Client } from "@stomp/stompjs";
import { YouTubePlayer } from "react-youtube";
import { formatTime } from "@/pages/channel/utils/formatTime";
import { FaPause, FaPlay } from "react-icons/fa";

interface HostPlayBarProps {
  readonly isPlaying: boolean;
  readonly stompClient: Client;
  readonly channelId: number;
  readonly email: string;
  readonly currentVideoId: string;
  readonly currentTime: number;
  readonly player: YouTubePlayer;
  readonly duration: number;
  readonly setCurrentTime: (time: number) => void;
}

export default function HostPlayBar({
  isPlaying,
  stompClient,
  channelId,
  email,
  currentVideoId,
  currentTime,
  player,
  duration,
  setCurrentTime,
}: HostPlayBarProps) {
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
}
