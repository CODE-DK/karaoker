package handlers

import (
	"log"
	"sync"
	"time"

	"github.com/dkom/karaoke/internal/clients"
	"github.com/dkom/karaoke/internal/models"
	"github.com/gofiber/fiber/v2"
)

type cacheItem struct {
	results    []models.KaraokeResult
	expiration time.Time
}

var (
	cache     = make(map[string]cacheItem)
	cacheLock sync.RWMutex
	cacheTTL  = 5 * time.Minute
)

func SearchSong(c *fiber.Ctx) error {
	query := c.Query("q")
	if query == "" {
		log.Println("[SearchSong] ❌ Missing 'q' query param")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Query parameter 'q' is required",
		})
	}

	log.Printf("[SearchSong] 🔍 Запрос: %q", query)

	cacheLock.RLock()
	item, found := cache[query]
	cacheLock.RUnlock()

	if found && time.Now().Before(item.expiration) {
		log.Printf("[SearchSong] 💾 Найдено в кэше: %d результатов", len(item.results))
		return c.JSON(item.results)
	}

	log.Printf("[SearchSong] ⏳ Запрашиваем с YouTube API")

	results, err := clients.FetchYouTubeSearchResults(c.UserContext(), query)
	if err != nil {
		log.Printf("[SearchSong] ❌ Ошибка YouTube API: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	cacheLock.Lock()
	cache[query] = cacheItem{
		results:    results,
		expiration: time.Now().Add(cacheTTL),
	}
	cacheLock.Unlock()

	log.Printf("[SearchSong] ✅ Успех: %d результатов", len(results))
	return c.JSON(results)
}
