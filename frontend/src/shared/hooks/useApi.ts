import { useCallback } from "react";
import { getAuth } from "firebase/auth";

type ApiResponse<T> = { ok: true; data: T } | { ok: false; error: string };

async function fetchWithAuth<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const user = getAuth().currentUser;
    const token = user ? await user.getIdToken(true) : null;

    console.log("idToken", token);

    const res = await fetch(path, {
      ...options,
      headers: {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const text = await res.text();
    if (!res.ok) return { ok: false, error: text || res.statusText };
    return { ok: true, data: text ? JSON.parse(text) : null };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export function useApi() {
  const get = useCallback(<T>(path: string) => fetchWithAuth<T>(path), []);

  const post = useCallback(
    <T, B = any>(path: string, body?: B) =>
      fetchWithAuth<T>(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      }),
    [],
  );

  const put = useCallback(
    <T, B = any>(path: string, body?: B) =>
      fetchWithAuth<T>(path, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      }),
    [],
  );

  const del = useCallback(<T>(path: string) => fetchWithAuth<T>(path, { method: "DELETE" }), []);

  return { get, post, put, del };
}
