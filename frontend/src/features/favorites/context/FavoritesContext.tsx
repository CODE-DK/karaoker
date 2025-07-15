// FavoritesContext.tsx
import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { FavoriteItem, FavoriteReq, FavoriteRes } from "../types";
import { useApi } from "../../../shared/hooks/useApi";

type FavoritesContextType = {
  favorites: FavoriteItem[];
  isFavorite: (videoId: string) => boolean;
  toggleFavorite: (item: FavoriteItem) => void;
  fetchFavorites: () => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { get, post, del } = useApi();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const fetchFavorites = useCallback(async () => {
    const res = await get<FavoriteItem[]>("/api/v1/favorites");
    if (res.ok) setFavorites(res.data);
    else console.error("Failed to load favorites:", res.error);
  }, [get]);

  const isFavorite = useCallback(
    (videoId: string) => favorites.some((f) => f.videoId === videoId),
    [favorites],
  );

  const toggleFavorite = useCallback(
    async (item: FavoriteItem) => {
      if (isFavorite(item.videoId)) {
        const res = await del(`/api/v1/favorites/${item.videoId}`);
        if (res.ok) {
          setFavorites((prev) => prev.filter((f) => f.videoId !== item.videoId));
        }
      } else {
        const reqBody: FavoriteReq = {
          videoId: item.videoId,
          title: item.title,
          channel: item.channel,
        };
        const res = await post<FavoriteRes, FavoriteReq>("/api/v1/favorites", reqBody);
        if (res.ok) {
          const newFavorite: FavoriteItem = {
            videoId: res.data.videoId,
            title: res.data.title,
            channel: res.data.channel,
            thumbnail: item.thumbnail,
          };
          setFavorites((prev) => [...prev, newFavorite]);
        }
      }
    },
    [isFavorite, post, del, favorites],
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite, fetchFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}