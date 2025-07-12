import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface Props {
  onSearch: (query: string) => void;
  loading?: boolean;
}

const SearchBar: React.FC<Props> = ({ onSearch, loading }) => {
  const [q, setQ] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) onSearch(q);
  };

  return (
    <form onSubmit={submit}>
      <Stack direction='row' spacing={2}>
        <TextField
          label='Песня или артист'
          placeholder='Введите название песни или артиста...'
          value={q}
          onChange={(e) => setQ(e.target.value)}
          size='medium'
          fullWidth
          disabled={loading}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          disabled={loading}
        >
          {loading ? "Поиск..." : "Найти"}
        </Button>
      </Stack>
    </form>
  );
};

export default SearchBar;
