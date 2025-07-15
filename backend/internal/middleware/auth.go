package middleware

import (
	"context"
	"log"
	"strings"

	"github.com/dkom/karaoke/internal/firebase"
	"github.com/gofiber/fiber/v2"
)

func Auth() fiber.Handler {
	return func(c *fiber.Ctx) error {
		authHeader := c.Get("Authorization")
		if !strings.HasPrefix(authHeader, "Bearer ") {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Missing or invalid Authorization header",
			})
		}

		idToken := strings.TrimPrefix(authHeader, "Bearer ")

		client, err := firebase.GetApp().Auth(context.Background())
		if err != nil {
			log.Printf("[Firebase] Failed to get auth client: %v", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Auth initialization failed",
			})
		}

		token, err := client.VerifyIDToken(context.Background(), idToken)
		if err != nil {
			log.Printf("[Firebase] Invalid ID token: %v", err)
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Invalid or expired token",
			})
		}

		c.Locals("user", token)
		c.Locals("userID", token.UID)

		return c.Next()
	}
}
