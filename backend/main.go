package main

import (
	"context"
	"log"
	"os"

	"github.com/dkom/karaoke/internal/app"
	"github.com/dkom/karaoke/internal/firebase"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("No .env file found, using system env")
	}

	firebase.InitFirebase(context.Background(), os.Getenv("FIREBASE_CREDENTIALS_PATH"))

	port := os.Getenv("PORT")

	log.Printf("Starting server on port %s", port)

	appInstance := app.CreateApp()

	if err := appInstance.Listen(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
