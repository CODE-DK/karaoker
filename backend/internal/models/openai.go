package models

type ChatMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type ChatReq struct {
	Model    string        `json:"model"`
	Messages []ChatMessage `json:"messages"`
}

type Choice struct {
	Message ChatMessage `json:"message"`
}

type ChatRes struct {
	Choices []Choice `json:"choices"`
}
