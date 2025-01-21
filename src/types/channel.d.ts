declare interface IChannel {
  channelId: number;
  channelName: string;
  channelCategoryName: string;
  channelThumbnail: string;
  channelDurationTime: string;
  channelStatus: string;
  channelHost: string;
  channelLastParticipantCount: number;
  channelCreatedAt: string;
}

declare interface IVideo {
  id: number;
  videoId: string;
  videoName: string;
  videoThumbnail: string;
}

declare interface IPastStreamInfo extends IChannel {
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
