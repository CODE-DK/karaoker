package firebase

import (
	"context"
	"log"

	firebase "firebase.google.com/go/v4"
	"google.golang.org/api/option"
)

var app *firebase.App

func InitFirebase(ctx context.Context, creadentialsPath string) {
	opt := option.WithCredentialsFile(creadentialsPath)

	var err error
	app, err = firebase.NewApp(ctx, nil, opt)
	if err != nil {
		log.Fatalf("Failed to initialize Firebase: %v", err)
	}
}

func GetApp() *firebase.App {
	if app == nil {
		log.Fatal("Firebase app is not initialized. Call InitFirebase first.")
	}
	return app
}
