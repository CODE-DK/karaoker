package models

type KaraokeResult struct {
	Title     string `json:"title"`
	VideoID   string `json:"videoId"`
	Thumbnail string `json:"thumbnail"`
	Channel   string `json:"channel"`
}
