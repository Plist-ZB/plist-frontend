declare interface IChannel {
  channelId: number;
  channelName: string;
  channelCategoryName: string;
  channelThumbnail: string;
  channelStreamingTime: string; // timestampz 데이터
  channelStatus: string;
  channelHost: string;
  channelParticipantCount: number;
}

declare type ChannelList = IChannel[];
