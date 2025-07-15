package clients

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/dkom/karaoke/internal/models"
)

func CallGPT(prompt string) (string, error) {
	body := models.ChatReq{
		Model: "gpt-3.5-turbo", // gpt-4 или gpt-3.5-turbo
		Messages: []models.ChatMessage{
			{Role: "user", Content: prompt},
		},
	}

	data, _ := json.Marshal(body)

	req, err := http.NewRequest("POST", "https://api.openai.com/v1/chat/completions", bytes.NewBuffer(data))
	if err != nil {
		return "", err
	}

	req.Header.Set("Authorization", "Bearer "+os.Getenv("OPENAI_API_KEY"))
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	var result models.ChatRes
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return "", err
	}

	if len(result.Choices) == 0 {
		return "", fmt.Errorf("empty choices from OpenAI")
	}

	return result.Choices[0].Message.Content, nil
}
