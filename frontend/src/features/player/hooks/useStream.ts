import { useState, useCallback } from "react";
import type { SearchItem } from "../../search/components/SearchResultItem";
import { useApi } from "../../../shared/hooks/useApi";

export function useStream() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [currentVideo, setCurrentVideo] = useState<SearchItem | null>(null);
  const { get } = useApi();

  const selectVideo = useCallback(
    async (video: SearchItem) => {
      setCurrentVideo(video);

      const res = await get<string>(`/api/v1/stream/${video.videoId}`);
      if (res.ok) {
        setVideoUrl(res.data); // строка с прямым URL
      } else {
        console.error("Ошибка получения потока:", res.error);
        setVideoUrl(null);
      }
    },
    [get],
  );

  const reset = useCallback(() => {
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
