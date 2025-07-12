package middleware

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

func Recover() fiber.Handler {
	return func(c *fiber.Ctx) (err error) {
		defer func() {
			if r := recover(); r != nil {
				rid := GetRequestID(c)
				log.Printf("[PANIC][RID: %s] %v", rid, r)
				c.Status(fiber.StatusInternalServerError).SendString("Internal Server Error")
			}
		}()
		return c.Next()
	}
}
