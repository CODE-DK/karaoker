import { IconButton, Tooltip } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import type { FavoriteItem } from "../types";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoriteToggle({ item }: { item: FavoriteItem }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(item);
  };

  return (
    <Tooltip title={isFavorite(item.videoId) ? "Убрать из избранного" : "В избранное"}>
      <IconButton onClick={handleClick} size="small">
        {isFavorite(item.videoId) ? <Star color="warning" /> : <StarBorder />}
      </IconButton>
    </Tooltip>
  );
}
