declare interface IPlaylist {
  userPlaylistId: number;
  userPlaylistName: string;
  userPlaylistThumbnail: string;
  videoCount: number;
}

declare type MyPlaylists = IPlaylist[];
