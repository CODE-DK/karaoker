package routes

import (
	"github.com/dkom/karaoke/internal/handlers"
	"github.com/gofiber/fiber/v2"
)

func RegisterSearchRoutes(r fiber.Router) {
	s := r.Group("/search")
	s.Get("/", handlers.SearchSong)
}
