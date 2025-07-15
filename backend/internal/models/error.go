package models

type ErrorRes struct {
	Message string `json:"message" example:"internal server error"`
}
