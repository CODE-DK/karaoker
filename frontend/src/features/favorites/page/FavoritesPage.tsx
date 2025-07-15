import { Box, Typography } from "@mui/material";
import { Layout } from "../../../shared/components/Layout";
import SearchResult from "../../search/components/SearchResult";
import { useStream } from "../../player/hooks/useStream";
import type { FavoriteItem } from "../types";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const { selectVideo } = useStream();

  const handleSelect = (item: FavoriteItem) => {
    selectVideo(item);
  };

  return (
    <Layout>
      <Box mt={4}>
        {favorites.length > 0 ? (
          <SearchResult results={favorites} onSelect={handleSelect} title="Избранное" />
        ) : (
          <Typography color="text.secondary">Нет избранных песен</Typography>
        )}
      </Box>
    </Layout>
  );
}
