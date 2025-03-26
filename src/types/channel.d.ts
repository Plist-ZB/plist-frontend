declare interface IChannelCommon {
  channelId: number;
  channelName: string;
  channelCategoryName: string;
  channelThumbnail: string;
  channelHostName: string;
}

declare interface IChannel extends IChannelCommon {
  channelStreamingTime: string;
  channelParticipantCount: number;
}

declare interface IPastStream extends IChannelCommon {
  channelDurationTime: string;
  channelLastParticipantCount: number;
  channelCreatedAt: string;
}

declare interface IVideo {
  id: number;
  videoId: string;
  videoName: string;
  videoThumbnail: string;
}

declare interface IPastStreamInfo extends IPastStream {
  videoList: IVideo[];
}

declare interface IChannelData {
  channelId: number;
  channelName: string;
  host: boolean;
  channelCreatedAt: string;
  videoList: IVideo[];
}

declare type ChannelList = IChannel[];
declare type PastStreamList = IPastStream[];

declare type PlayState = {
  videoId: string;
  playStates: number;
  currentTime: number;
};
