declare interface IChannel {
  channelId: number;
  channelName: string;
  channelCategoryName: string;
  channelThumbnail: string;
  channelDurationTime: string;
  channelHost: string;
  channelLastParticipantCount: number;
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

declare type ChannelList = IChannel[];
