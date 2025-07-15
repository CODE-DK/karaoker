import { Box, Typography, Stack } from "@mui/material";
import FavoriteToggle from "../../favorites/components/FavoriteToggle";

export interface SearchItem {
  videoId: string;
  title: string;
  channel: string;
  thumbnail: string;
}

interface Props {
  item: SearchItem;
  onSelect: (video: SearchItem) => void;
}

export default function SearchResultItem({ item, onSelect }: Props) {
  const { title, channel, thumbnail } = item;

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      onClick={() => onSelect(item)}
      sx={{
        p: 1.5,
        cursor: "pointer",
        transition: "background 0.2s ease",
        "&:hover": {
          bgcolor: "action.hover",
        },
      }}
    >
      <Box
        component="img"
        src={thumbnail}
        alt={title}
        sx={{
          width: 96,
          height: 60,
          borderRadius: 1,
          objectFit: "cover",
          flexShrink: 0,
        }}
      />

      <Box overflow="hidden" flexGrow={1}>
        <Typography
          variant="subtitle1"
          fontWeight={500}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.4,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 0.5,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {channel}
        </Typography>
      </Box>

      <FavoriteToggle item={item} />
    </Stack>
  );
}
