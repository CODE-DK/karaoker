package middleware

import (
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
)

func RequestLogger() fiber.Handler {
	return func(c *fiber.Ctx) error {
		start := time.Now()
		err := c.Next()
		duration := time.Since(start)

		rid := GetRequestID(c)

		log.Printf("[RID: %s] %s %s -> %d (%v)",
			rid,
			c.Method(),
			c.OriginalURL(),
			c.Response().StatusCode(),
			duration,
		)

		return err
	}
}
