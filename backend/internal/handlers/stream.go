package handlers

import (
	"log"
	"os/exec"

	"github.com/dkom/karaoke/internal/models"
	"github.com/gofiber/fiber/v2"
)

// StreamYouTube godoc
// @Summary Stream video by videoId
// @Tags Stream
// @Produce octet-stream
// @Param videoId path string true "YouTube Video ID"
// @Success 200 {file} file
// @Failure 500 {object} models.ErrorRes
// @Router /stream/{videoId} [get]
func StreamYouTube(c *fiber.Ctx) error {
	videoID := c.Params("videoId")
	if videoID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorRes{
			Message: "Missing videoId",
		})
	}

	args := []string{
		"--cookies-from-browser", "chrome",
		"-f", "18",
		"-o", "-",
		"https://www.youtube.com/watch?v=" + videoID,
	}

	cmd := exec.Command("yt-dlp", args...)

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		log.Printf("[stream] yt-dlp pipe failed: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorRes{
			Message: "yt-dlp pipe error",
		})
	}
	if err := cmd.Start(); err != nil {
		log.Printf("[stream] yt-dlp start failed: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorRes{
			Message: "yt-dlp start error",
		})
	}

	c.Set("Content-Type", "video/mp4")
	c.Set("Accept-Ranges", "bytes")

	return c.SendStream(stdout)
}
