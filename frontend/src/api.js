export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }
  // 204 No Content has no body
  return res.status === 204 ? null : res.json();
}

export function fetchPackages() {
  return request("/packages");
}

export function fetchDistros() {
  return request("/distros");
}

export function createPackage(pkg) {
  return request("/packages", { method: "POST", body: JSON.stringify(pkg) });
}

export function updatePackage(id, changes) {
  return request(`/packages/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
}

export function deletePackage(id) {
  return request(`/packages/${id}`, { method: "DELETE" });
}

export function fetchPackage(id) {
  return request(`/packages/${id}`);
}
