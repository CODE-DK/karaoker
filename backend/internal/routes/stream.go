package routes

import (
	"github.com/dkom/karaoke/internal/handlers"
	"github.com/gofiber/fiber/v2"
)

func RegisterStreamRoutes(r fiber.Router) {
	s := r.Group("/stream")
	s.Get("/:videoId", handlers.StreamYouTube)
}
