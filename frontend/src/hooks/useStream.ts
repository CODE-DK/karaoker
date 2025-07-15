import { useState, useCallback } from "react";
import type { SearchItem } from "../components/SearchResultItem";

export function useStream() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [currentVideo, setCurrentVideo] = useState<SearchItem | null>(null);

  const selectVideo = useCallback((video: SearchItem) => {
    console.log("Выбранное видео:", video);
    setCurrentVideo(video);
    setVideoUrl(`/api/v1/stream/${video.videoId}`);
  }, []);

  const reset = useCallback(() => {
    console.log("Сброс видеоплеера");
    setCurrentVideo(null);
    setVideoUrl(null);
  }, []);

  return {
    currentVideo,
    videoUrl,
    selectVideo,
    reset,
  };
}
