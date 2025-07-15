package models

type YouTubeSearchRes struct {
	Items []YouTubeSearchItem `json:"items"`
}

type YouTubeSearchItem struct {
	ID      YouTubeVideoID `json:"id"`
	Snippet Snippet        `json:"snippet"`
}

type YouTubeVideoID struct {
	VideoID string `json:"videoId"`
}

type Snippet struct {
	Title        string     `json:"title"`
	ChannelTitle string     `json:"channelTitle"`
	Thumbnails   Thumbnails `json:"thumbnails"`
}

type Thumbnails struct {
	Medium Thumbnail `json:"medium"`
}

type Thumbnail struct {
	URL string `json:"url"`
}
