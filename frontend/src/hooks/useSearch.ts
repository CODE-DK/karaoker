import { useState } from "react";
import { useApi } from "./useApi";
import type { SearchItem } from "../components/SearchResultItem";

export function useSearch() {
  const { get } = useApi();
  const [results, setResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (q: string) => {
    setLoading(true);
    const res = await get<SearchItem[]>(
      `/api/v1/search?q=${encodeURIComponent(q)}`,
    );

    if (res.ok) {
      setResults(res.data);
    } else {
      setError(res.error);
      setResults([]);
    }
    setLoading(false);
  };

  return { results, loading, error, search };
}
