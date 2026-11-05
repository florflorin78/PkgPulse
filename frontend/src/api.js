// API address from .env, with a fallback
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function fetchPackages() {
  const res = await fetch(`${API_URL}/packages`);
  // fetch doesn't throw on 404 or 500
  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }
  return res.json();
}

export async function fetchDistros() {
  const res = await fetch(`${API_URL}/distros`);
  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }
  return res.json();
}
