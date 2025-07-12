package errors

import "errors"

var (
	ErrMissingAPIKey  = errors.New("Missing YOUTUBE_API_KEY")
	ErrYouTubeRequest = errors.New("YouTube API returned non-200 status")
)
