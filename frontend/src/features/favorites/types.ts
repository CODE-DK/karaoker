export interface FavoriteItem {
  videoId: string;
  title: string;
  channel: string;
  thumbnail: string;
}

export interface FavoriteReq extends Record<string, unknown> {
  videoId: string;
  title: string;
  channel: string;
}

export interface FavoriteRes {
  videoId: string;
  title: string;
  channel: string;
  artist?: string;
  song?: string;
  createdAt: string;
}
