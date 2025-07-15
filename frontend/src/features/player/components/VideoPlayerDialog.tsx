import { Dialog, DialogContent, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VideoPlayer from "./VideoPlayer";
import type { SearchItem } from "../../search/components/SearchResultItem";

interface Props {
  open: boolean;
  video: SearchItem | null;
  src: string | null;
  onClose: () => void;
}

export default function VideoPlayerDialog({ open, video, src, onClose }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            bgcolor: "transparent",
            boxShadow: "none",
            overflow: "visible",
            position: "relative",
          },
        },
        backdrop: {
          sx: {
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -24,
          right: -24,
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={onClose}
          disableRipple
          sx={{
            color: "rgba(255, 255, 255, 0.6)",
            transition: "color 0.2s",
            "&:hover": {
              color: "#fff",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {video && src && (
        <DialogContent
          sx={{
            p: 0,
            overflow: "hidden",
            bgcolor: "transparent",
          }}
        >
          <VideoPlayer video={video} src={src} />
        </DialogContent>
      )}
    </Dialog>
  );
}
