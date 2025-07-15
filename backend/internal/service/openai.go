package service

import (
	"encoding/json"
	"fmt"

	"github.com/dkom/karaoke/internal/clients"
)

type ParseReq struct {
	Title   string `json:"title"`
	Channel string `json:"channel"`
}

type ParseRes struct {
	Artist string `json:"artist"`
	Song   string `json:"song"`
}

func ParseSong(input ParseReq) (*ParseRes, error) {
	prompt := fmt.Sprintf(`
		Разбери заголовок YouTube-видео: "%s" от канала "%s".
		Найди исполнителя и название песни.
		Верни результат в формате JSON:

		{
  			"artist": "...",
  			"song": "..."
		}
	`, input.Title, input.Channel)

	response, err := clients.CallGPT(prompt)
	if err != nil {
		return nil, err
	}

	var parsed ParseRes
	if err := json.Unmarshal([]byte(response), &parsed); err != nil {
		return nil, fmt.Errorf("invalid JSON from GPT: %s", response)
	}

	return &parsed, nil
}
