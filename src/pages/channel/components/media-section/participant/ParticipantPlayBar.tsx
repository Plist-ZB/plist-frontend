import { FaPause, FaPlay } from "react-icons/fa";
import { formatTime } from "@/pages/channel/utils/formatTime";
import { currentTimeAtom } from "@/store/channel";
import { useAtom } from "jotai";
import { YouTubePlayer } from "react-youtube";
import { useEffect } from "react";

interface ParticipantPlayBarProps {
  readonly isPlaying: boolean;
  readonly duration: number;
  readonly player: YouTubePlayer;
}

export default function ParticipantPlayBar({
  isPlaying,
  duration,
  player,
}: ParticipantPlayBarProps) {
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (player && isPlaying && setCurrentTime) {
      interval = setInterval(() => {
        setCurrentTime(player.getCurrentTime());
      }, 500);
    }
    return () => clearInterval(interval);
  }, [player, isPlaying, setCurrentTime]);

  return (
    <div className="absolute bottom-0 left-0 w-full p-2 py-1 bg-black-bright ">
      <div className="flex items-center gap-2 px-1">
        <div className="p-0 py-1 text-white">
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
}
