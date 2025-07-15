import { createContext, useContext, useReducer, useMemo, type ReactNode } from "react";
import type { SearchItem } from "../components/SearchResultItem";
import { useApi } from "../../../shared/hooks/useApi";

interface SearchState {
  query: string;
  results: SearchItem[];
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: "SET_QUERY"; payload: string }
  | { type: "SEARCH_START" }
  | { type: "SEARCH_SUCCESS"; payload: SearchItem[] }
  | { type: "SEARCH_FAILURE"; payload: string }
  | { type: "RESET" };

const initialState: SearchState = {
  query: "",
  results: [],
  loading: false,
  error: null,
};

function reducer(state: SearchState, action: Action): SearchState {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload, results: [], error: null };
    case "SEARCH_START":
      return { ...state, loading: true, error: null };
    case "SEARCH_SUCCESS":
      return { ...state, results: action.payload, loading: false, error: null };
    case "SEARCH_FAILURE":
      return { ...state, error: action.payload, results: [], loading: false };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

interface ContextType extends SearchState {
  setQuery: (q: string) => void;
  search: (q: string) => void;
  reset: () => void;
}

const SearchContext = createContext<ContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { get } = useApi();

  const setQuery = (q: string) => {
    if (q !== state.query) {
      dispatch({ type: "SET_QUERY", payload: q });
    }
  };

  const search = async (q: string) => {
    if (q === state.query && (state.results.length > 0 || state.loading || state.error)) {
      return;
    }
    dispatch({ type: "SET_QUERY", payload: q });
    dispatch({ type: "SEARCH_START" });
    try {
      const res = await get<SearchItem[]>(`/api/v1/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        dispatch({ type: "SEARCH_SUCCESS", payload: res.data });
      } else {
        dispatch({
          type: "SEARCH_FAILURE",
          payload: res.error?.includes("no such host")
            ? "Похоже, у вас проблемы с интернетом"
            : res.error || "Неизвестная ошибка",
        });
      }
    } catch (e) {
      dispatch({
        type: "SEARCH_FAILURE",
        payload: "Ошибка поиска. Попробуйте позже.",
      });
    }
  };

  const reset = () => dispatch({ type: "RESET" });

  const { query, results, loading, error } = state;
  const value = useMemo(
    () => ({
      query,
      results,
      loading,
      error,
      setQuery,
      search,
      reset,
    }),
    [query, results, loading, error],
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearchContext() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearchContext must be used within SearchProvider");
  return ctx;
}
