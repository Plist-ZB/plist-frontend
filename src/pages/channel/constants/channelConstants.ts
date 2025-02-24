import { YouTubeProps } from "react-youtube";

export const PlayerOptions: YouTubeProps["opts"] = {
  height: "100%",
  width: "100%",
  playerVars: {
    autoplay: 1,
    controls: 0,
    fs: 0,
    disablekb: 1,
  },
};

export const PLAYER_STATES = {
  1: "PLAYING",
  2: "PAUSED",
} as const;

export const HOST_SUBSCRIPTION_TOPICS = {
  VIDEO: (channelId: number) => `/sub/video.${channelId}`,
  ENTER: (channelId: number) => `/sub/enter.${channelId}`,
  EXIT: (channelId: number) => `/sub/exit.${channelId}`,
} as const;
