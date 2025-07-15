package clients

import (
	"context"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"time"

	"github.com/dkom/karaoke/internal/errors"
	"github.com/dkom/karaoke/internal/middleware"
	"github.com/dkom/karaoke/internal/models"
)

const (
	maxResults     = "20"
	searhcType     = "video"
	searhcPrefix   = "karaoke"
	part           = "snippet"
	youtubeBaseUrl = "https://www.googleapis.com/youtube/v3/search"
)

func FetchYouTubeSearch(ctx context.Context, query string) ([]models.KaraokeRes, error) {
	rid := middleware.ExtractRequestID(ctx)

	apiKey := os.Getenv("YOUTUBE_API_KEY")
	if apiKey == "" {
		log.Printf("[YouTube][RID: %s] ERROR: YOUTUBE_API_KEY is not set", rid)
		return nil, errors.ErrMissingAPIKey
	}

	fullUrl, err := buildYouTubeSearchUrl(apiKey, query)
	if err != nil {
		log.Printf("[YouTube][RID: %s] ERROR: Failed to build YouTube search URL: %v", rid, err)
		return nil, err
	}

	log.Printf("[YouTube][RID: %s] INFO: Requesting: %s", rid, query)

	start := time.Now()
	resp, err := http.Get(fullUrl)
	if err != nil {
		log.Printf("[YouTube] [RID: %s] Request failed: %v", rid, err)
		return nil, err
	}
	defer resp.Body.Close()

	log.Printf("[YouTube] [RID: %s] Response time: %v", rid, time.Since(start))

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		log.Printf("[YouTube] [RID: %s] Non-200 status: %d, body: %s", rid, resp.StatusCode, body)
		return nil, errors.ErrYouTubeRequest
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Printf("[YouTube] [RID: %s] Read error: %v", rid, err)
		return nil, err
	}

	var ytResp models.YouTubeSearchRes
	if err := json.Unmarshal(body, &ytResp); err != nil {
		log.Printf("[YouTube] [RID: %s] JSON parse error: %v", rid, err)
		return nil, err
	}

	results := make([]models.KaraokeRes, 0, len(ytResp.Items))
	for _, item := range ytResp.Items {
		results = append(results, models.KaraokeRes{
			Title:     item.Snippet.Title,
			VideoID:   item.ID.VideoID,
			Thumbnail: item.Snippet.Thumbnails.Medium.URL,
			Channel:   item.Snippet.ChannelTitle,
		})
	}

	log.Printf("[YouTube] [RID: %s] Found %d results", rid, len(results))
	return results, nil
}

func buildYouTubeSearchUrl(apiKey, query string) (string, error) {
	u, err := url.Parse(youtubeBaseUrl)
	if err != nil {
		return "", err
	}

	params := url.Values{}
	params.Set("part", part)
	params.Set("type", searhcType)
	params.Set("maxResults", maxResults)
	params.Set("q", searhcPrefix+" "+query)
	params.Set("key", apiKey)

	u.RawQuery = params.Encode()
	return u.String(), nil
}
