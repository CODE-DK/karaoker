import React from "react";
import {
  Typography,
  Box,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";
import VideoPlayer from "./components/VideoPlayer";
import { useSearch } from "./hooks/useSearch";
import { useStream } from "./hooks/useStream";
import { Layout } from "./components/Layout";

const App: React.FC = () => {
  const { results, loading, error, search } = useSearch();
  const { currentVideo, videoUrl, selectVideo, reset } = useStream();

  const handleSearch = (q: string) => {
    reset();
    search(q);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Layout>
      <Container maxWidth='md'>
        <Paper
          elevation={3}
          sx={{
            p: isMobile ? 2 : 4,
            mt: 6,
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Typography variant='h4' fontWeight={600} mb={3}>
            🎤 Karaoke Search
          </Typography>

          <Box mb={3}>
            <SearchBar onSearch={handleSearch} loading={loading} />
          </Box>

          {error && (
            <Typography color='error' mb={2}>
              {error}
            </Typography>
          )}

          <SearchResult results={results} onSelect={selectVideo} />
          <VideoPlayer video={currentVideo} src={videoUrl} />
        </Paper>
      </Container>
    </Layout>
  );
};

export default App;
