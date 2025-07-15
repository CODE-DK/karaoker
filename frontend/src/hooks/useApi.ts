import { useCallback, useMemo } from "react";
import { useAuth } from "./useAuth";

type ApiResponse<T> = { ok: true; data: T } | { ok: false; error: string };
type Json = Record<string, unknown> | undefined;

async function handleFetch<T>(
  input: RequestInfo | URL,
  init: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    const resp = await fetch(input, init);
    const text = await resp.text();

    if (!resp.ok) return { ok: false, error: text || resp.statusText };
    if (!text) return { ok: true, data: null as unknown as T };

    return { ok: true, data: JSON.parse(text) as T };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export function useApi() {
  const { idToken } = useAuth();

  const baseHeaders = useMemo(() => {
    const headers: Record<string, string> = {};
    if (idToken) headers.Authorization = `Bearer ${idToken}`;
    return headers;
  }, [idToken]);

  const get = useCallback(
    async <T>(path: string) => handleFetch<T>(path, { headers: baseHeaders }),
    [baseHeaders],
  );

  const post = useCallback(
    async <T>(path: string, body?: Json) =>
      handleFetch<T>(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...baseHeaders,
        },
        body: body ? JSON.stringify(body) : undefined,
      }),
    [baseHeaders],
  );

  const put = useCallback(
    async <T>(path: string, body?: Json) =>
      handleFetch<T>(path, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...baseHeaders,
        },
        body: body ? JSON.stringify(body) : undefined,
      }),
    [baseHeaders],
  );

  const del = useCallback(
    async <T>(path: string) =>
      handleFetch<T>(path, {
        method: "DELETE",
        headers: baseHeaders,
      }),
    [baseHeaders],
  );

  return { get, post, put, del };
}
