package middleware

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

const RequestIDKey = "request-id"

func RequestID() fiber.Handler {
	return func(c *fiber.Ctx) error {
		rid := uuid.New().String()

		c.Locals(RequestIDKey, rid)

		ctx := context.WithValue(c.Context(), RequestIDKey, rid)
		c.SetUserContext(ctx)

		c.Set(RequestIDKey, rid)

		return c.Next()
	}
}

func GetRequestID(c *fiber.Ctx) string {
	if rid, ok := c.Locals(RequestIDKey).(string); ok {
		return rid
	}
	return "-"
}

func ExtractRequestID(ctx context.Context) string {
	if rid, ok := ctx.Value(RequestIDKey).(string); ok {
		return rid
	}
	return "-"
}
