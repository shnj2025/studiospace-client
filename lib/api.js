// Browser-side API helper. Calls go through the /server proxy so the JWT cookie is sent.
export async function api(path, { method = "GET", body } = {}) {
  const res = await fetch(`/server${path}`, {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong. Please try again.");
  return data;
}

// Server-side (Server Components) fetch straight to Express
export async function serverFetch(path) {
  try {
    const res = await fetch(`${process.env.API_URL}${path}`, { cache: "no-store" });
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}
