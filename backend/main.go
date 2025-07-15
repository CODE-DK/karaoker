package main

import (
	"context"
	"log"
	"os"

	"github.com/dkom/karaoke/internal/app"
	"github.com/dkom/karaoke/internal/db"
	"github.com/dkom/karaoke/internal/firebase"
	"github.com/dkom/karaoke/internal/models"
	"github.com/joho/godotenv"

	_ "github.com/dkom/karaoke/docs"
)

// @title Karaoke API
// @version 1.0
// @description Backend for Karaoke web app.
// @host localhost:8080
// @BasePath /api/v1
func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("No .env file found, using system env")
	}

	firebase.InitFirebase(context.Background(), os.Getenv("FIREBASE_CREDENTIALS_PATH"))

	db.InitDB()
	if err := db.DB.AutoMigrate(&models.Favorite{}); err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	port := os.Getenv("PORT")

	log.Printf("Starting server on port %s", port)

	appInstance := app.CreateApp()

	if err := appInstance.Listen(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
