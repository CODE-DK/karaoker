package app

import (
	"github.com/dkom/karaoke/internal/middleware"
	"github.com/dkom/karaoke/internal/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
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

	api := app.Group("/api/v1")
	routes.RegisterSearchRoutes(api)
	routes.RegisterStreamRoutes(api)

	return app
}
