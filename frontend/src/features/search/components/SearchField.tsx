import { FormControl, OutlinedInput, InputAdornment, IconButton, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  label?: string;
  disabled?: boolean;
}

export default function SearchField({
  value,
  onChange,
  onSearch,
  label = "Песня или артист",
  disabled = false,
}: SearchFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <FormControl size="small" variant="outlined" fullWidth>
      <InputLabel htmlFor="search-field">{label}</InputLabel>
      <OutlinedInput
        id="search-field"
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
        placeholder={focused ? "" : label}
        disabled={disabled}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={onSearch} disabled={!value.trim()}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
