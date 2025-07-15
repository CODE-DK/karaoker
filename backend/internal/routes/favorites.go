package routes

import (
	"github.com/dkom/karaoke/internal/handlers"
	"github.com/gofiber/fiber/v2"
)

func RegisterFavoriteRoutes(r fiber.Router) {
	f := r.Group("/favorites")
	f.Get("/", handlers.ListFavorites)
	f.Post("/", handlers.AddFavorite)
	f.Delete("/:videoId", handlers.DeleteFavorite)
}
