declare interface IPlaylist {
  userPlaylistId: number;
  userPlaylistName: string;
  userPlaylistThumbnail: string;
  videoCount: number;
}

declare interface MyPlaylists {
  content: IPlaylist[];
  hasNext: boolean;
}
