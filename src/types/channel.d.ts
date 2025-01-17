declare interface IChannel {
  channelId: number;
  channelName: string;
  channelCategoryName: string;
  channelThumbnail: string;
  channelDurationTime: string;
  channelHost: string;
  channelLastParticipantCount: number;
}

declare type ChannelList = IChannel[];
