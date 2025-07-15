import { Box } from "@mui/material";
import type { SearchItem } from "../../search/components/SearchResultItem";

interface Props {
  video: SearchItem;
  src: string;
}

export default function VideoPlayer({ src }: Props) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "transparent",
        width: "100%",
      }}
    >
      <video
        src={src}
        controls
        autoPlay
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          backgroundColor: "black",
        }}
      />
    </Box>
  );
}
