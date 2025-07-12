import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { SearchItem } from "./SearchResultItem";

interface Props {
  video: SearchItem | null;
  src: string | null;
}

const VideoPlayer: React.FC<Props> = ({ video, src }) => {
  if (!video || !src) return null;

  console.log("Рендер VideoPlayer с:", { video, src });

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant='h6' gutterBottom>
        ▶️ Проигрывается:
      </Typography>
      <Typography variant='subtitle1' fontWeight={600} gutterBottom>
        {video.title}
      </Typography>
      <Box mt={2}>
        <video
          src={src}
          controls
          autoPlay
          style={{
            width: "100%",
            maxHeight: 420,
            borderRadius: 12,
            background: "#000",
          }}
        />
      </Box>
    </Paper>
  );
};

export default VideoPlayer;
