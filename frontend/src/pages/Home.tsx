import { Box, Alert } from "@mui/material";
import { Layout } from "../shared/components/Layout";
import { useStream } from "../features/player/hooks/useStream";
import SearchResult from "../features/search/components/SearchResult";
import VideoPlayerDialog from "../features/player/components/VideoPlayerDialog";
import Loader from "../shared/components/Loader";
import EmptySearchMessage from "../features/search/components/EmptySearchMessage";
import type { SearchItem } from "../features/search/components/SearchResultItem";
import { useSearchContext } from "../features/search/context/SearchContext";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
  const { results, loading, error, search, reset, query, setQuery } = useSearchContext();
  const { currentVideo, videoUrl, selectVideo, reset: resetPlayer } = useStream();
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (value.trim() === "") {
      reset();
      resetPlayer();
    }
  };

  const handleSearch = (value: string) => {
    const trimmed = value.trim();
    setQuery(trimmed);
    resetPlayer();
    if (trimmed) {
      search(trimmed);
    } else {
      reset();
    }
  };

  const handleSelect = (item: SearchItem) => {
    selectVideo(item);
  };

  useEffect(() => {
    if (
      location.pathname === "/" &&
      prevPath.current !== "/" &&
      query.trim()
    ) {
      search(query.trim());
    }
    prevPath.current = location.pathname;
  }, [location.pathname, query, search]);

  const noResults = !loading && !error && results.length === 0;
  const showPlaceholder = query === "" && noResults;
  const showNotFound = query !== "" && noResults;

  return (
    <Layout onSearch={handleSearch} onInputChange={handleInputChange}>
      <Box mt={4}>
        {loading && <Loader />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && results.length > 0 && (
          <SearchResult results={results} onSelect={handleSelect} />
        )}

        <EmptySearchMessage
          show={noResults}
          placeholder={showPlaceholder}
          notFound={showNotFound}
        />

        <VideoPlayerDialog
          open={Boolean(currentVideo && videoUrl)}
          video={currentVideo}
          src={videoUrl}
          onClose={resetPlayer}
        />
      </Box>
    </Layout>
  );
}
