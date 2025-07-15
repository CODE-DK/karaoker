import { List, Paper, Typography } from "@mui/material";
import type { SearchItem } from "./SearchResultItem";
import SearchResultItem from "./SearchResultItem";

interface Props {
  results: SearchItem[];
  onSelect: (video: SearchItem) => void;
}

export default function SearchResult({ results, onSelect }: Props) {
  if (!results.length) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        mb: 4,
        p: 2,
        borderRadius: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant='h6' gutterBottom fontWeight={600}>
        Результаты поиска
      </Typography>
      <List disablePadding>
        {results.map((item) => (
          <SearchResultItem
            key={item.videoId}
            item={item}
            onSelect={onSelect}
          />
        ))}
      </List>
    </Paper>
  );
}
