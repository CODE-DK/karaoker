import { IconButton, InputAdornment, OutlinedInput, InputLabel, FormControl } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

interface Props {
  onSearch?: (query: string) => void;
  onInputChange?: (value: string) => void;
}

export function SearchBar({ onSearch, onInputChange }: Props) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onInputChange?.(value);
  };

  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed || !onSearch) return;

    await onSearch(trimmed);

    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <FormControl size="small" variant="outlined" fullWidth>
      <InputLabel htmlFor="search-field">Песня или артист</InputLabel>
      <OutlinedInput
        id="search-field"
        label="Песня или артист"
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleSearch} disabled={!query.trim()}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
