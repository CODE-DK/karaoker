import { Box, Stack, Typography } from "@mui/material";
import SearchResultItem from "./SearchResultItem";
import type { SearchItem } from "./SearchResultItem";

interface Props {
  results: SearchItem[];
  onSelect: (video: SearchItem) => void;
  title?: string;
  hideTitle?: boolean;
}

export default function SearchResult({
  results,
  onSelect,
  title = "Результаты поиска",
  hideTitle = false,
}: Props) {
  if (!results.length) return null;

  return (
    <Stack mt={2} spacing={1.5}>
      {!hideTitle && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            textTransform: "uppercase",
            letterSpacing: 1,
            fontWeight: 500,
            pl: 0.5,
          }}
        >
          {title}
        </Typography>
      )}

      {results.map((item) => (
        <Box
          key={item.videoId}
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            "&:last-of-type": { borderBottom: "none" },
          }}
        >
          <SearchResultItem item={item} onSelect={onSelect} />
        </Box>
      ))}
    </Stack>
  );
}
