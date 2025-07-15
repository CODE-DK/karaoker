package app

import (
	_ "github.com/dkom/karaoke/docs"
	"github.com/dkom/karaoke/internal/middleware"
	"github.com/dkom/karaoke/internal/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	swagger "github.com/swaggo/fiber-swagger"
)

func CreateApp() *fiber.App {
	app := fiber.New()

	app.Use(middleware.Recover())
	app.Use(middleware.RequestID())
	app.Use(middleware.RequestLogger())
	app.Use(cors.New(cors.Config{
		AllowOrigins:  "*",
		AllowMethods:  "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders:  "Origin, Content-Type, Accept, Authorization, Range",
		ExposeHeaders: "Content-Length, Content-Range, Accept-Ranges",
	}))
	app.Get("/swagger/*", swagger.WrapHandler)

	api := app.Group("/api/v1", middleware.Auth())
	routes.RegisterSearchRoutes(api)
	routes.RegisterStreamRoutes(api)
	routes.RegisterFavoriteRoutes(api)

	return app
}
