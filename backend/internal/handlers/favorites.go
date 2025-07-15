package handlers

import (
	"strconv"
	"strings"

	"github.com/dkom/karaoke/internal/db"
	"github.com/dkom/karaoke/internal/models"
	"github.com/dkom/karaoke/internal/service"
	"github.com/gofiber/fiber/v2"
)

// ListFavorites godoc
// @Summary List favorites
// @Tags Favorites
// @Produce json
// @Param channel query string false "Filter by channel"
// @Param page query int false "Page number"
// @Success 200 {array} models.FavoriteRes
// @Failure 500 {object} models.ErrorRes
// @Router /favorites [get]
func ListFavorites(c *fiber.Ctx) error {
	userID := c.Locals("userID").(string)
	channel := strings.ToLower(c.Query("channel", ""))
	pageStr := c.Query("page", "1")
	page, _ := strconv.Atoi(pageStr)
	if page < 1 {
		page = 1
	}
	limit := 20
	offset := (page - 1) * limit

	var favorites []models.Favorite
	query := db.DB.
		Where("user_id = ?", userID).
		Order("created_at DESC").
		Limit(limit).
		Offset(offset)

	if channel != "" {
		query = query.Where("LOWER(channel) LIKE ?", "%"+channel+"%")
	}

	if err := query.Find(&favorites).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorRes{
			Message: "Failed to fetch favorites",
		})
	}

	return c.JSON(models.ToFavoriteResList(favorites))
}

// AddFavorite godoc
// @Summary Add a favorite
// @Tags Favorites
// @Accept json
// @Produce json
// @Param body body models.FavoriteReq true "Favorite data"
// @Success 201 {object} models.FavoriteRes
// @Failure 400 {object} models.ErrorRes
// @Failure 500 {object} models.ErrorRes
// @Router /favorites [post]
func AddFavorite(c *fiber.Ctx) error {
	userID := c.Locals("userID").(string)

	var input models.FavoriteReq
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorRes{
			Message: "Invalid input",
		})
	}

	fav, err := service.AddFavorite(userID, input)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorRes{
			Message: "DB insert failed",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(models.ToFavoriteRes(*fav))
}

// DeleteFavorite godoc
// @Summary Delete favorite by videoId
// @Tags Favorites
// @Param videoId path string true "YouTube Video ID"
// @Success 204
// @Failure 404 {object} models.ErrorRes
// @Failure 500 {object} models.ErrorRes
// @Router /favorites/{videoId} [delete]
func DeleteFavorite(c *fiber.Ctx) error {
	userID := c.Locals("userID").(string)
	videoID := c.Params("videoId")

	res := db.DB.
		Where("user_id = ? AND video_id = ?", userID, videoID).
		Delete(&models.Favorite{})

	if res.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorRes{
			Message: "DB delete failed",
		})
	}
	if res.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(models.ErrorRes{
			Message: "Favorite not found",
		})
	}

	return c.SendStatus(fiber.StatusNoContent)
}
