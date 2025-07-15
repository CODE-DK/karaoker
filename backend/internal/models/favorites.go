package models

import "time"

type Favorite struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    string    `gorm:"index" json:"userId"`
	VideoID   string    `gorm:"index" json:"videoId"`
	Title     string    `json:"title"`
	Channel   string    `json:"channel"`
	CreatedAt time.Time `json:"createdAt"`
	Artist    string    `gorm:"index" json:"artist"`
	Song      string    `json:"song"`
}

type FavoriteReq struct {
	VideoID string `json:"videoId"`
	Title   string `json:"title"`
	Channel string `json:"channel"`
}

type FavoriteRes struct {
	UserID    string    `json:"userId"`
	VideoID   string    `json:"videoId"`
	Title     string    `json:"title"`
	Channel   string    `json:"channel"`
	CreatedAt time.Time `json:"createdAt"`
}

func ToFavoriteRes(f Favorite) FavoriteRes {
	return FavoriteRes{
		UserID:    f.UserID,
		VideoID:   f.VideoID,
		Title:     f.Title,
		Channel:   f.Channel,
		CreatedAt: f.CreatedAt,
	}
}

func ToFavoriteResList(fList []Favorite) []FavoriteRes {
	var res []FavoriteRes
	for _, f := range fList {
		res = append(res, ToFavoriteRes(f))
	}
	return res
}
