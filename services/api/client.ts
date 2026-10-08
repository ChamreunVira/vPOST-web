const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { ...options, headers: { "Content-Type": "application/json", ...options?.headers } });
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
  return response.json() as Promise<T>;
}

export { API_URL };

