import { Layout } from "../components/Layout";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { useStream } from "../hooks/useStream";
import SearchResult from "../components/SearchResult";
import VideoPlayer from "../components/VideoPlayer";
import Loader from "../components/Loader";
import type { SearchItem } from "../components/SearchResultItem";

export default function Home() {
  const [query, setQuery] = useState("");
  const { search, results, loading, error } = useSearch();

  const {
    currentVideo,
    videoUrl,
    selectVideo,
    reset: resetVideo,
  } = useStream();

  const handleSearch = async () => {
    resetVideo();
    if (query.trim()) {
      await search(query);
    }
  };

  const handleSelect = (item: SearchItem) => {
    selectVideo(item);
  };

  return (
    <Layout>
      <Typography variant='h4' align='center' gutterBottom>
        🎤 Karaoke Search
      </Typography>

      <Box display='flex' gap={2} mt={3} mb={4}>
        <TextField
          fullWidth
          placeholder='Песня или артист'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant='contained' onClick={handleSearch} disabled={loading}>
          Найти
        </Button>
      </Box>

      {loading && <Loader />}

      {error && (
        <Box mt={2}>
          <Alert severity='error'>{error}</Alert>
        </Box>
      )}

      {!loading && <SearchResult results={results} onSelect={handleSelect} />}

      {currentVideo && videoUrl && (
        <Box mt={4}>
          <VideoPlayer video={currentVideo} src={videoUrl} />
        </Box>
      )}
    </Layout>
  );
}
