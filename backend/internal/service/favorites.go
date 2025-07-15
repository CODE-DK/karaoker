package service

import (
	"log"
	"time"

	"github.com/dkom/karaoke/internal/db"
	"github.com/dkom/karaoke/internal/models"
)

func AddFavorite(userID string, input models.FavoriteReq) (*models.Favorite, error) {
	fav := models.Favorite{
		UserID:    userID,
		VideoID:   input.VideoID,
		Title:     input.Title,
		Channel:   input.Channel,
		CreatedAt: time.Now(),
	}

	if err := db.DB.Create(&fav).Error; err != nil {
		return nil, err
	}

	go enrichFavorite(&fav)

	return &fav, nil
}

func enrichFavorite(fav *models.Favorite) {
	res, err := ParseSong(ParseReq{
		Title:   fav.Title,
		Channel: fav.Channel,
	})
	if err != nil {
		log.Printf("GPT enrichment failed for videoId=%s: %v", fav.VideoID, err)
		return
	}

	if res.Artist != "" && res.Song != "" {
		err = db.DB.Model(fav).Updates(models.Favorite{
			Artist: res.Artist,
			Song:   res.Song,
		}).Error
		if err != nil {
			log.Printf("Failed to update Favorite with enrichment: %v", err)
		}
	}
}
