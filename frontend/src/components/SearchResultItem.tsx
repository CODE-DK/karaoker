import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";

interface Props {
  item: SearchItem;
  onSelect: (video: SearchItem) => void;
}

export interface SearchItem {
  videoId: string;
  title: string;
  channel: string;
  thumbnail: string;
}

export default function SearchResultItem({ item, onSelect }: Props) {
  return (
    <ListItem
      onClick={() => onSelect(item)}
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1,
        borderRadius: 2,
        cursor: "pointer",
        transition: "background 0.2s ease",
        "&:hover": {
          bgcolor: "action.hover",
        },
      }}
    >
      <ListItemAvatar sx={{ minWidth: 90 }}>
        <Avatar
          variant='rounded'
          src={item.thumbnail}
          alt={item.title}
          sx={{ width: 90, height: 60, borderRadius: 2 }}
        />
      </ListItemAvatar>

      <ListItemText
        primary={
          <Typography
            variant='subtitle1'
            fontWeight={500}
            noWrap
            title={item.title}
          >
            {item.title}
          </Typography>
        }
        secondary={
          <Typography
            variant='body2'
            color='text.secondary'
            noWrap
            title={item.channel}
          >
            {item.channel}
          </Typography>
        }
        sx={{ ml: 2 }}
      />
    </ListItem>
  );
}
